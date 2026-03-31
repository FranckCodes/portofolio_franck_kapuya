"use client"

import { useEffect, useState } from "react"

import { motion, AnimatePresence } from "framer-motion"

const MESSAGES = [

  "🚀 Prêt à attirer plus de clients ?",

  "Hey 👋 Un projet en tête ? Discutons-en !",

]

export function WhatsAppButton() {

  const [showBubble, setShowBubble] = useState(false)

  const [text, setText] = useState("")

  const [index, setIndex] = useState(0)

  const phoneNumber = "243827029543"
  const waMessage = "Bonjour Franck, Je vous contacte pour discuter d'un projet. J'aimerais en savoir plus sur vos services."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`

  // Typing effect

  useEffect(() => {

    if (!showBubble) return

    let i = 0

    const current = MESSAGES[index]

    setText("")

    const typing = setInterval(() => {

      setText(current.slice(0, i))

      i++

      if (i > current.length) {

        clearInterval(typing)

        // Change message after delay

        setTimeout(() => {

          setIndex((prev) => (prev + 1) % MESSAGES.length)

        }, 3000)

      }

    }, 25)

    return () => clearInterval(typing)

  }, [index, showBubble])

  // Initial trigger

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowBubble(true)

    }, 2000)

    return () => clearTimeout(timer)

  }, [])

  return (

    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* 💬 Bubble */} 

      <AnimatePresence>

        {showBubble && (

          <motion.div

            initial={{ opacity: 0, y: 20, scale: 0.9 }}

            animate={{ opacity: 1, y: 0, scale: 1 }}

            exit={{ opacity: 0 }}

            className="bg-white dark:bg-zinc-900 text-black dark:text-white 

                       rounded-2xl px-4 py-3 shadow-xl 

                       max-w-[260px] border border-zinc-200 dark:border-zinc-700"

          >

            <p className="text-sm leading-snug">

              {text}

              <span className="animate-pulse">|</span>

            </p>

          </motion.div>

        )}

      </AnimatePresence>

      {/* 🟢 Button */}

      <motion.a

        href={whatsappUrl}

        target="_blank"

        className="w-[65px] h-[65px] rounded-full bg-[#25D366] 

                   flex items-center justify-center shadow-lg"

        whileHover={{ scale: 1.1 }}

        whileTap={{ scale: 0.9 }}

      >

        {/* WhatsApp SVG */}

        <svg

          xmlns="http://www.w3.org/2000/svg"

          viewBox="0 0 32 32"

          width="32"

          height="32"

          fill="white"

        >

          <path d="M16.001 2.667c-7.36 0-13.334 5.973-13.334 13.334 0 2.351.615 4.653 1.785 6.683L2.667 29.333l6.83-1.755a13.277 13.277 0 006.504 1.689h.005c7.36 0 13.334-5.973 13.334-13.334S23.36 2.667 16.001 2.667zm0 24c-2.048 0-4.055-.546-5.813-1.579l-.416-.246-4.055 1.041 1.082-3.957-.271-.422A10.64 10.64 0 015.334 16c0-5.882 4.785-10.667 10.667-10.667 5.883 0 10.667 4.785 10.667 10.667 0 5.882-4.784 10.667-10.667 10.667zm5.845-7.963c-.319-.16-1.885-.93-2.177-1.037-.292-.107-.505-.16-.718.16-.213.319-.825 1.037-1.011 1.251-.186.213-.372.24-.691.08-.319-.16-1.347-.496-2.565-1.58-.947-.843-1.586-1.885-1.771-2.204-.186-.319-.02-.491.14-.651.144-.144.319-.372.479-.558.16-.186.213-.319.319-.532.107-.213.053-.399-.027-.559-.08-.16-.718-1.732-.985-2.373-.261-.627-.527-.541-.718-.551l-.612-.011c-.213 0-.559.08-.851.399-.292.319-1.118 1.093-1.118 2.665 0 1.571 1.144 3.087 1.303 3.3.16.213 2.25 3.433 5.457 4.811.763.329 1.358.526 1.822.673.766.244 1.463.21 2.014.127.614-.091 1.885-.771 2.151-1.517.266-.746.266-1.386.186-1.517-.08-.133-.292-.213-.611-.373z"/>

        </svg>

      </motion.a>

    </div>

  )

}