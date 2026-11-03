"use client"

import type { ComponentProps, MouseEvent } from "react"
import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/i18n"

const CAL_LINK = "franck-kapuya-axenjh/30min"
const CAL_ORIGIN = "https://app.cal.com"

type CalFunction = ((...args: unknown[]) => void) & { q: unknown[][]; ns: Record<string, unknown>; loaded: boolean }

declare global {
  interface Window {
    Cal?: CalFunction
  }
}

// The Cal.com script is only fetched on the first click, to keep the page light.
function getCal(fallbackUrl: string) {
  if (window.Cal) return window.Cal

  const cal = ((...args: unknown[]) => {
    cal.q.push(args)
  }) as CalFunction
  cal.q = []
  cal.ns = {}
  cal.loaded = true
  window.Cal = cal

  const script = document.createElement("script")
  script.src = `${CAL_ORIGIN}/embed/embed.js`
  script.onerror = () => {
    window.Cal = undefined
    script.remove()
    window.location.assign(fallbackUrl)
  }
  document.head.appendChild(script)

  cal("init", { origin: CAL_ORIGIN })
  return cal
}

interface BookCallButtonProps extends Omit<ComponentProps<typeof Button>, "asChild" | "onClick"> {
  lang: Language
}

export function BookCallButton({ lang, children, className, ...props }: BookCallButtonProps) {
  const href = `https://cal.com/${CAL_LINK}`

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let ctrl/cmd-click open the booking page in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    getCal(href)("modal", {
      calLink: CAL_LINK,
      config: {
        layout: "month_view",
        lng: lang,
        theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      },
    })
  }

  return (
    <Button asChild className={className} {...props}>
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        <CalendarDays className="h-4 w-4" />
        {children}
      </a>
    </Button>
  )
}
