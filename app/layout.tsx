import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Proper font configuration
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Isnu Munandar - Software Engineer Portfolio",
    template: "%s | Isnu Munandar Portfolio",
  },
  description:
    "Passionate Software Engineer specializing in modern web development. Creating elegant solutions with React, Next.js, TypeScript, and cutting-edge technologies.",
  keywords: [
    "software engineer",
    "web developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "full stack developer",
    "frontend developer",
    "portfolio",
    "indonesia developer",
  ],
  authors: [{ name: "Isnu Munandar", url: "https://yourportfolio.com" }],
  creator: "Isnu Munandar",
  publisher: "Isnu Munandar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourportfolio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Isnu Munandar - Software Engineer Portfolio",
    description:
      "Passionate Software Engineer specializing in modern web development",
    siteName: "Isnu Munandar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Isnu Munandar - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isnu Munandar - Software Engineer Portfolio",
    description:
      "Passionate Software Engineer specializing in modern web development",
    images: ["/og-image.jpg"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Analytics */}
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                }}
              />
            </>
          )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Isnu Munandar",
              jobTitle: "Software Engineer",
              description:
                "Passionate Software Engineer specializing in modern web development",
              url: "https://yourportfolio.com",
              sameAs: [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername",
                "https://twitter.com/yourusername",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "South Tangerang",
                addressRegion: "Banten",
                addressCountry: "Indonesia",
              },
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "PostgreSQL",
                "Web Development",
                "Software Engineering",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}

        {/* Service Worker Registration */}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
