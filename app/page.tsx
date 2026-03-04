import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { MethodSection } from "@/components/method-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { TrustSection } from "@/components/trust-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <MethodSection />
      <ProjectsSection />
      <ExpertiseSection />
      <TrustSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
