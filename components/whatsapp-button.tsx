"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getTranslation, type Language } from "@/lib/i18n"

const TYPING_TEXT = "Hi 👋 Need help? Chat with us now!"
const TYPING_DELAY = 40 // ms per character

export function WhatsAppButton() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [showBubble, setShowBubble] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const phoneNumber = "243827029543"
  const message =
    "Bonjour Franck, Je vous contacte pour discuter d'un projet où la structuration des systèmes, l'analyse des données et la fiabilité sont essentielles. J'aimerais en savoir plus sur vos services et comment vous pourriez accompagner notre organisation."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLang = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLang as EventListener)
    return () => window.removeEventListener("languageChange", handleLang as EventListener)
  }, [])

  // Show bubble after 2s, then type
  useEffect(() => {
    if (dismissed) return
    const showTimer = setTimeout(() => {
      setShowBubble(true)
      setIsTyping(true)
    }, 2000)
    return () => clearTimeout(showTimer)
  }, [dismissed])

  // Typing effect
  useEffect(() => {
    if (!isTyping) return
    let i = 0
    setTypedText("")
    const type = () => {
      if (i < TYPING_TEXT.length) {
        setTypedText(TYPING_TEXT.slice(0, i + 1))
        i++
        typingRef.current = setTimeout(type, TYPING_DELAY)
      } else {
        setIsTyping(false)
      }
    }
    typingRef.current = setTimeout(type, 600) // small pause before typing starts
    return () => { if (typingRef.current) clearTimeout(typingRef.current) }
  }, [isTyping])

  return (
    <>
      {/* Lordicon script */}
      <script src="https://cdn.lordicon.com/lordicon.js" async />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {/* Chat bubble */}
        <AnimatePresence>
          {showBubble && !dismissed && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative max-w-[220px] bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-xl border border-zinc-100 dark:border-zinc-700"
            >
              {/* Close button */}
              <button
                onClick={() => setDismissed(true)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-600 text-zinc-500 dark:text-zinc-300 text-xs flex items-center justify-center hover:bg-zinc-300 transition-colors"
                aria-label="Close"
              >
                ×
              </button>

              {/* Typing dots or text */}
              {isTyping && typedText.length === 0 ? (
                <span className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#25D366]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </span>
              ) : (
                <span>
                  {typedText}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-0.5 h-3.5 bg-zinc-400 ml-0.5 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </span>
              )}

              {/* Bubble tail */}
              <span className="absolute bottom-0 right-[-6px] w-3 h-3 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-4 h-4 bg-white dark:bg-zinc-800 rounded-bl-full border-b border-l border-zinc-100 dark:border-zinc-700" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
          className="relative flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[#25D366] cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          style={{
            boxShadow: "0 0 0 0 rgba(37,211,102,0.5)",
          }}
        >
          {/* Glow pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.35, 1.35], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          />

          {/* Lordicon animated WhatsApp icon */}
          <lord-icon
            src="https://cdn.lordicon.com/dhcosedn.json"
            trigger="loop"
            delay="2000"
            colors="primary:#ffffff,secondary:#ffffff"
            style={{ width: "42px", height: "42px" }}
          />

          {/* Notification badge */}
          <motion.span
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 400 }}
          >
            1
          </motion.span>
        </motion.a>
      </div>
    </>
  )
}
