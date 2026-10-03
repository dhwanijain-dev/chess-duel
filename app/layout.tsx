import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Chess Puzzle Duel — Competitive Tactical Puzzles",
  description:
    "Race to solve chess puzzles faster than your opponent. Fast competitive puzzle duels with tactical positions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`antialiased ${inter.variable} font-sans`}
    >
      <body>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
