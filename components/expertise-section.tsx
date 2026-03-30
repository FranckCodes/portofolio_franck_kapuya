"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Network, BarChart3, Code, Server, ArrowRight } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

const areas = [
  { icon: Code, key: "development", accent: "from-blue-500/10 to-blue-600/5", border: "hover:border-blue-500/40" },
  { icon: BarChart3, key: "data", accent: "from-violet-500/10 to-violet-600/5", border: "hover:border-violet-500/40" },
  { icon: Network, key: "systems", accent: "from-emerald-500/10 to-emerald-600/5", border: "hover:border-emerald-500/40" },
  { icon: Server, key: "infrastructure", accent: "from-orange-500/10 to-orange-600/5", border: "hover:border-orange-500/40" },
]

export function ExpertiseSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLanguageChange = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <section id="expertise" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              {getTranslation(currentLang, "expertise.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              {getTranslation(currentLang, "expertise.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getTranslation(currentLang, "expertise.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group relative p-8 rounded-2xl bg-gradient-to-br ${area.accent} border border-border ${area.border} transition-all hover:shadow-xl cursor-default`}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl font-bold">
                        {getTranslation(currentLang, `expertise.areas.${area.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {getTranslation(currentLang, `expertise.areas.${area.key}.description`)}
                      </p>
                      <a href="#contact" className="inline-flex items-center gap-1 text-xs text-accent font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {getTranslation(currentLang, "expertise.learnMore")}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
