"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
        staggerChildren: 0.15,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const technologies = ["Next.js", "React", "TypeScript", "Laravel", "SQL"]

  const partners = [
    { name: "BlueRDC", logo: "/Partenaire_logo/blue-logo.svg" },
    { name: "NLC", logo: "/Partenaire_logo/logo-nlc-blanc.png" },
    { name: "Campus RDC", logo: "/Partenaire_logo/logo_campus.png" },
    { name: "Foshekin Travel", logo: "/Partenaire_logo/foshekin_travel.png" },
    { name: "Bantu Expertise", logo: "/Partenaire_logo/bantu-expertise-logo.png" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <div className="space-y-6">
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {getTranslation(currentLang, "hero.title")}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {getTranslation(currentLang, "hero.subtitle")}
              </motion.p>

              <motion.p variants={itemVariants} className="text-base text-muted-foreground/80 italic">
                {getTranslation(currentLang, "hero.credibility")}
              </motion.p>

              {/* Technologies */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-sm font-normal">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
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

          {/* Right content - Image */}
          <motion.div className="relative" variants={imageVariants} initial="hidden" animate="visible">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
                <img src="/profile.jpg" alt="Franck KAPUYA MBALA" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partners logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-border/50"
        >
          <p className="text-center text-xs text-muted-foreground/50 mb-6 uppercase tracking-widest">
            {getTranslation(currentLang, "hero.partners") || "Partenaires"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                className="h-16 flex items-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto max-w-[160px] object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

