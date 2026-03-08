"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "243827029543"
  const message = "Bonjour Franck, Je vous contacte pour discuter d'un projet où la structuration des systèmes, l'analyse des données et la fiabilité sont essentielles. J'aimerais en savoir plus sur vos services et comment vous pourriez accompagner notre organisation."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-shadow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
      <span className="sr-only">Contact via WhatsApp</span>
    </motion.a>
  )
}
