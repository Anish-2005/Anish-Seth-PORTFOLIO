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
  title: "Anish Seth - Full Stack Developer | ML & Blockchain",
  description: "Portfolio of Anish Seth - Full Stack Web Developer, App Developer with expertise in Machine Learning and Blockchain development",
  keywords: ["Full Stack Developer", "App Developer", "Machine Learning", "Blockchain", "Web Development", "React", "Next.js", "Node.js"],
  authors: [{ name: "Anish Seth" }],
  openGraph: {
    title: "Anish Seth - Full Stack Developer",
    description: "Portfolio of Anish Seth - Full Stack Web Developer, App Developer with expertise in Machine Learning and Blockchain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
