"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Award, Calendar, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"
import { educationData } from "@/lib/data"
import Link from "next/link"

export function EducationSection() {
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
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const displayedEducation = educationData.filter((edu) => edu.type === "degree")

  return (
    <section id="education" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, "education.title")}</h2>
          </motion.div>

          <div className="grid gap-6">
            {displayedEducation.map((edu, index) => (
              <motion.div
                key={edu.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div whileHover={{ scale: 1.02, x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            {edu.type === "degree" ? (
                              <GraduationCap className="h-6 w-6 text-accent" />
                            ) : (
                              <Award className="h-6 w-6 text-accent" />
                            )}
                          </div>
                        </motion.div>
                        <div className="flex-1 space-y-3">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: index * 0.15 + 0.2 }}
                          >
                            <h3 className="text-xl font-bold">{currentLang === "en" ? edu.title.en : edu.title.fr}</h3>
                            {edu.subtitle && (
                              <p className="text-muted-foreground">
                                {currentLang === "en" ? edu.subtitle.en : edu.subtitle.fr}
                              </p>
                            )}
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap gap-4 text-sm text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            <div className="font-semibold text-accent">{edu.institution}</div>
                            {edu.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {edu.location}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {currentLang === "en"
                                ? `${edu.period.start} - ${edu.period.end}`
                                : `${edu.period.startFr} - ${edu.period.endFr}`}
                            </div>
                          </motion.div>
                          {edu.description && (
                            <motion.p
                              className="text-muted-foreground"
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ delay: index * 0.15 + 0.4 }}
                            >
                              {currentLang === "en" ? edu.description.en : edu.description.fr}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/certifications">
                {getTranslation(currentLang, "education.seeMore")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
