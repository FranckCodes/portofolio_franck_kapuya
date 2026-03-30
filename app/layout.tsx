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
  title: "Développeur Full Stack | Sites web & stratégies digitales qui génèrent des clients",
  description:
    "Je conçois des sites web performants, des stratégies marketing et des solutions data pour aider les entreprises à attirer plus de clients et augmenter leurs revenus.",
  keywords: [
    "développeur web RDC",
    "création site web Kinshasa",
    "freelance développeur",
    "marketing digital",
    "data analyst",
    "création site internet",
    "développeur full stack Afrique",
  ],
  authors: [{ name: "Franck Kapuya" }],
  robots: "index, follow",
  openGraph: {
    title: "Boostez votre business avec un site web performant 🚀",
    description: "Sites web, marketing et data pour générer plus de clients et augmenter vos revenus.",
    url: "https://www.franckkapuya.com",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://www.franckkapuya.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Franck Kapuya - Développeur Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Full Stack & Marketing | Générer plus de clients",
    description: "Je crée des systèmes digitaux qui boostent votre croissance.",
    images: ["https://www.franckkapuya.com/preview.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-54DFL2VZ7G"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-54DFL2VZ7G');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
