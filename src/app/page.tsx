// Main portfolio page - single page application with all sections

import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { Projects } from "@/components/projects";
import { GitHubStats } from "@/components/github-stats";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import { Meteors } from "@/components/ui/meteors";

// Main page component with all portfolio sections
export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Unified page background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />

      {/* Meteor effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Meteors number={25} />
      </div>

      {/* Splash loading screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section - Profile & Introduction */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <Hero />
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Tech Stack
          </h2>
          <TechStack />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Projects
          </h2>
          <Projects />
        </div>
      </section>

      {/* GitHub Stats Section */}
      <section id="github" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            GitHub Activity
          </h2>
          <GitHubStats />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In Touch
          </h2>
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
