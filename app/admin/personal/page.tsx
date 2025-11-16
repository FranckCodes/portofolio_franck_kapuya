"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { isAuthenticated } from "@/lib/admin-auth"
import { getPersonalInfo, updatePersonalInfo, type PersonalInfo } from "@/lib/admin-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, CheckCircle } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function AdminPersonal() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState<PersonalInfo>({
    name: "",
    title: { en: "", fr: "" },
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    bio: { en: "", fr: "" },
  })

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }
    const data = getPersonalInfo()
    if (data) setFormData(data)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updatePersonalInfo(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Personal Information</h1>
          <div className="w-32" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Info */}
          <div className="bg-card border rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title (English)</label>
                <Input
                  value={formData.title.en}
                  onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                  placeholder="Web Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title (French)</label>
                <Input
                  value={formData.title.fr}
                  onChange={(e) => setFormData({ ...formData, title: { ...formData.title, fr: e.target.value } })}
                  placeholder="Développeur Web"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card border rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+243 XXX XXX XXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">GitHub/GitLab URL</label>
                <Input
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-card border rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold">Biography</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Bio (English)</label>
              <Textarea
                value={formData.bio.en}
                onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
                placeholder="Write a short bio about yourself..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio (French)</label>
              <Textarea
                value={formData.bio.fr}
                onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, fr: e.target.value } })}
                placeholder="Écrivez une courte biographie..."
                rows={4}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4">
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-green-600"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Saved successfully!</span>
              </motion.div>
            )}
            <Button type="submit" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}
