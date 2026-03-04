"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Wrench, LineChart } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

export function MethodSection() {
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

  const steps = [
    { icon: Search, number: "01", key: "analysis" },
    { icon: Wrench, number: "02", key: "implementation" },
    { icon: LineChart, number: "03", key: "optimization" },
  ]

  return (
    <section id="method" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {getTranslation(currentLang, "method.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                  <h3 className="text-xl font-semibold">
                    {getTranslation(currentLang, `method.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {getTranslation(currentLang, `method.steps.${step.key}.description`)}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-8 border-t border-border"
          >
            <p className="text-xl font-semibold text-primary">
              {getTranslation(currentLang, "method.approach")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
