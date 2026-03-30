"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/i18n"

// 2 message variations per language
const MESSAGES = {
  en: [
    // Version 1 — conversion-focused
    "🚀 Ready to get more clients? Let's build something that works.",
    // Version 2 — friendly & conversational
    "Hey 👋 I'm Franck. Got a project in mind? I'd love to hear about it!",
  ],
  fr: [
    "🚀 Prêt à attirer plus de clients ? Construisons quelque chose qui fonctionne.",
    "Hey 👋 Je suis Franck. Un projet en tête ? Je serais ravi d'en discuter !",
  ],
}

const TYPING_DELAY = 38
const BUBBLE_VISIBLE_MS = 9000   // how long bubble stays after typing finishes
const LOOP_INTERVAL_MS = 22000   // time between re-appearances

export function WhatsAppButton() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [showBubble, setShowBubble] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const phoneNumber = "243827029543"
  const waMessage =
    "Bonjour Franck, Je vous contacte pour discuter d'un projet. J'aimerais en savoir plus sur vos services."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored) setCurrentLang(stored)
    const handleLang = (e: CustomEvent) => setCurrentLang(e.detail)
    window.addEventListener("languageChange", handleLang as EventListener)
    return () => window.removeEventListener("languageChange", handleLang as EventListener)
  }, [])

  const clearAllTimers = useCallback(() => {
    if (typingRef.current) clearTimeout(typingRef.current)
    if (hideRef.current) clearTimeout(hideRef.current)
    if (loopRef.current) clearTimeout(loopRef.current)
  }, [])

  const startTyping = useCallback((text: string) => {
    setTypedText("")
    setIsTyping(true)
    let i = 0
    const type = () => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1))
        i++
        typingRef.current = setTimeout(type, TYPING_DELAY)
      } else {
        setIsTyping(false)
        // auto-hide after visible duration, then loop with next message
        hideRef.current = setTimeout(() => {
          setShowBubble(false)
          loopRef.current = setTimeout(() => {
            setMsgIndex((prev) => (prev + 1) % 2)
            setShowBubble(true)
            setIsTyping(true)
          }, LOOP_INTERVAL_MS)
        }, BUBBLE_VISIBLE_MS)
      }
    }
    typingRef.current = setTimeout(type, 500)
  }, [])

  // Initial trigger after 2.5s
  useEffect(() => {
    if (dismissed) return
    const init = setTimeout(() => {
      setShowBubble(true)
      setIsTyping(true)
    }, 2500)
    return () => clearTimeout(init)
  }, [dismissed])

  // Run typing when showBubble + isTyping become true
  useEffect(() => {
    if (!showBubble || !isTyping) return
    const text = MESSAGES[currentLang][msgIndex]
    startTyping(text)
    return clearAllTimers
  }, [showBubble, isTyping, msgIndex, currentLang, startTyping, clearAllTimers])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    clearAllTimers()
    setShowBubble(false)
    setDismissed(true)
  }

  return (
    <>
      <script src="https://cdn.lordicon.com/lordicon.js" async />

      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-2rem)]">

        {/* Chat bubble */}
        <AnimatePresence mode="wait">
          {showBubble && !dismissed && (
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="relative"
            >
              {/* Sender label */}
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="text-xs text-muted-foreground font-medium">Franck</span>
              </div>

              {/* Bubble */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative max-w-[min(180px,calc(100vw-5rem))] sm:max-w-[230px] md:max-w-[260px] bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-2xl rounded-br-sm px-3 py-2.5 sm:px-4 sm:py-3 shadow-2xl border border-zinc-100 dark:border-zinc-700"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
              >
                {/* Close */}
                <button
                  onClick={handleDismiss}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-600 text-zinc-500 dark:text-zinc-300 text-xs flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-500 transition-colors z-10"
                  aria-label="Close"
                >
                  ×
                </button>

                {/* Typing dots (before first char) */}
                {isTyping && typedText.length === 0 ? (
                  <span className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#25D366]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </span>
                ) : (
                  <p className="text-xs sm:text-sm leading-snug">
                    {typedText}
                    {isTyping && (
                      <motion.span
                        className="inline-block w-[2px] h-3.5 bg-zinc-400 ml-0.5 align-middle rounded-full"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.45, repeat: Infinity }}
                      />
                    )}
                  </p>
                )}

                {/* Timestamp */}
                {!isTyping && typedText.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[10px] text-zinc-400 dark:text-zinc-500 text-right mt-1.5"
                  >
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </motion.p>
                )}

                {/* Bubble tail */}
                <span className="absolute bottom-0 right-[-7px] w-4 h-4 overflow-hidden pointer-events-none">
                  <span className="absolute bottom-0 left-0 w-5 h-5 bg-white dark:bg-zinc-800 rounded-bl-full border-b border-l border-zinc-100 dark:border-zinc-700" />
                </span>
              </motion.div>

              {/* Variation pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-end mt-1.5 gap-1"
              >
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === msgIndex ? "bg-[#25D366]" : "bg-zinc-300 dark:bg-zinc-600"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative flex items-center justify-center w-[62px] h-[62px] md:w-[70px] md:h-[70px] rounded-full bg-[#25D366] cursor-pointer select-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 220 }}
          whileHover={{ scale: 1.13 }}
          whileTap={{ scale: 0.91 }}
          style={{ boxShadow: "0 4px 24px rgba(37,211,102,0.45)" }}
        >
          {/* Pulse rings */}
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.55, 1.55], opacity: [0.45, 0, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.3, 1.3], opacity: [0.35, 0, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />

          {/* Subtle bounce when not hovered */}
          <motion.div
            animate={hovered ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/dhcosedn.json"
              trigger="loop"
              delay="2500"
              colors="primary:#ffffff,secondary:#ffffff"
              style={{ width: "40px", height: "40px" }}
            />
          </motion.div>

          {/* Notification badge */}
          <motion.span
            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-zinc-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 500 }}
          >
            1
          </motion.span>
        </motion.a>
      </div>
    </>
  )
}
