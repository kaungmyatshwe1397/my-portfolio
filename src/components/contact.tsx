// Contact section — terminal-style form + polished cards for social/info

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Send, CheckCircle2, MapPin, Briefcase } from "lucide-react";
import { profile } from "@/lib/seed-data";

// Social link icons
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { ShimmerLink } from "@/components/ui/shimmer-button";

// Social links data
const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: FaGithub },
  { href: profile.social.twitter, label: "X", icon: FaTwitter },
  { href: `mailto:${profile.email}`, label: "Gmail", icon: FiMail },
  { href: profile.social.linkedin, label: "LinkedIn", icon: FaLinkedin },
  { href: "#", label: "Discord", icon: FaDiscord },
].filter((link): link is { href: string; label: string; icon: typeof FaGithub } => !!link.href);

// Animation variants
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

// Terminal input line component
function TerminalInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  const id = `terminal-${label.replace(/>/g, "").trim()}`;
  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor={id} className="text-brand font-mono shrink-0">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/40 font-mono text-sm"
      />
    </div>
  );
}

// Contact section component
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const isValid = Boolean(name.trim() && email.trim() && message.trim());

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      className="grid grid-cols-1 md:grid-cols-5 gap-3"
    >
      {/* Left: Terminal contact form */}
      <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
        <form ref={formRef} onSubmit={handleSubmit} className="h-full">
          <Card className="relative h-full">
            <BorderBeam
              size={80}
              duration={12}
              colorFrom="rgba(255, 255, 255, 0.3)"
              colorTo="rgba(255, 255, 255, 0)"
              borderWidth={1}
            />
            <CardContent className="p-0">
              <Terminal className="max-w-none w-full h-full border-none bg-transparent" sequence={false}>
                <AnimatedSpan delay={0} startOnView>
                  <span className="text-muted-foreground/50">
                    <span className="text-emerald-500">~</span> /portfolio/contact
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={200} startOnView>
                  <TypingAnimation
                    duration={40}
                    className="text-foreground/80"
                    startOnView
                  >
                    {"$ reach-out --to kaung-myat-shwe"}
                  </TypingAnimation>
                </AnimatedSpan>

                <AnimatedSpan delay={1800} startOnView>
                  <span className="text-muted-foreground/30">────────────────────────────</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2200} startOnView>
                  <TerminalInput
                    label="name>"
                    value={name}
                    onChange={setName}
                    placeholder="your name"
                  />
                </AnimatedSpan>

                <AnimatedSpan delay={2400} startOnView>
                  <TerminalInput
                    label="mail>"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@email.com"
                    type="email"
                  />
                </AnimatedSpan>

                <AnimatedSpan delay={2600} startOnView>
                  <div className="flex gap-2 text-sm">
                    <label htmlFor="terminal-msg" className="text-brand font-mono shrink-0 self-start">msg&gt;</label>
                    <textarea
                      id="terminal-msg"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="your message..."
                      rows={3}
                      aria-label="Your message"
                      className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/40 font-mono text-sm resize-none leading-relaxed"
                    />
                  </div>
                </AnimatedSpan>

                <AnimatedSpan delay={2800} startOnView>
                  <div className="flex items-center gap-3 pt-1">
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="sent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-emerald-400 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-mono">message dispatched ✓</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Button
                            type="submit"
                            disabled={!isValid}
                            size="sm"
                            className="rounded-lg px-4 h-8 text-xs font-mono bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.25] hover:border-white/[0.4] text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                          >
                            <Send className="w-3 h-3 mr-1.5" />
                            send
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSpan>
              </Terminal>
            </CardContent>
          </Card>
        </form>
      </motion.div>

      {/* Right top: Info card */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <Card className="relative h-full">
          <BorderBeam
            size={60}
            duration={10}
            delay={1}
            colorFrom="rgba(52, 211, 153, 0.4)"
            colorTo="rgba(52, 211, 153, 0)"
            borderWidth={1}
          />
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400/80" />
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </span>
              <p className="text-xs font-medium text-muted-foreground/60 tracking-wide">open-to-work</p>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Briefcase className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full-stack roles, freelance projects, or interesting collaborations.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Based in {profile.location || "Myanmar"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right bottom: Social links — MagicCard with grid */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <MagicCard
          className="h-full"
          gradientSize={180}
          gradientColor="rgba(255, 255, 255, 0.06)"
          gradientOpacity={1}
          gradientFrom="rgba(255, 255, 255, 0.08)"
          gradientTo="rgba(255, 255, 255, 0)"
        >
          <div className="p-3">
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400/80" />
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </span>
              <p className="text-xs font-medium text-muted-foreground/60 tracking-wide">connect</p>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 gap-2" role="list" aria-label="Social links">
              {/* Row 1: Kaung, GitHub, X */}
              <div className="flex items-center justify-center aspect-square" aria-hidden="true">
                <span className="text-base md:text-lg font-bold text-white/15 select-none tracking-widest">Kaung</span>
              </div>
              {socialLinks.slice(0, 2).map((link) => (
                <ShimmerLink
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  role="listitem"
                  className="w-full aspect-square"
                  borderRadius="0.625rem"
                >
                  <link.icon className="w-full h-full p-2 text-white" />
                </ShimmerLink>
              ))}
              {/* Row 2: Gmail, LinkedIn, Discord */}
              {socialLinks.slice(2).map((link) => (
                <ShimmerLink
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  role="listitem"
                  className="w-full aspect-square"
                  borderRadius="0.625rem"
                >
                  <link.icon className="w-full h-full p-2 text-white" />
                </ShimmerLink>
              ))}
            </div>
          </div>
        </MagicCard>
      </motion.div>
    </motion.div>
  );
}
