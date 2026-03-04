"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertCircle, TrendingDown, Database, Eye } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

export function ProblemSection() {
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

  const problems = [
    { icon: AlertCircle, key: "manual" },
    { icon: Database, key: "dispersed" },
    { icon: Eye, key: "visibility" },
    { icon: TrendingDown, key: "intuition" },
  ]

  return (
    <section id="problem" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {getTranslation(currentLang, "problem.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {getTranslation(currentLang, "problem.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <problem.icon className="h-8 w-8 text-primary mb-4 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  {getTranslation(currentLang, `problem.items.${problem.key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
