// Main portfolio page - single page application with all sections

import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { GitHubBento } from "@/components/github-bento";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import { SectionReveal } from "@/components/section-reveal";
import { BackgroundMesh } from "@/components/background-mesh";
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

      {/* All content above the background mesh */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Splash loading screen */}
        <LoadingScreen />

        {/* Navigation */}
        <Navbar />

        {/* Hero Section — handles its own layout and scroll morphing */}
        <Hero />

        {/* Tech Stack Section */}
        <SectionReveal>
          <section id="skills" className="pt-16 pb-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center mb-12">
                Tech Stack
              </h2>
              <TechStack />
            </div>
          </section>
        </SectionReveal>

        {/* GitHub Bento Section — confident entrance */}
        <SectionReveal character="confident">
          <section id="github" className="py-28 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center mb-12">
                GitHub Activity
              </h2>
              <GitHubBento
                contributions={contributions}
                pinnedRepos={pinnedRepos}
              />
            </div>
          </section>
        </SectionReveal>

        {/* Contact Section — intimate fade, brand-tinted break */}
        <SectionReveal character="intimate">
          <section id="contact" className="pt-24 pb-32 px-4 md:px-8 bg-brand/[0.03] border-t border-brand/10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-center mb-12">
                Get In Touch
              </h2>
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
