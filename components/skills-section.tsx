"use client"

import { useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"
import { skillsData } from "@/lib/data"

export function SkillsSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    frontend: false,
    backend: false,
    tools: false,
    other: false,
  })
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

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <motion.span
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )

  const SkillCategory = ({
    title,
    skills,
    categoryKey,
    customIndex,
  }: {
    title: string
    skills: Array<{ name: string; level: number }>
    categoryKey: string
    customIndex: number
  }) => {
    const isExpanded = expandedCategories[categoryKey]
    const displayedSkills = isExpanded ? skills : skills.slice(0, 4)
    const hasMore = skills.length > 4

    return (
      <motion.div
        custom={customIndex}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: customIndex * 0.5 }}
                />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence initial={false}>
                {displayedSkills.map((skill, index) => (
                  <SkillBar key={`${categoryKey}-${skill.name}`} name={skill.name} level={skill.level} index={index} />
                ))}
              </AnimatePresence>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCategory(categoryKey)}
                    className="w-full flex items-center justify-center gap-2 text-accent hover:text-accent/80"
                  >
                    {isExpanded ? (
                      <>
                        {getTranslation(currentLang, "skills.showLess")}
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        {getTranslation(currentLang, "skills.showMore")} ({skills.length - 4})
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

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

  return (
    <section id="skills" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, "skills.title")}</h2>
            <p className="text-lg text-muted-foreground">{getTranslation(currentLang, "skills.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <SkillCategory
              title={getTranslation(currentLang, "skills.frontend")}
              skills={skillsData.frontend}
              categoryKey="frontend"
              customIndex={0}
            />

            <SkillCategory
              title={getTranslation(currentLang, "skills.backend")}
              skills={skillsData.backend}
              categoryKey="backend"
              customIndex={1}
            />

            <SkillCategory
              title={getTranslation(currentLang, "skills.database")}
              skills={skillsData.tools}
              categoryKey="tools"
              customIndex={2}
            />

            <SkillCategory
              title={getTranslation(currentLang, "skills.other")}
              skills={skillsData.other}
              categoryKey="other"
              customIndex={3}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
