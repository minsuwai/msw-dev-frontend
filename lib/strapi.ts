const STRAPI_URL = "http://localhost:1337";

export interface Post {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  content: any;
  cover: {
    url: string;
    alternativeText: string;
  };
}

// Add this new interface
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

export async function fetchFromStrapi(path: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}`, {
      // CHANGE HERE: 'force-cache' allows Next.js to save the data as static HTML
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Error fetching from Strapi:", res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Connection error:", error);
    return null;
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
      {
        // CHANGE HERE: 'force-cache' here too
        cache: "force-cache",
      }
    );

    const json = await res.json();
    return json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function fetchProjectBySlug(slug: string) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: "force-cache",
      }
    );

    const json = await res.json();
    return json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
