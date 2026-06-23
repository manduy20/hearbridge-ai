import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HearBridge AI - Jembatan Komunikasi Digital",
  description:
    "Platform berbasis Artificial Intelligence yang membantu komunikasi melalui Speech-to-Text, Text-to-Speech, dan AI Assistant untuk aksesibilitas tanpa batas bagi komunitas tunarungu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Atkinson+Hyperlegible+Next:wght@400;700;800&display=swap"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
