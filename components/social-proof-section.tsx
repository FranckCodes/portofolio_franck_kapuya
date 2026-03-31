"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const metrics = [
  { value: 6, suffix: "+", key: "projects" },
  { value: 500, suffix: "+", key: "users" },
  { value: 98, suffix: "%", key: "satisfaction" },
  { value: 7, suffix: "+", key: "years" },
]

const testimonials = [
  { nameKey: "proof.t1.name", roleKey: "proof.t1.role", textKey: "proof.t1.text", rating: 5 },
  { nameKey: "proof.t2.name", roleKey: "proof.t2.role", textKey: "proof.t2.text", rating: 5 },
  { nameKey: "proof.t3.name", roleKey: "proof.t3.role", textKey: "proof.t3.text", rating: 5 },
]

export function SocialProofSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLanguageChange = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <section id="proof" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors"
              >
                <p className="text-4xl md:text-5xl font-bold text-accent">
                  <CountUp target={m.value} suffix={m.suffix} />
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {getTranslation(currentLang, `proof.metrics.${m.key}`)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-10">
            <motion.div
              className="text-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold">
                {getTranslation(currentLang, "proof.title")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {getTranslation(currentLang, "proof.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all space-y-4"
                >
                  <Quote className="h-8 w-8 text-accent/30 absolute top-5 right-5" />
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{getTranslation(currentLang, t.textKey)}"
                  </p>
                  <div className="pt-2 border-t border-border">
                    <p className="font-semibold text-sm">{getTranslation(currentLang, t.nameKey)}</p>
                    <p className="text-xs text-muted-foreground">{getTranslation(currentLang, t.roleKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
