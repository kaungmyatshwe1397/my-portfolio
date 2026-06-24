// Contact section — terminal-style form + dock for social links

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { Send, CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/seed-data";

// Social link icons
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

// Social links data
const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: FaGithub },
  { href: profile.social.linkedin, label: "LinkedIn", icon: FaLinkedin },
  { href: profile.social.twitter, label: "Twitter", icon: FaTwitter },
  { href: profile.social.website, label: "Website", icon: FiGlobe },
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
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-brand font-mono shrink-0">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const isValid = name.trim() && email.trim() && message.trim();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      className="grid grid-cols-1 md:grid-cols-5 gap-4"
    >
      {/* Left: Terminal contact form — spans 3 cols + 2 rows on desktop */}
      <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2">
        <form ref={formRef} onSubmit={handleSubmit} className="h-full">
          <Terminal className="max-w-none w-full h-full" sequence={false}>
            {/* Header line */}
            <AnimatedSpan delay={0} startOnView>
              <span className="text-muted-foreground/50">
                <span className="text-green-500">~</span> /portfolio/contact
              </span>
            </AnimatedSpan>

            {/* Typing prompt */}
            <AnimatedSpan delay={200} startOnView>
              <TypingAnimation
                duration={40}
                className="text-foreground/80"
                startOnView
              >
                {"$ reach-out --to kaung-myat-shwe"}
              </TypingAnimation>
            </AnimatedSpan>

            {/* Divider */}
            <AnimatedSpan delay={1800} startOnView>
              <span className="text-muted-foreground/30">────────────────────────────</span>
            </AnimatedSpan>

            {/* Name input */}
            <AnimatedSpan delay={2200} startOnView>
              <TerminalInput
                label="name>"
                value={name}
                onChange={setName}
                placeholder="your name"
              />
            </AnimatedSpan>

            {/* Email input */}
            <AnimatedSpan delay={2400} startOnView>
              <TerminalInput
                label="mail>"
                value={email}
                onChange={setEmail}
                placeholder="you@email.com"
                type="email"
              />
            </AnimatedSpan>

            {/* Message input */}
            <AnimatedSpan delay={2600} startOnView>
              <div className="flex gap-2 text-sm">
                <span className="text-brand font-mono shrink-0 self-start">msg&gt;</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="your message..."
                  rows={3}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/40 font-mono text-sm resize-none leading-relaxed"
                />
              </div>
            </AnimatedSpan>

            {/* Submit line */}
            <AnimatedSpan delay={2800} startOnView>
              <div className="flex items-center gap-3 pt-1">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-500 text-sm"
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
                        className="rounded-lg px-4 h-8 text-xs font-mono bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.18] text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
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
        </form>
      </motion.div>

      {/* Right top: Info card */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <div className="relative p-5 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/[0.06] h-full">
          <BorderBeam
            size={60}
            duration={8}
            colorFrom="#c8a050"
            colorTo="#c8a05033"
            borderWidth={1}
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium block mb-1">Open to work</span>
            Full-stack roles, freelance projects, or interesting collaborations.
            Based in {profile.location || "Myanmar"}.
          </p>
        </div>
      </motion.div>

      {/* Right bottom: Social dock */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/[0.06] h-full">
          <BorderBeam
            size={60}
            duration={8}
            colorFrom="#c8a050"
            colorTo="#c8a05033"
            borderWidth={1}
          />

          <p className="text-xs text-muted-foreground/60 mb-4 uppercase tracking-widest">Connect</p>

          <Dock
            iconSize={40}
            iconMagnification={56}
            iconDistance={100}
            className="border-white/[0.08] bg-white/[0.03]"
          >
            {socialLinks.map((link) => (
              <DockIcon key={link.label} className="bg-white/[0.04] hover:bg-white/[0.1] transition-colors">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center justify-center w-full h-full"
                >
                  <link.icon className="w-5 h-5 text-foreground/60 hover:text-brand transition-colors" />
                </a>
              </DockIcon>
            ))}
          </Dock>

          {/* Labels under dock */}
          <div className="flex justify-center gap-8 mt-3">
            {socialLinks.map((link) => (
              <span key={link.label} className="text-[10px] text-muted-foreground/40">
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
