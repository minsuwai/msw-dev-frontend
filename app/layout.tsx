import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or your font
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/ui/preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://msw-dev.vercel.app"),
  title: {
    default: "Min Su Wai | Full Stack Developer",
    template: "%s | Min Su Wai", // This allows child pages to have titles like "Projects | Min Su Wai"
  },
  description:
    "A modern developer portfolio showcasing projects in Next.js, Strapi, and Tailwind CSS.",
  keywords: [
    "Next.js",
    "React",
    "Strapi",
    "Portfolio",
    "Web Developer",
    "Myanmar",
  ],
  authors: [{ name: "Min Su Wai" }],
  creator: "Min Su Wai",
  openGraph: {
    title: "Min Su Wai | Full Stack Developer",
    description:
      "Building digital products with purpose. Check out my latest work.",
    url: "https://msw-dev.vercel.app",
    siteName: "Min Su Wai Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Min Su Wai | Full Stack Developer",
    description: "Building digital products with purpose.",
    creator: "@yourhandle", // Optional
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Preloader /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main Wrapper with Relative Positioning */}
          <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
            {/* --- BACKGROUND LAYER --- */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
                  repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)
                `,
                WebkitMaskImage: `
                  repeating-linear-gradient(
                    to right,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    black 0px,
                    black 3px,
                    transparent 3px,
                    transparent 8px
                  ),
                  radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)
                `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />

            {/* --- CONTENT LAYER (Higher Z-Index) --- */}
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="container mx-auto px-4 py-8 flex-grow">
                {children}
              </main>

              <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground bg-background/50 backdrop-blur-sm">
                © {new Date().getFullYear()} Min Su Wai. Built with Next.js &
                Strapi.
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
