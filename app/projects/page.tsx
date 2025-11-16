"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"
import { projectsData } from "@/lib/data"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function ProjectsPage() {
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
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="ghost" asChild className="gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  {getTranslation(currentLang, "projects.backToHome")}
                </Link>
              </Button>
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  {getTranslation(currentLang, "projects.allProjects")}
                </h1>
                <p className="text-lg text-muted-foreground">{getTranslation(currentLang, "projects.subtitle")}</p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6" ref={ref}>
              {projectsData.map((project, index) => (
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
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <p className="text-muted-foreground">
                          {currentLang === "en" ? project.description.en : project.description.fr}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <motion.div key={tech} whileHover={{ scale: 1.1 }}>
                              <Badge variant="secondary">{tech}</Badge>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }}>
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
          </div>
        </div>
      </main>
    </>
  )
}
