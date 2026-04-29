import Navbar from "@/components/Navbar";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Focus from "@/components/Focus";
import People from "@/components/People";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-nexus-cyan/30">
      <CanvasBackground />
      <Navbar />
      
      <div className="relative z-10 w-full h-full pt-10">
        <Hero />
        <Focus />
        <Research />
        <People />
        <Projects />

        {/* CTA / Footer Section */}
        <footer className="relative py-24 px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Collaborate. Build. Understand.
          </h2>
          <div className="flex justify-center gap-4 mb-20 pointer-events-auto">
            <a href="https://fsc.stevens.edu/publications/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors inline-block">
              Read Publications
            </a>
            <button className="px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-colors">
              Join the Lab
            </button>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/40 border-t border-white/5 pt-8">
            <p>Hanlon Financial Systems Center · Stevens Institute of Technology</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://www.linkedin.com/company/hanlon-financial-center-at-stevens-institute" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.youtube.com/channel/UCoO4aY5mmQyf2FE-SK8YHGQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
              <a href="https://fsc.stevens.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">HFSL</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
