"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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

const TYPING_WORDS = {
  fr: ["entreprise", "activité", "produit", "marque", "acquisition clients"],
  en: ["business", "activity", "product", "brand", "client acquisition"],
}

const TYPE_SPEED = 70   // ms per char
const DELETE_SPEED = 40 // ms per char
const PAUSE_AFTER = 1600 // ms pause when word is fully typed

function useTypingEffect(words: string[]) {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const word = words[wordIndex]

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          TYPE_SPEED
        )
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), PAUSE_AFTER)
      }
    } else if (phase === "pausing") {
      setPhase("deleting")
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          DELETE_SPEED
        )
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase("typing")
      }
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [displayed, phase, wordIndex, words])

  return displayed
}

export function HeroSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const typedWord = useTypingEffect(TYPING_WORDS[currentLang])

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
    // { name: "Campus RDC", logo: "/Partenaire_logo/logo_campus.png" },
    { name: "Foshekin Travel", logo: "/Partenaire_logo/foshekin_travel.png" },
    { name: "Bantu Expertise", logo: "/Partenaire_logo/bantu-expertise-logo.png" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left content ── */}
          <motion.div
            className="space-y-6 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Availability badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="flex justify-center lg:justify-start"
            >
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight">
                {getTranslation(currentLang, "hero.title.line1")}{" "}
                {/* Dynamic typing word */}
                <span className="inline-block relative">
                  <span className="text-accent">{typedWord}</span>
                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-[3px] h-[0.85em] bg-accent align-middle ml-0.5 rounded-sm"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
                  />
                </span>{" "}
                {getTranslation(currentLang, "hero.title.line2")}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {getTranslation(currentLang, "hero.subtitle")}
              </p>
            </motion.div>

            {/* Service pills */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-2"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              {services.map((s) => (
                <span
                  key={s.key}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs sm:text-sm font-medium shadow-sm"
                >
                  <span>{s.icon}</span>
                  {getTranslation(currentLang, `hero.services.${s.key}`)}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20">
                <a href="#contact">
                  {getTranslation(currentLang, "hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#projects">{getTranslation(currentLang, "hero.viewWork")}</a>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.p
              className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
            >
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              {getTranslation(currentLang, "hero.credibility")}
            </motion.p>
          </motion.div>

          {/* ── Right content ── */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Profile image — no overflowing absolute cards on mobile */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-2xl scale-95" />
              <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden border border-border aspect-square">
                <img src="/profile.jpg" alt="Franck KAPUYA MBALA" className="w-full h-full object-cover" />
              </div>

              {/* Floating stat cards — hidden on small screens, visible from md */}
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.labelKey}
                  className="hidden md:flex absolute bg-card border border-border rounded-xl px-3 py-2 shadow-xl items-center gap-2"
                  style={{
                    top:    i === 0 ? "8%"  : i === 1 ? "50%" : "auto",
                    bottom: i === 2 ? "8%"  : "auto",
                    left:   i === 1 ? "-14%" : "auto",
                    right:  i === 0 ? "-10%" : i === 2 ? "-10%" : "auto",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                >
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-base font-bold leading-none">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
                      {getTranslation(currentLang, stat.labelKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats row — visible only on mobile, below the image */}
            <motion.div
              className="flex md:hidden justify-center gap-4 mt-6 w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.labelKey}
                  className="flex flex-col items-center gap-1 bg-card border border-border rounded-xl px-3 py-2 shadow-sm flex-1"
                >
                  <p className="text-lg font-bold leading-none text-accent">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground text-center leading-tight">
                    {getTranslation(currentLang, stat.labelKey)}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Partners strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 pt-8 border-t border-border/50"
        >
          <p className="text-center text-xs text-muted-foreground/50 mb-5 uppercase tracking-widest">
            {getTranslation(currentLang, "hero.partners")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="h-10 sm:h-14 flex items-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto max-w-[100px] sm:max-w-[140px] object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
