"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"
import { projectsData } from "@/lib/data"
import Link from "next/link"

const DISPLAYED = projectsData.slice(0, 4)

// Individual card — tracks its own viewport proximity
function ProjectCard({
  project,
  lang,
  index,
  onActive,
  isActive,
}: {
  project: (typeof projectsData)[0]
  lang: Language
  index: number
  onActive: (index: number) => void
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Fire onActive when card crosses the center threshold
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(index)
      },
      { threshold: 0.55 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index, onActive])

  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
    >
      <motion.div
        animate={{
          scale: isActive ? 1 : 0.97,
          opacity: isActive ? 1 : 0.55,
        }}
        whileHover={{ scale: 1.01, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <Card className="overflow-hidden border-border transition-shadow duration-300"
          style={{ boxShadow: isActive ? "0 8px 40px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden bg-muted aspect-video md:aspect-auto md:min-h-[280px]">
              <motion.img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              {/* Index badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Tech badges */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full bg-black/55 text-white text-[10px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-5 sm:p-7 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">{project.title}</h3>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2"
                    />
                  )}
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {getTranslation(lang, "projects.problem")}
                    </span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      {lang === "en" ? project.problem.en : project.problem.fr}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {getTranslation(lang, "projects.solution")}
                    </span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      {lang === "en" ? project.solution.en : project.solution.fr}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/20">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                      {getTranslation(lang, "projects.impact")}
                    </span>
                    <p className="text-foreground mt-1 leading-relaxed font-medium">
                      {lang === "en" ? project.impact.en : project.impact.fr}
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {getTranslation(lang, "projects.viewProject")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [activeIndex, setActiveIndex] = useState(0)
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" })

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLanguageChange = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Header */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {getTranslation(currentLang, "projects.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {getTranslation(currentLang, "projects.subtitle")}
            </p>
          </motion.div>

          {/* Cards list */}
          <div className="space-y-6">
            {DISPLAYED.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                lang={currentLang}
                index={index}
                isActive={activeIndex === index}
                onActive={setActiveIndex}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            ref={ctaRef}
            className="flex justify-center pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
