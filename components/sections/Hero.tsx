"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown } from "lucide-react";
import NeuralNetworkCanvas from "@/components/canvas/NeuralNetworkCanvas";
import { TYPEWRITER_ROLES } from "@/lib/data";

function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) return;
    const word = words[wordIdx];
    const tick = () => {
      if (!deleting) {
        if (display.length < word.length) {
          setDisplay(word.slice(0, display.length + 1));
        } else {
          setWaiting(true);
          setTimeout(() => {
            setWaiting(false);
            setDeleting(true);
          }, pause);
        }
      } else {
        if (display.length > 0) {
          setDisplay(word.slice(0, display.length - 1));
        } else {
          setDeleting(false);
          setWordIdx((wordIdx + 1) % words.length);
        }
      }
    };

    const t = setTimeout(tick, deleting ? speed / 2.5 : speed);
    return () => clearTimeout(t);
  }, [display, deleting, wordIdx, words, speed, pause, waiting]);

  return display;
}

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Lalith-Mannem",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/lalith-mannem/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:lalithchandrilreddy@gmail.com",
    label: "Email",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
};

export default function Hero() {
  const typeText = useTypewriter(TYPEWRITER_ROLES);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Neural network canvas background */}
      <NeuralNetworkCanvas />

      {/* Gradient mesh orbs */}
      <div
        className="mesh-orb mesh-orb-cyan"
        style={{
          width: "600px",
          height: "600px",
          top: "10%",
          left: "-10%",
        }}
      />
      <div
        className="mesh-orb mesh-orb-purple"
        style={{
          width: "500px",
          height: "500px",
          top: "20%",
          right: "-8%",
        }}
      />
      <div
        className="mesh-orb mesh-orb-emerald"
        style={{
          width: "400px",
          height: "400px",
          bottom: "15%",
          left: "30%",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030712] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 section-container w-full text-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <span className="eyebrow">
              ◈ currently @ google
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 font-heading text-6xl font-black sm:text-7xl md:text-8xl lg:text-9xl tracking-tight"
          >
            <span className="gradient-text">Lalith</span>
            <br />
            <span className="text-white">Mannem</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={itemVariants}
            className="mt-6 h-10 flex items-center justify-center"
          >
            <span className="font-mono text-lg text-cyan-400 sm:text-xl">
              {typeText}
              <span className="cursor-blink text-cyan-400">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 mx-auto max-w-xl text-base text-slate-400 leading-relaxed sm:text-lg"
          >
            I build machine learning systems that scale to hundreds of millions
            of users. From training infrastructure to low-latency inference —
            turning research into products that ship.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow-cyan hover:scale-[1.03] active:scale-[0.98]"
            >
              View My Work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-[1.03] active:scale-[0.98]"
            >
              <FileText className="h-4 w-4 text-cyan-400" />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-5"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110"
              >
                <Icon className="h-4.5 w-4.5" size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
