"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTranslation, type Language } from "@/lib/i18n"

const stats = [
  { value: "6+", labelKey: "hero.stats.projects", icon: TrendingUp },
  { value: "7+", labelKey: "hero.stats.experience", icon: Users },
  { value: "5+", labelKey: "hero.stats.technologies", icon: Zap },
]

const services = [
  { icon: "🌐", key: "web" },
  { icon: "📈", key: "marketing" },
  { icon: "📊", key: "data" },
]

export function HeroSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLanguageChange = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const partners = [
    { name: "BlueRDC", logo: "/Partenaire_logo/blue-logo.svg" },
    { name: "NLC", logo: "/Partenaire_logo/logo-nlc-blanc.png" },
    { name: "Campus RDC", logo: "/Partenaire_logo/logo_campus.jpg" },
    { name: "Foshekin Travel", logo: "/Partenaire_logo/foshekin_travel.png" },
    { name: "Bantu Expertise", logo: "/Partenaire_logo/bantu-expertise-logo.png" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

          {/* Left content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Availability badge */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {getTranslation(currentLang, "hero.available")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              className="space-y-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                {getTranslation(currentLang, "hero.title.line1")}{" "}
                <span className="relative">
                  <span className="text-accent">{getTranslation(currentLang, "hero.title.highlight")}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>{" "}
                {getTranslation(currentLang, "hero.title.line2")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {getTranslation(currentLang, "hero.subtitle")}
              </p>
            </motion.div>

            {/* 3 service pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              {services.map((s) => (
                <span
                  key={s.key}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium shadow-sm"
                >
                  <span>{s.icon}</span>
                  {getTranslation(currentLang, `hero.services.${s.key}`)}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <Button asChild size="lg" className="gap-2 text-base px-8 shadow-lg shadow-primary/20">
                <a href="#contact">
                  {getTranslation(currentLang, "hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <a href="#projects">{getTranslation(currentLang, "hero.viewWork")}</a>
              </Button>
            </motion.div>

            {/* Social proof line */}
            <motion.p
              className="text-sm text-muted-foreground flex items-center gap-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
            >
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              {getTranslation(currentLang, "hero.credibility")}
            </motion.p>
          </motion.div>

          {/* Right content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Profile image */}
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-2xl scale-95" />
              <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
                <img src="/profile.jpg" alt="Franck KAPUYA MBALA" className="w-full h-full object-cover" />
              </div>

              {/* Floating stat cards */}
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.labelKey}
                  className="absolute bg-card border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                  style={{
                    top: i === 0 ? "8%" : i === 1 ? "50%" : "auto",
                    bottom: i === 2 ? "8%" : "auto",
                    left: i === 1 ? "-18%" : "auto",
                    right: i === 0 ? "-12%" : i === 2 ? "-12%" : "auto",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-bold leading-none">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{getTranslation(currentLang, stat.labelKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Partners strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-20 pt-8 border-t border-border/50"
        >
          <p className="text-center text-xs text-muted-foreground/50 mb-6 uppercase tracking-widest">
            {getTranslation(currentLang, "hero.partners")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="h-16 flex items-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img src={partner.logo} alt={partner.name} className="h-full w-auto max-w-[160px] object-contain" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
