"use client"

// Simple admin authentication using localStorage
// In production, use a proper authentication system

const ADMIN_PASSWORD = "admin123" // Change this in production
const AUTH_KEY = "admin_authenticated"

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true")
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}
