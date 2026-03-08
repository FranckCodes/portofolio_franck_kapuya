"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Brain, Briefcase, TrendingUp } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

export function TrustSection() {
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

  const reasons = [
    { icon: Target, key: "strategic" },
    { icon: Brain, key: "analytical" },
    { icon: Briefcase, key: "experience" },
    { icon: TrendingUp, key: "results" },
  ]

  return (
    <section id="trust" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              {getTranslation(currentLang, "trust.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <reason.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {getTranslation(currentLang, `trust.reasons.${reason.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {getTranslation(currentLang, `trust.reasons.${reason.key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
