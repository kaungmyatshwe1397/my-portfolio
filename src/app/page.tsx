// Main portfolio page - single page application with all sections

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { TechStack } from "@/components/tech-stack";
import { GitHubBento } from "@/components/github-bento";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import { SectionReveal } from "@/components/section-reveal";
import { BackgroundMesh } from "@/components/background-mesh";
import { LightRays } from "@/components/ui/light-rays";
import { MorphingText } from "@/components/ui/morphing-text";
import { fetchGitHubContributions, fetchPinnedRepos } from "@/lib/github";

// Main page component with all portfolio sections
export default async function Home() {
  const [contributions, pinnedRepos] = await Promise.all([
    fetchGitHubContributions(),
    fetchPinnedRepos(),
  ]);

  return (
    <main className="relative min-h-screen">
      {/* Animated background mesh — behind everything, glassmorphism blurs it */}
      <BackgroundMesh />

      {/* Light rays — faint white beams from above */}
      <LightRays
        color="rgba(255, 255, 255, 0.12)"
        count={4}
        speed={20}
        blur={60}
        length="80vh"
      />

      {/* All content above the background mesh */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Skip navigation for keyboard/screen reader users */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-lg focus:ring-2 focus:ring-foreground/30"
        >
          Skip to content
        </a>

        {/* Splash loading screen */}
        <LoadingScreen />

        {/* Navigation */}
        <Navbar />

        {/* Hero Section — handles its own layout and scroll morphing */}
        <Hero />

        {/* About Section — text effects and scroll-driven reveal */}
        <About />

        {/* Tech Stack Section */}
        <SectionReveal>
          <section id="skills" className="pt-16 pb-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <MorphingText
                className="h-12 md:h-14 lg:h-16 text-3xl md:text-4xl lg:text-5xl text-white max-w-lg mb-12"
                texts={["Tech Stack", "Tools I build with", "My daily drivers"]}
              />
              <TechStack />
            </div>
          </section>
        </SectionReveal>

        {/* GitHub Bento Section — confident entrance */}
        <SectionReveal character="confident">
          <section id="github" className="py-28 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <MorphingText
                className="h-12 md:h-14 lg:h-16 text-3xl md:text-4xl lg:text-5xl text-white max-w-lg mb-12"
                texts={["GitHub Activity", "Code in motion", "Building in public"]}
              />
              <GitHubBento
                contributions={contributions}
                pinnedRepos={pinnedRepos}
              />
            </div>
          </section>
        </SectionReveal>

        {/* Certifications Section — badge cards with glow */}
        <SectionReveal character="confident">
          <section id="certifications" className="py-28 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <MorphingText
                className="h-12 md:h-14 lg:h-16 text-3xl md:text-4xl lg:text-5xl text-white max-w-lg mb-12"
                texts={["Certifications", "Badges", "Credentials", "Achievements"]}
              />
              <Certifications />
            </div>
          </section>
        </SectionReveal>

        {/* Contact Section — intimate fade, brand-tinted break */}
        <SectionReveal character="intimate">
          <section id="contact" className="pt-24 pb-32 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <MorphingText
                className="h-12 md:h-14 lg:h-16 text-3xl md:text-4xl lg:text-5xl text-white max-w-lg mb-12"
                texts={["Get In Touch", "Let's build together", "Say hello"]}
              />
              <Contact />
            </div>
          </section>
        </SectionReveal>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
