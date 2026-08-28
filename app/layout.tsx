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
  title: "border-beam",
  description:
    "Animated border beam effect for shadcn with vgpu-powered color rendering and a static CSS fallback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          THESIS: Border beam is an active GPU shader effect made approachable through shadcn primitives, replacing static CSS color filters with a 3-pass WGSL pipeline.
          OWN-WORLD: Dark inspection panel, monospace readouts, live WebGPU canvases, and strict shadcn component composition.
          STORY: Visitors see the live beam running in real-time, inspect the 3 GPU rendering passes (Stroke, Inner, Bloom), test variants in the playground, and copy registry installation code.
          FIRST VIEWPORT: Two-column hero with live specimen on the right, followed by a live WebGPU status bar and an interactive renderer inspector.
          FORM: Inspector Workbench (GPU Workbench direction), comp-first selection.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        {children}
      </body>
    </html>
  );
}
