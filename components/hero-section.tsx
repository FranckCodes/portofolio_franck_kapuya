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
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <div className="space-y-4">
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
                {getTranslation(currentLang, "hero.greeting")}
              </motion.p>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
                Franck KAPUYA MBALA
              </motion.h1>
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl text-primary font-semibold">
                {getTranslation(currentLang, "hero.title")}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground text-pretty max-w-2xl">
                {getTranslation(currentLang, "hero.subtitle")}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="#contact">
                  {getTranslation(currentLang, "hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                <a href="#projects">{getTranslation(currentLang, "hero.viewWork")}</a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://gitlab.com/franck.kapuya" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitLab</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:franckkapuya13@gmail.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={statsVariants} className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <motion.div
                  className="text-3xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  5+
                </motion.div>
                <div className="text-sm text-foreground/70">{getTranslation(currentLang, "hero.stats.experience")}</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <motion.div
                  className="text-3xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  20+
                </motion.div>
                <div className="text-sm text-foreground/70">{getTranslation(currentLang, "hero.stats.projects")}</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <motion.div
                  className="text-3xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  15+
                </motion.div>
                <div className="text-sm text-foreground/70">
                  {getTranslation(currentLang, "hero.stats.technologies")}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content - Image placeholder */}
          <motion.div className="relative" variants={imageVariants} initial="hidden" animate="visible">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Curved background shape */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-[3rem] rotate-6 opacity-10"
                animate={{ rotate: [6, 8, 6] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-card rounded-[3rem] shadow-2xl overflow-hidden">
                <img src="/profile.jpg" alt="Franck KAPUYA MBALA" className="w-full h-full object-cover" />
              </div>
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
