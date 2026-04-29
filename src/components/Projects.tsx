"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "SHIFT-Anvil Extension",
    description: "The Stevens High Frequency Trading (SHIFT) Market Simulation System is used for research pertaining to market microstructure, and for an annual high frequency trading competition (HFTC). The extension of SHIFT functionality to incorporate cryptocurrencies and automated market makers (AMMS).",
    status: "In Development",
    statusColor: "text-nexus-cyan",
    statusBg: "bg-nexus-cyan/10 border-nexus-cyan/20",
  },
  {
    title: "Opensource Blockchain Dataset",
    description: "Removing technical barriers and paywalls for researchers around the world to access all blockchain transactions created on Ethereum, Polygon and more using our opensource datasets.",
    status: "Beta Testing",
    statusColor: "text-nexus-blue",
    statusBg: "bg-nexus-blue/10 border-nexus-blue/20",
  },
  {
    title: "On-chain Liquidity Analytics Platform",
    description: "A public dashboard and research tool allowing granular analysis of liquidity concentration and LP profitability over time.",
    status: "Research Phase",
    statusColor: "text-white/70",
    statusBg: "bg-white/5 border-white/10",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            Upcoming Projects
          </h2>
          <p className="text-lg text-white/60 drop-shadow-sm">
            Building open infrastructure to make blockchain data accessible to everyone.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:items-start justify-between p-8 rounded-2xl bg-[#0A0A0C]/80 backdrop-blur border border-white/10 shadow-lg hover:bg-[#0A0A0C] transition-colors"
            >
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold text-white/90 mb-3 drop-shadow-sm">
                  {project.title}
                </h3>
                <p className="text-base text-white/60 leading-relaxed mb-6 md:mb-0">
                  {project.description}
                </p>
              </div>
              <div className="flex-shrink-0 md:ml-6">
                <div className={`px-3 py-1.5 rounded-md border ${project.statusBg} ${project.statusColor} text-sm font-medium inline-flex items-center gap-2`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-current ${project.status === 'In Development' ? 'animate-pulse' : ''}`} />
                  {project.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
