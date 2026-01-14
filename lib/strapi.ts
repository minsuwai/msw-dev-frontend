// lib/strapi.ts

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// --- INTERFACES ---

export interface Post {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  content: any;
  createdAt: string;
  publishedAt: string;
  cover: {
    url: string;
    alternativeText: string;
  };
  category?: {
    name: string;
    slug: string;
  };
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: any;
  tags: string; // "Next.js, React"
  demoUrl?: string;
  repoUrl?: string;
  image: {
    url: string;
    alternativeText: string;
  };
}

// --- MAIN FETCH FUNCTION ---

export async function fetchFromStrapiWithMeta(url: string) {
  if (!STRAPI_TOKEN) {
    console.warn("⚠️ STRAPI_API_TOKEN is missing from .env.local.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  };

  try {
    const fullUrl = `${STRAPI_URL}/api/${url}`;

    // Only log in development to reduce noise during build
    if (process.env.NODE_ENV === "development") {
      console.log(`📡 Strapi Request: ${fullUrl}`);
    }

    const res = await fetch(fullUrl, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      // If build fails here, it might be because Strapi is not running
      console.error(`❌ Strapi Error (${res.status}): ${res.statusText}`);
      return { data: [], meta: {} };
    }

    const json = await res.json();
    return {
      data: json.data || [],
      meta: json.meta || {},
    };
  } catch (error) {
    console.error("❌ Network Connection Error:", error);
    return { data: [], meta: {} };
  }
}

// --- HELPER FUNCTIONS ---

// 1. Fetch List (Returns just the data array)
export async function fetchFromStrapi(url: string) {
  const result = await fetchFromStrapiWithMeta(url);
  return result.data;
}

// 2. Fetch Single Post by Slug
export async function fetchPostBySlug(slug: string) {
  const result = await fetchFromStrapiWithMeta(
    `posts?filters[slug][$eq]=${slug}&populate=*`
  );
  return result.data.length > 0 ? result.data[0] : null;
}

// 3. Fetch Single Project by Slug
export async function fetchProjectBySlug(slug: string) {
  const result = await fetchFromStrapiWithMeta(
    `projects?filters[slug][$eq]=${slug}&populate=*`
  );
  return result.data.length > 0 ? result.data[0] : null;
}
