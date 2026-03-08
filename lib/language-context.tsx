"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if user has a saved preference
    const savedLanguage = localStorage.getItem("language") as Language
    
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      // User has a saved preference, use it
      setLanguageState(savedLanguage)
    } else {
      // No saved preference, detect browser language
      const browserLang = navigator.language.toLowerCase()
      
      // Check if browser language starts with 'fr' (fr, fr-FR, fr-CA, etc.)
      if (browserLang.startsWith("fr")) {
        setLanguageState("fr")
        localStorage.setItem("language", "fr")
      } else {
        // Default to English for all other languages
        setLanguageState("en")
        localStorage.setItem("language", "en")
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    
    // Dispatch custom event for components that listen to language changes
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Return default value instead of throwing during SSR
    if (typeof window === "undefined") {
      return { language: "en" as Language, setLanguage: () => {} }
    }
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
