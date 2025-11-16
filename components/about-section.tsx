"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getTranslation, type Language } from "@/lib/i18n"

export function AboutSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)

    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLang(e.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const languageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="about" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, "about.title")}</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              {getTranslation(currentLang, "about.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div custom={0} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-2 hover:border-accent transition-colors h-full">
                  <CardContent className="p-6 space-y-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Brain className="h-6 w-6 text-accent" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{getTranslation(currentLang, "about.analytical")}</h3>
                    <p className="text-muted-foreground">{getTranslation(currentLang, "about.analyticalDesc")}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div custom={1} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-2 hover:border-accent transition-colors h-full">
                  <CardContent className="p-6 space-y-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Zap className="h-6 w-6 text-accent" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{getTranslation(currentLang, "about.adaptability")}</h3>
                    <p className="text-muted-foreground">{getTranslation(currentLang, "about.adaptabilityDesc")}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Languages */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <motion.div
              className="text-center"
              custom={0}
              variants={languageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold mb-2">French</div>
              <div className="text-sm text-muted-foreground">Mother tongue</div>
            </motion.div>
            <motion.div
              className="text-center"
              custom={1}
              variants={languageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold mb-2">English</div>
              <div className="text-sm text-muted-foreground">Professional</div>
            </motion.div>
            <motion.div
              className="text-center"
              custom={2}
              variants={languageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold mb-2">Lingala</div>
              <div className="text-sm text-muted-foreground">Mother tongue</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
