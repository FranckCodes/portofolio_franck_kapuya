"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

export function SolutionSection() {
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
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {getTranslation(currentLang, "solution.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {getTranslation(currentLang, "solution.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
