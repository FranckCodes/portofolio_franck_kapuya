"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { GraduationCap, Award, Calendar, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Download, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getTranslation, type Language } from "@/lib/i18n"
import { educationData } from "@/lib/data"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import Image from "next/image"

type Category = "all" | "marketing" | "project-management" | "ai" | "development"

const ITEMS_PER_PAGE = 6

// Liste des images de certifications
const certificationImages = [
  "Screenshot_2023-12-31-22-07-03-791_com.whatsapp.w4b.jpg",
  "Screenshot_2023-12-31-22-07-35-679_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-08-03-882_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-09-04-876_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-09-31-421_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-10-17-098_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-11-25-928_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-12-00-993_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-12-30-240_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-13-01-857_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-13-37-340_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-14-06-284_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-14-30-093_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-15-20-142_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-15-42-808_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-16-18-353_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-16-48-005_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-17-07-879_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-17-22-536_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-17-35-956_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-17-49-545_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-18-01-408_cn.wps.xiaomi.abroad.lite.jpg",
  "Screenshot_2023-12-31-22-18-12-902_cn.wps.xiaomi.abroad.lite.jpg",
]

export default function CertificationsPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % certificationImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + certificationImages.length) % certificationImages.length)
  }

  const handleDownload = (imageName: string) => {
    const link = document.createElement("a")
    link.href = `/certifications/${imageName}`
    link.download = imageName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
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

            <Tabs defaultValue="informations" className="w-full">
              <TabsList className="grid w-full bg-transparent max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="informations">
                  {currentLang === "en" ? "Information" : "Informations"}
                </TabsTrigger>
                <TabsTrigger value="certificates">
                  {currentLang === "en" ? "Certificates" : "Certificats"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="informations" className="space-y-12">

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
              </TabsContent>

              <TabsContent value="certificates" className="space-y-8">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-center">
                    {currentLang === "en" ? "Certificates Gallery" : "Galerie de Certificats"}
                  </h2>

                  {/* Carrousel */}
                  <div className="relative max-w-4xl mx-auto">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] bg-muted">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentImageIndex}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={`/certifications/${certificationImages[currentImageIndex]}`}
                                alt={`Certificat ${currentImageIndex + 1}`}
                                fill
                                className="object-contain"
                                onClick={() => setSelectedImage(certificationImages[currentImageIndex])}
                              />
                            </motion.div>
                          </AnimatePresence>

                          {/* Navigation Buttons */}
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-6 w-6" />
                          </Button>

                          {/* Download Button */}
                          <Button
                            variant="default"
                            className="absolute bottom-4 right-4 z-10 gap-2"
                            onClick={() => handleDownload(certificationImages[currentImageIndex])}
                          >
                            <Download className="h-4 w-4" />
                            {currentLang === "en" ? "Download" : "Télécharger"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Image Counter */}
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                      {currentImageIndex + 1} / {certificationImages.length}
                    </div>

                    {/* Thumbnails */}
                    <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {certificationImages.map((image, index) => (
                        <motion.button
                          key={image}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-accent scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={`/certifications/${image}`}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Modal pour image agrandie */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <Image
                src={`/certifications/${selectedImage}`}
                alt="Certificat agrandi"
                fill
                className="object-contain"
              />
              <Button
                variant="default"
                className="absolute bottom-4 right-4 z-10 gap-2"
                onClick={() => {
                  handleDownload(selectedImage)
                }}
              >
                <Download className="h-4 w-4" />
                {currentLang === "en" ? "Download" : "Télécharger"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
