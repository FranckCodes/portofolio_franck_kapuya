"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export function UnderConstruction({ titleKey, textKey }: { titleKey: string; textKey: string }) {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)

    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLang(e.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
        <motion.div
          className="max-w-xl text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
            <Construction className="h-10 w-10 text-accent" />
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium">
            {getTranslation(currentLang, "construction.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, titleKey)}</h1>
          <p className="text-lg text-muted-foreground">{getTranslation(currentLang, textKey)}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                {getTranslation(currentLang, "construction.backToHome")}
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link href="/#contact">
                {getTranslation(currentLang, "construction.contactCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </>
  )
}
