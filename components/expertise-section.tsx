"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Network, BarChart3, Code, Server } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

export function ExpertiseSection() {
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

  const expertiseAreas = [
    { icon: Network, key: "systems" },
    { icon: BarChart3, key: "data" },
    { icon: Code, key: "development" },
    { icon: Server, key: "infrastructure" },
  ]

  return (
    <section id="expertise" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              {getTranslation(currentLang, "expertise.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <area.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {getTranslation(currentLang, `expertise.areas.${area.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getTranslation(currentLang, `expertise.areas.${area.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
