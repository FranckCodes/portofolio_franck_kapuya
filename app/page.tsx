import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { MethodSection } from "@/components/method-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { TrustSection } from "@/components/trust-section"
import { ShopSection } from "@/components/shop-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MethodSection />
      <ProjectsSection />
      <ExpertiseSection />
      <TrustSection />
      <ShopSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
