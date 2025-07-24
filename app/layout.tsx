import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - Software Engineer Portfolio",
  description:
    "Software Engineer passionate about creating innovative solutions and beautiful user experiences",
  keywords:
    "software engineer, web developer, portfolio, react, next.js, typescript",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Software Engineer Portfolio",
    description:
      "Software Engineer passionate about creating innovative solutions and beautiful user experiences",
    url: "https://yourportfolio.com",
    siteName: "Your Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Name - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Software Engineer Portfolio",
    description:
      "Software Engineer passionate about creating innovative solutions and beautiful user experiences",
    images: ["/og-image.jpg"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
