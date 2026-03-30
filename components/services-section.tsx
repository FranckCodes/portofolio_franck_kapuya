"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Globe, TrendingUp, BarChart3, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"

const serviceIcons = [Globe, TrendingUp, BarChart3]

export function ServicesSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLanguageChange = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const serviceKeys = ["web", "marketing", "data"]

  return (
    <section id="services" className="py-24 bg-muted/30">
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
              {getTranslation(currentLang, "services.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              {getTranslation(currentLang, "services.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getTranslation(currentLang, "services.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[index]
              const features = [1, 2, 3].map((n) =>
                getTranslation(currentLang, `services.${key}.features.${n}`)
              )
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  className={`relative group rounded-2xl border p-8 space-y-6 transition-shadow hover:shadow-2xl ${
                    index === 1
                      ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20"
                      : "bg-card border-border"
                  }`}
                >
                  {index === 1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide">
                      {getTranslation(currentLang, "services.popular")}
                    </span>
                  )}

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    index === 1 ? "bg-white/15" : "bg-accent/10"
                  }`}>
                    <Icon className={`h-7 w-7 ${index === 1 ? "text-white" : "text-accent"}`} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">
                      {getTranslation(currentLang, `services.${key}.title`)}
                    </h3>
                    <p className={`text-sm leading-relaxed ${index === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {getTranslation(currentLang, `services.${key}.description`)}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${index === 1 ? "text-green-400" : "text-accent"}`} />
                        <span className={index === 1 ? "text-primary-foreground/90" : ""}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={index === 1 ? "secondary" : "outline"}
                    className={`w-full gap-2 ${index === 1 ? "bg-white text-primary hover:bg-white/90" : "bg-transparent"}`}
                  >
                    <a href="#contact">
                      {getTranslation(currentLang, "services.cta")}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
