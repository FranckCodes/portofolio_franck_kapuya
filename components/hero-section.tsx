"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"

export function HeroSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 6,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.8 },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              {getTranslation(currentLang, "hero.title")}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {getTranslation(currentLang, "hero.subtitle")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gap-2">
                <a href="#contact">
                  {getTranslation(currentLang, "hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#projects">{getTranslation(currentLang, "hero.viewWork")}</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
