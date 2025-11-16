"use client"

import { experienceData, projectsData, skillsData, educationData } from "./data"

// Data management functions for admin panel
// In production, these would be API calls to a backend

const STORAGE_KEYS = {
  EXPERIENCE: "admin_experience_data",
  PROJECTS: "admin_projects_data",
  SKILLS: "admin_skills_data",
  EDUCATION: "admin_education_data",
  PERSONAL: "admin_personal_data",
}

export interface PersonalInfo {
  name: string
  title: { en: string; fr: string }
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  bio: { en: string; fr: string }
}

// Initialize with default data
export function initializeData() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experienceData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projectsData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillsData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.EDUCATION)) {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(educationData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.PERSONAL)) {
    const defaultPersonal: PersonalInfo = {
      name: "Franck KAPUYA MBALA",
      title: {
        en: "Web Developer & Digital Marketer",
        fr: "Développeur Web & Marketeur Digital",
      },
      email: "franckkapuya13@gmail.com",
      phone: "+243 827 029 543",
      location: "Kinshasa, Democratic Republic of the Congo",
      github: "https://gitlab.com/franck.kapuya",
      linkedin: "#",
      bio: {
        en: "I'm a passionate web developer and digital marketer with expertise in both frontend and backend development.",
        fr: "Je suis un développeur web et marketeur digital passionné avec une expertise en développement frontend et backend.",
      },
    }
    localStorage.setItem(STORAGE_KEYS.PERSONAL, JSON.stringify(defaultPersonal))
  }
}

// Personal Info
export function getPersonalInfo(): PersonalInfo | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEYS.PERSONAL)
  return data ? JSON.parse(data) : null
}

export function updatePersonalInfo(info: PersonalInfo): void {
  localStorage.setItem(STORAGE_KEYS.PERSONAL, JSON.stringify(info))
}

// Experience
export function getExperience() {
  if (typeof window === "undefined") return experienceData
  const data = localStorage.getItem(STORAGE_KEYS.EXPERIENCE)
  return data ? JSON.parse(data) : experienceData
}

export function updateExperience(data: any[]) {
  localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(data))
}

// Projects
export function getProjects() {
  if (typeof window === "undefined") return projectsData
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS)
  return data ? JSON.parse(data) : projectsData
}

export function updateProjects(data: any[]) {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data))
}

// Skills
export function getSkills() {
  if (typeof window === "undefined") return skillsData
  const data = localStorage.getItem(STORAGE_KEYS.SKILLS)
  return data ? JSON.parse(data) : skillsData
}

export function updateSkills(data: any) {
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(data))
}

// Education
export function getEducation() {
  if (typeof window === "undefined") return educationData
  const data = localStorage.getItem(STORAGE_KEYS.EDUCATION)
  return data ? JSON.parse(data) : educationData
}

export function updateEducation(data: any[]) {
  localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(data))
}
