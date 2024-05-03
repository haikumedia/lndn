import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import 'animate.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=hangryfoodordering"></script>
    </html>
  );
}
