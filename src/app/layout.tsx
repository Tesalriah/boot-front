import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "사이트A",
  description: "스프랑 부트 Next.js 연동",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <header>
          <nav className="flex">
              <Link href="/" className="p-2 rounded hover:bg-gray-100">
                  홈
              </Link>
              <Link                  href="/posts"
                  className="p-2 rounded hover:bg-gray-100">
                  글목록
              </Link>
          </nav>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="text-center p-2">풋터</footer>
      </body>
    </html>
  );
}
