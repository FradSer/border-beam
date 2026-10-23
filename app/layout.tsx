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
  title: "border-beam — by Frad",
  description:
    "Animated borders for React and shadcn/ui, by Frad. Explore five presets, four palettes, and ready-to-use components with WebGPU rendering and a CSS fallback.",
  authors: [{ name: "Frad", url: "https://github.com/FradSer" }],
  creator: "Frad",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.classList.toggle("dark",localStorage.getItem("border-beam-theme")!=="light")}catch{}` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
