"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { login, isAuthenticated } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, AlertCircle, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import type { Language } from "@/lib/i18n"

export const dynamic = "force-dynamic"

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    setMounted(true)
    if (isAuthenticated()) {
      router.push("/admin")
    }
  }, [router])

  useEffect(() => {
    if (mounted) {
      setCurrentLanguage(language)
    }
  }, [language, mounted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (login(password)) {
      router.push("/admin")
    } else {
      setError("Invalid password. Please try again.")
      setPassword("")
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <Link href="/" className="fixed top-6 left-6 z-50">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          {getTranslation(currentLanguage, "admin.backToSite")}
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Enter your password to access the dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                autoFocus
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <Button type="submit" className="w-full h-12" size="lg">
              Login
            </Button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Default password: admin123</p>
            <p className="mt-1">Change this in production!</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
