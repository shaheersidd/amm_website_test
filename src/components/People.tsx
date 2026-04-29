"use client";

import React, { useRef } from 'react';

import Image from 'next/image';

const peopleData = [
  { name: 'Dr Ionut Florescu', role: 'Director HFSL', image: '/people/if.jpeg', linkedin: 'https://www.linkedin.com/in/dr-ionut-florescu-56271315/' },
  { name: 'Dr. Zachary Feinstein', role: 'Associate Professor', image: '/people/zf.jpeg', linkedin: 'https://www.linkedin.com/in/zachary-feinstein-36a6433a/' },
  { name: 'Hao Fu', role: 'FE Phd Candidate', image: '/people/hao.jpeg', linkedin: 'https://www.linkedin.com/in/hao-fu-4057b02a9/' },
  { name: 'Marina Georgiou', role: 'FE Phd Candidate', image: '/people/marina.jpeg', linkedin: 'https://www.linkedin.com/in/geomarina/' },
  { name: 'Sean\'o Leary', role: 'FE Phd Candidate', image: '/people/sean.jpeg', linkedin: 'https://www.linkedin.com/in/sean-o-leary-14155821b/' },
  { name: 'Matthew Thomas', role: 'FE PhD Candidate', image: '/people/matthew.jpeg', linkedin: 'https://www.linkedin.com/in/matthewthomask/' },
];

const People = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll by approximately one card width + gap
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    // Removed bg-background to let the CanvasBackground show through
    <section className="relative w-full py-24 overflow-hidden border-t border-white/5 z-10">
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Our <span className="font-semibold text-nexus-cyan">People</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl text-lg">
            The minds behind the next generation of automated market making infrastructure.
          </p>
        </div>
        
        {/* Scroll Buttons */}
        <div className="flex gap-4 shrink-0">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-nexus-cyan/50 transition-all"
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-nexus-cyan/50 transition-all"
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {peopleData.map((person, index) => (
            <a 
              key={index} 
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 snap-start flex flex-col items-center cursor-pointer block"
            >
              <div className="w-36 h-36 rounded-full bg-white/10 mb-6 overflow-hidden relative mx-auto border border-white/20 shrink-0">
                {/* Fallback avatar if image isn't uploaded yet */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-light text-white/40 bg-nexus-dark">
                  {person.name.charAt(0)}
                </div>
                <Image 
                  src={person.image} 
                  alt={person.name} 
                  fill 
                  className="object-cover relative z-10" 
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-white tracking-wide">{person.name}</h3>
                <p className="text-sm text-nexus-cyan/80 mt-2 font-mono uppercase tracking-wider">{person.role}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default People;
