"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getTranslation, type Language } from "@/lib/i18n"

export function ShopSection() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)

    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLang(e.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  return (
    <section id="shop" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {getTranslation(currentLang, "shop.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {getTranslation(currentLang, "shop.description")}
                    </p>
                    <Button asChild size="lg" className="gap-2">
                      <a href="https://frack-kapuya.store.vercel.app" target="_blank" rel="noopener noreferrer">
                        {getTranslation(currentLang, "shop.cta")}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
