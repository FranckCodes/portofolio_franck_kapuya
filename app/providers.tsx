"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/lib/language-context" // Added LanguageProvider import

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
