import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (!STRAPI_TOKEN) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    // 1. Find the post by slug
    const fetchRes = await fetch(
      `${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    const fetchData = await fetchRes.json();

    if (!fetchData.data || fetchData.data.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = fetchData.data[0];

    // --- FIX START ---

    // 1. Handle Flattened Data (Strapi v5)
    // The error happened because 'post.attributes' was undefined.
    // We check 'post.views' directly first.
    const currentViews = post.views ?? post.attributes?.views ?? 0;

    // 2. Use 'documentId' for Updates (Strapi v5 Requirement)
    // If you use the number 'id' in v5, it often returns 404 or 400.
    const updateId = post.documentId || post.id;

    // --- FIX END ---

    // 3. Update the post
    const updateRes = await fetch(`${STRAPI_URL}/api/posts/${updateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          views: currentViews + 1,
        },
      }),
    });

    // Check if update failed
    if (!updateRes.ok) {
      console.error("Update failed:", await updateRes.text());
      return NextResponse.json(
        { error: "Failed to update Strapi" },
        { status: 500 }
      );
    }

    const updateData = await updateRes.json();

    // Return new count safely (checking both flat and nested structures)
    const newViews =
      updateData.data?.views ?? updateData.data?.attributes?.views;

    return NextResponse.json({
      success: true,
      views: newViews,
    });
  } catch (error) {
    console.error("View increment error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
