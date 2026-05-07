"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Github, ExternalLink, FileText, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { PROJECTS } from "@/lib/data";
import type { Project } from "@/lib/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 6);
    rotateY.set(dx * 6);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const accentHex = project.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        className="group relative h-full"
      >
        {/* Gradient border wrapper */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          style={{
            boxShadow: `0 0 40px ${accentHex}20`,
          }}
        />

        <div className="relative h-full glass rounded-2xl p-6 flex flex-col transition-all duration-300 group-hover:border-white/15">
          {/* Project number */}
          <div
            className="font-heading text-7xl font-black leading-none select-none"
            style={{ color: `${accentHex}15` }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Title */}
          <div className="mt-3">
            <h3 className="font-heading text-xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-medium" style={{ color: accentHex }}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="mt-4 flex-1 text-sm text-slate-400 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="default">
                {t}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="mt-5 flex items-center gap-3 border-t border-white/6 pt-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <Github size={14} />
              Code
            </a>
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-cyan-400"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.paperUrl && project.paperUrl !== "#" && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-purple-400"
              >
                <FileText size={14} />
                Paper
              </a>
            )}
            <span className="ml-auto">
              <ArrowUpRight
                size={16}
                className="text-slate-600 transition-all duration-200 group-hover:text-white group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="// featured projects"
          title="Systems I've built"
          description="From petabyte-scale data pipelines to retrieval-augmented AI — engineered for correctness, reliability, and production load."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:max-w-3xl md:mx-auto lg:max-w-none">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/Lalith-Mannem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-cyan-400"
          >
            <Github size={15} />
            More on GitHub
            <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
