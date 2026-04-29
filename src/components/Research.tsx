"use client";

import { motion } from "framer-motion";

const researchPapers = [
  {
    title: "Dynamic Fees in AMMs: Mechanism Design for High Volatility",
    abstract: "We propose a novel fee adjustment mechanism for Automated Market Makers that structurally mitigates toxic flow during extreme market volatility.",
    authors: "Alice Chen, Bob Roberts, Charlie Davis",
    tag: "AMM / Mechanism Design",
    link: "#",
  },
  {
    title: "Liquidity Fragmentation Across L2s: An Empirical Study",
    abstract: "An analysis of how liquidity disperses across prominent Layer 2 rollups and the resulting impact on slippage and user routing efficiency.",
    authors: "Dr. Eve Wright, Alice Chen",
    tag: "Liquidity / Ethereum",
    link: "#",
  },
  {
    title: "Beyond CPMM: Non-linear Invariant Curves for Pegged Assets",
    abstract: "Exploring alternative invariant functions that maximize localized capital efficiency for heavily correlated asset pairs.",
    authors: "Charlie Davis, Frank Miller",
    tag: "Stablecoins / Math",
    link: "#",
  }
];

export default function Research() {
  return (
    <section id="research" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            Latest Research
          </h2>
          <p className="text-lg text-white/60 max-w-2xl drop-shadow-sm">
            Current work from our group on AMMs, liquidity design, and decentralized markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper, index) => (
            <motion.a
              key={index}
              href={paper.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block p-8 rounded-2xl bg-[#050505]/60 backdrop-blur border border-white/10 hover:border-nexus-blue/50 hover:bg-[#050505]/80 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div className="text-xs font-semibold text-nexus-blue mb-4 tracking-wider uppercase">
                {paper.tag}
              </div>
              <h3 className="text-xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors drop-shadow-md">
                {paper.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {paper.abstract}
              </p>
              <div className="mt-auto">
                <span className="text-xs font-medium text-white/40">Authors</span>
                <p className="text-sm font-medium text-white/80 mt-1">{paper.authors}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
