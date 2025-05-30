import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthBar } from './components/AuthBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Masterclass",
  description: "Explore interactive AI-powered learning experiences with multiple conversational agents including Bible Guide, Storybook Narration, and Philosophy discussions.",
  openGraph: {
    title: "AI Masterclass",
    description: "Explore interactive AI-powered learning experiences with multiple conversational agents including Bible Guide, Storybook Narration, and Philosophy discussions.",
    url: "https://chatwithgods.com",
    siteName: "AI Masterclass",
    images: [
      {
        url: "/images/jesus.jpg",
        width: 400,
        height: 400,
        alt: "Bible Guide Avatar"
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
        <AuthBar />
        {children}
      </body>
    </html>
  );
}
