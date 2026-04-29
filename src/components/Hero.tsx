"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center pt-20">
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-nexus-cyan mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-cyan animate-pulse" />
            University Research Group
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
            Automated Market Makers <br className="hidden md:block" /> Research Group
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium mb-6 max-w-2xl mx-auto drop-shadow-xl">
            Advancing decentralized market design through rigorous research.
          </p>
          <p className="text-sm md:text-base text-white/50 tracking-wide max-w-xl mx-auto mb-10 drop-shadow-lg">
            Mechanism design, liquidity dynamics, and on-chain data systems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black text-sm font-semibold rounded hover:bg-neutral-200 transition-colors w-full sm:w-auto">
              Explore Research
            </button>
            <button className="px-6 py-3 bg-[#050505]/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors w-full sm:w-auto">
              View Publications
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
