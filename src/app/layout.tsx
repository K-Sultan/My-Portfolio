import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kareem Sultan | Software Developer",
  description: "Crafting high-performance digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={`bg-background text-on-background font-body-md antialiased selection:bg-primary selection:text-on-primary`}>
        {children}
      </body>
    </html>
  );
}
