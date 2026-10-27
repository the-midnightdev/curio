import type { Metadata } from "next";
import { Figtree, Fraunces, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SoundProvider } from "@/components/SoundProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://curio.local"),
  title: {
    default: "Curio — editorial microlearning",
    template: "%s · Curio",
  },
  description:
    "Curio is an editorial microlearning and intellectual discovery platform. Choose a field, draw a curiosity, and read for five minutes.",
  openGraph: {
    title: "Curio — editorial microlearning",
    description:
      "Five-minute essays in psychology, philosophy, science, geography, history, and society.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${fraunces.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const s=localStorage.getItem("curio-theme");const t=s==="light"||s==="dark"?s:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch{}` }} />
      </head>
      <body className="flex min-h-full flex-col font-sans text-ink">
        <ThemeProvider>
          <SoundProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
