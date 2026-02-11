import DroneHero from '@/components/DroneHero';
import TechGrid from '@/components/TechGrid';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';

export default function Home() {
  return (
    <main className="bg-[#0f172a] min-h-screen">
      {/* Hero — Scroll-triggered procedural canvas animation */}
      <DroneHero />

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
            {"/// OPERATIONAL MODULES"}
          </span>
          <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
            Operational Services
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Tech Grid — Capabilities */}
      <TechGrid />

      {/* CTA Section */}
      <section className="py-32 md:py-40 text-center bg-gradient-to-t from-[#0B1120] to-[#0f172a] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative z-10">
          <span className="font-mono text-cyan-500/60 text-xs tracking-[0.3em] block mb-4">
            {"/// READY FOR DEPLOYMENT"}
          </span>
          <h2 className="text-5xl md:text-7xl font-rajdhani font-bold mb-4 text-white">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Scan
            </span>
            ?
          </h2>
          <p className="text-slate-400 font-inter max-w-md mx-auto mb-10 text-lg">
            Deploy our fleet and transform your physical assets into
            high-precision digital twins.
          </p>
          <button className="group relative px-12 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-mono tracking-widest uppercase text-sm transition-all duration-300 overflow-hidden rounded">
            <span className="relative z-10">Initialize Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 border border-cyan-400/30 rounded" />
          </button>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-rajdhani font-bold text-lg text-white tracking-wider">
            AERO<span className="text-cyan-400">MAP</span>
          </div>
          <div className="font-mono text-xs text-slate-500">
            © 2026 AeroMap Technologies. All systems nominal.
          </div>
        </div>
      </footer>
    </main>
  );
}
