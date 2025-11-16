"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"
import { projectsData } from "@/lib/data"
import Link from "next/link"

export function ProjectsSection() {
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

  const displayedProjects = projectsData.slice(0, 4)

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, "projects.title")}</h2>
            <p className="text-lg text-muted-foreground">{getTranslation(currentLang, "projects.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow h-full">
                    <motion.div
                      className="relative aspect-video overflow-hidden bg-muted"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-primary/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <CardContent className="p-6 space-y-4">
                      <motion.h3
                        className="text-2xl font-bold"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                      >
                        {currentLang === "en" ? project.description.en : project.description.fr}
                      </motion.p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ delay: index * 0.2 + i * 0.05 + 0.5 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="secondary">{tech}</Badge>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: index * 0.2 + 0.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                          <a href={project.link}>
                            {getTranslation(currentLang, "projects.viewProject")}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
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
            transition={{ delay: 0.8 }}
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/projects">
                {getTranslation(currentLang, "projects.seeMore")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
