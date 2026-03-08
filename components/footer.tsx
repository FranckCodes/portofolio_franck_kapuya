"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Phone, MapPin, ShoppingBag, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslation, type Language } from "@/lib/i18n"

export function Footer() {
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
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{getTranslation(currentLang, "footer.aboutTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {getTranslation(currentLang, "footer.aboutText")}
            </p>
            <Button asChild variant="link" className="p-0 h-auto gap-2">
              <a href="#trust">
                {getTranslation(currentLang, "footer.aboutLink")}
                <ArrowRight className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Column 2 - Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{getTranslation(currentLang, "footer.contactTitle")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@franckkapuya.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@franckkapuya.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+243827029543" className="text-muted-foreground hover:text-primary transition-colors">
                  +243 827 029 543
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">27bis Rue Wenge, Kinshasa, DRC</span>
              </div>
            </div>
          </div>

          {/* Column 3 - Shop */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{getTranslation(currentLang, "footer.shopTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              {getTranslation(currentLang, "footer.shopText")}
            </p>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href="https://frack-kapuya.store.vercel.app" target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="h-4 w-4" />
                {getTranslation(currentLang, "footer.shopLink")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Column 4 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{getTranslation(currentLang, "footer.linksTitle")}</h3>
            <div className="space-y-3">
              <Button asChild variant="link" className="p-0 h-auto text-sm justify-start">
                <a href="https://portofolio-franck-kapuya.vercel.app" target="_blank" rel="noopener noreferrer">
                  {getTranslation(currentLang, "footer.portfolio")}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href="https://gitlab.com/franck.kapuya" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitLab</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href="mailto:contact@franckkapuya.com">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </div>
              <Button asChild size="sm" className="w-full gap-2">
                <a href="#contact">
                  {getTranslation(currentLang, "footer.scheduleCall")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Franck KAPUYA MBALA. {getTranslation(currentLang, "footer.rights")}
          </p>
          <p className="mt-2">{getTranslation(currentLang, "footer.built")}</p>
        </div>
      </div>
    </footer>
  )
}
