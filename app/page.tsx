import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black">
      <main className="max-w-2xl text-center">
        {/* Simple Intro */}
        <h1 className="text-5xl font-bold mb-6">Hello, I'm a Developer.</h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          I build websites using WordPress, WooCommerce, and modern web
          technologies like Next.js.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Read My Blog
          </Link>

          <button
            disabled
            className="px-6 py-3 border border-gray-300 text-gray-400 rounded-lg cursor-not-allowed"
          >
            Projects (Coming Soon)
          </button>
        </div>
      </main>
    </div>
  );
}
