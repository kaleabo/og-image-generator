import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OG Image Generator | Create Stunning Open Graph Images",
  description:
    "Easily create and customize Open Graph images with our intuitive tool. Perfect for enhancing your social media presence.",
  keywords:
    "Open Graph, Image Generator, React, Next.js, Custom Images, Social Media",
  authors: {
    name: "Kaleab Selamawi",
    url: "https://github.com/kaleabo",
  },
  themeColor: "#eab308",
  openGraph: {
    title: "OG Image Generator",
    description: "Generate beautiful Open Graph images effortlessly.",
    url: "https://ogimagepro.vercel.app",
    siteName: "OG Image Generator",
    images: [
      {
        url: "https://ogimagepro.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview of OG Image Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kaleabo",
    title: "OG Image Generator",
    description: "Create stunning Open Graph images for your projects.",
    images: "https://ogimagepro.vercel.app/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
