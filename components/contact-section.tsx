"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getTranslation, type Language } from "@/lib/i18n"

export function ContactSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">{getTranslation(currentLang, "contact.title")}</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              {getTranslation(currentLang, "contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <motion.div
                        className="flex items-start gap-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Mail className="h-5 w-5 text-accent" />
                        </motion.div>
                        <div>
                          <div className="font-semibold mb-1">Email</div>
                          <a
                            href="mailto:franckkapuya13@gmail.com"
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            franckkapuya13@gmail.com
                          </a>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Phone className="h-5 w-5 text-accent" />
                        </motion.div>
                        <div>
                          <div className="font-semibold mb-1">Phone</div>
                          <a
                            href="tel:+243827029543"
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            +243 827 029 543
                          </a>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <MapPin className="h-5 w-5 text-accent" />
                        </motion.div>
                        <div>
                          <div className="font-semibold mb-1">Location</div>
                          <p className="text-muted-foreground">27bis Rue Wenge, Kinshasa, DRC</p>
                          <p className="text-sm text-accent mt-1">
                            {getTranslation(currentLang, "contact.availability")}
                          </p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Input placeholder={getTranslation(currentLang, "contact.name")} className="w-full" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Input
                          type="email"
                          placeholder={getTranslation(currentLang, "contact.email")}
                          className="w-full"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Textarea
                          placeholder={getTranslation(currentLang, "contact.message")}
                          rows={5}
                          className="w-full resize-none"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" className="w-full gap-2">
                          {getTranslation(currentLang, "contact.send")}
                          <Send className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
