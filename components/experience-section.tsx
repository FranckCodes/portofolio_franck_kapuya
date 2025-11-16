"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Briefcase, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTranslation, type Language } from "@/lib/i18n"
import { experienceData } from "@/lib/data"

export function ExperienceSection() {
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
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <section id="experience" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, "experience.title")}</h2>
          </motion.div>

          <div className="grid gap-6 md:gap-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Card className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                  />

                  <CardContent className="relative p-6 md:p-8">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-8">
                      <div className="space-y-4">
                        <motion.div
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Briefcase className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-sm">{exp.company}</span>
                        </motion.div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3 text-sm">
                            <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                              <div className="font-medium">
                                {currentLang === "en"
                                  ? `${exp.period.start} - ${exp.period.end}`
                                  : `${exp.period.startFr} - ${exp.period.endFr}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 text-sm text-muted-foreground">
                            <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                              transition={{ delay: index * 0.15 + i * 0.05 + 0.5 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-accent/20 hover:bg-accent/30 text-accent-foreground border-accent/30"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <motion.div
                          className="group/title"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 group-hover/title:text-accent transition-colors">
                            {currentLang === "en" ? exp.title.en : exp.title.fr}
                            <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                          </h3>
                        </motion.div>

                        <ul className="space-y-3">
                          {(currentLang === "en" ? exp.description.en : exp.description.fr).map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex gap-3 group/item"
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.15 + i * 0.1 + 0.4 }}
                            >
                              <motion.div
                                className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0"
                                whileHover={{ scale: 1.5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              />
                              <span className="text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent/50"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
