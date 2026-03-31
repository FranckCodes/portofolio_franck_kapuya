import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { MethodSection } from "@/components/method-section"
import { TrustSection } from "@/components/trust-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <SocialProofSection />
      <ProjectsSection />
      <ExpertiseSection />
      <MethodSection />
      <TrustSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
