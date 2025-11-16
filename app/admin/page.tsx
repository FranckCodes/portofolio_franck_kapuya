"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { isAuthenticated, logout } from "@/lib/admin-auth"
import { initializeData } from "@/lib/admin-data"
import Link from "next/link"
import { User, Briefcase, FolderKanban, Award, Code, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default function AdminDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }
    initializeData()
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (!mounted) return null

  const sections = [
    {
      title: "Personal Information",
      description: "Update your name, title, contact details, and bio",
      icon: User,
      href: "/admin/personal",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Experience",
      description: "Manage your work experience and job history",
      icon: Briefcase,
      href: "/admin/experience",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Projects",
      description: "Add, edit, or remove your portfolio projects",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Skills",
      description: "Update your technical skills and proficiency levels",
      icon: Code,
      href: "/admin/skills",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Education & Certifications",
      description: "Manage your degrees and certifications",
      icon: Award,
      href: "/admin/education",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline">View Site</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground mb-12">Select a section below to manage your portfolio content</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={section.href}>
                  <div className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}
                    >
                      <section.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
