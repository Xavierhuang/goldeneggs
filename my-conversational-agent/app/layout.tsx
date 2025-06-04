import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goldeneggs",
  description: "Goldeneggs is an AI-powered coaching platform for personal and professional growth, connecting you with expert advice and mentorship on demand.",
  openGraph: {
    title: "Goldeneggs",
    description: "Goldeneggs is an AI-powered coaching platform for personal and professional growth, connecting you with expert advice and mentorship on demand.",
    url: "https://goldeneggs.ai",
    siteName: "Goldeneggs",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Goldeneggs Logo"
      }
    ],
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y9Q89VZYT3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y9Q89VZYT3');
            `,
          }}
        />
        <noscript>
          <img src="https://www.googletagmanager.com/ns.html?id=G-Y9Q89VZYT3" alt="Google Analytics" style={{display:'none'}} />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
