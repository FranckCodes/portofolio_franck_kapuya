import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Franck KAPUYA MBALA - Web Developer & Digital Marketer",
  description:
    "Portfolio of Franck KAPUYA MBALA, a passionate web developer and digital marketer expert in frontend and backend development, specializing in Next.js, React, Laravel, and SQL.",
  keywords: [
    "web developer",
    "digital marketer",
    "frontend developer",
    "backend developer",
    "Next.js",
    "React",
    "Laravel",
    "Kinshasa",
    "DRC",
  ],
  authors: [{ name: "Franck KAPUYA MBALA" }],
  openGraph: {
    title: "Franck KAPUYA MBALA - Web Developer & Digital Marketer",
    description: "Portfolio of Franck KAPUYA MBALA, expert in frontend and backend development",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
