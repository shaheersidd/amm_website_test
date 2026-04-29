"use client";

import { motion } from "framer-motion";

const researchPapers = [
  {
    title: "AMM Fee Analysis",
    abstract: "Automated Market Makers (AMMs) are a type of decentralized exchange. They can offer a safe venue for exchanging with potentially lower costs compared to traditional exchanges. But their success depends a lot on how fees are set.",
    authors: "Marina Georgiou, Dr. Zachary Feinstein",
    tag: "AMM / Fee Structure",
    link: "#",
  },
  {
    title: "Prediction Markets",
    abstract: "Implied fee structure for binary prediction market (GBM-digital option) with implications for optimal liquidity provision. Certain prediction markets can be represented as the markets of digital options. While many modern prediction markets operate with Limit Order Books, they can also function as Automated Market Makers (AMMs).",
    authors: "Nazarii Tretiak, Dr Ionut Florescu, Dr Zachary Feinstein",
    tag: "Prediction Markets / Options",
    link: "#",
  },
  {
    title: "AMM-ETF",
    abstract: "This project explores the design and performance of an Automated Market Maker–based Exchange Traded Fund (AMM-ETF). The central idea is to replace traditional portfolio rebalancing, which incurs explicit costs for fund managers, with an AMM mechanism that maintains target weights passively.",
    authors: "Sean'o Leary, Dr Zachary Feinstein",
    tag: "AMM / ETF Design",
    link: "#",
  },
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
