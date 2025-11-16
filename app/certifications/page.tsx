"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Award, Calendar, MapPin, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"
import { educationData } from "@/lib/data"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

type Category = "all" | "marketing" | "project-management" | "ai" | "development"

const ITEMS_PER_PAGE = 6

export default function CertificationsPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [currentPage, setCurrentPage] = useState(1)
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

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const degrees = educationData.filter((edu) => edu.type === "degree")
  const allCertifications = educationData.filter((edu) => edu.type === "certification")

  const filteredCertifications =
    selectedCategory === "all"
      ? allCertifications
      : allCertifications.filter((cert: any) => cert.category === selectedCategory)

  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCertifications = filteredCertifications.slice(startIndex, endIndex)

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: getTranslation(currentLang, "education.categories.all") },
    { key: "marketing", label: getTranslation(currentLang, "education.categories.marketing") },
    { key: "project-management", label: getTranslation(currentLang, "education.categories.projectManagement") },
    { key: "ai", label: getTranslation(currentLang, "education.categories.ai") },
    { key: "development", label: getTranslation(currentLang, "education.categories.development") },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-20 bg-muted/30">
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
                  {getTranslation(currentLang, "education.backToHome")}
                </Link>
              </Button>
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  {getTranslation(currentLang, "education.allCertifications")}
                </h1>
              </div>
            </motion.div>

            {/* Degrees Section */}
            <div className="space-y-6" ref={ref}>
              <motion.h2
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                {getTranslation(currentLang, "education.degrees")}
              </motion.h2>
              <div className="grid gap-6">
                {degrees.map((edu, index) => (
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
                                <GraduationCap className="h-6 w-6 text-accent" />
                              </div>
                            </motion.div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="text-xl font-bold">
                                  {currentLang === "en" ? edu.title.en : edu.title.fr}
                                </h3>
                                {edu.subtitle && (
                                  <p className="text-muted-foreground">
                                    {currentLang === "en" ? edu.subtitle.en : edu.subtitle.fr}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                              </div>
                              {edu.description && (
                                <p className="text-muted-foreground">
                                  {currentLang === "en" ? edu.description.en : edu.description.fr}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <motion.h2
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {getTranslation(currentLang, "education.certifications")}
              </motion.h2>

              {/* Category Filter Tabs */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.key)}
                    className="transition-all"
                  >
                    {category.label}
                  </Button>
                ))}
              </motion.div>

              {/* Certifications Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {paginatedCertifications.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <motion.div
                              className="flex-shrink-0"
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.6 }}
                            >
                              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Award className="h-6 w-6 text-accent" />
                              </div>
                            </motion.div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="text-lg font-bold leading-tight">
                                  {currentLang === "en" ? edu.title.en : edu.title.fr}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <div className="font-semibold text-accent">{edu.institution}</div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {currentLang === "en"
                                    ? `${edu.period.start} - ${edu.period.end}`
                                    : `${edu.period.startFr} - ${edu.period.endFr}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <motion.div
                  className="flex items-center justify-center gap-4 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {getTranslation(currentLang, "education.pagination.previous")}
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-2"
                  >
                    {getTranslation(currentLang, "education.pagination.next")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {/* Page Info */}
              {filteredCertifications.length > 0 && (
                <motion.p
                  className="text-center text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {getTranslation(currentLang, "education.pagination.page")} {currentPage}{" "}
                  {getTranslation(currentLang, "education.pagination.of")} {totalPages}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
