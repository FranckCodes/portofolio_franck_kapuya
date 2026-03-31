"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Brain, Briefcase, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"

const reasons = [
  { icon: Target, key: "strategic", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Brain, key: "analytical", color: "text-violet-500", bg: "bg-violet-500/10" },
  { icon: Briefcase, key: "experience", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: TrendingUp, key: "results", color: "text-orange-500", bg: "bg-orange-500/10" },
]

export function TrustSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLanguageChange = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <section id="trust" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                {getTranslation(currentLang, "trust.label")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {getTranslation(currentLang, "trust.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {getTranslation(currentLang, "trust.description")}
              </p>
              <Button asChild size="lg" className="gap-2">
                <a href="#contact">
                  {getTranslation(currentLang, "trust.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-4">
              {reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <motion.div
                    key={reason.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all space-y-3"
                  >
                    <div className={`w-11 h-11 rounded-xl ${reason.bg} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${reason.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm leading-snug">
                      {getTranslation(currentLang, `trust.reasons.${reason.key}.title`)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {getTranslation(currentLang, `trust.reasons.${reason.key}.description`)}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
