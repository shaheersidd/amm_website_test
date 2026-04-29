"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Fade from transparent to slight glassmorphism on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.8)"]
  );

  const navBackdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(8px)"]
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  return (
    <motion.header
      style={{
        backgroundColor: navBackground,
        backdropFilter: navBackdropFilter,
        borderColor: navBorder,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors border-b flex items-center justify-between px-8 py-5"
    >
      <a href="https://fsc.stevens.edu/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
        <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#3B82F6] to-[#00D6FF] flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="w-2.5 h-2.5 bg-[#050505] rounded-sm" />
        </div>
        <span className="font-semibold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
          Hanlon Financial Systems <span className="text-white/50 font-normal">Lab</span>
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
        <a href="#overview" className="hover:text-white transition-colors duration-300">Overview</a>
        <a href="#research" className="hover:text-white transition-colors duration-300">Research</a>
        <a href="#projects" className="hover:text-white transition-colors duration-300">Projects</a>
        <a href="#publications" className="hover:text-white transition-colors duration-300">Publications</a>
        <a href="#people" className="hover:text-white transition-colors duration-300">People</a>
      </nav>

      <div>
        <button className="px-5 py-2 font-medium text-sm text-white/90 border border-white/10 rounded hover:bg-white/5 transition-colors">
          View Publications
        </button>
      </div>
    </motion.header>
  );
}
