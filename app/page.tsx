import DroneHero from '@/components/DroneHero';
import HiveInterface from '@/components/HiveInterface';
import FlightLoop from '@/components/FlightLoop';
import ServiceCard from '@/components/ServiceCard';
import TechBento from '@/components/TechBento';
import TechGrid from '@/components/TechGrid';
import ProcessRow from '@/components/ProcessRow';
import DroneSwarm from '@/components/DroneSwarm';
import DataOutputStrip from '@/components/DataOutputStrip';
import ComplianceSafety from '@/components/ComplianceSafety';
import Footer from '@/components/Footer';
import PreLoader from '@/components/PreLoader';
import { services } from '@/data/services';

export default function Home() {
  return (
    <main className="bg-[#0f172a] min-h-screen">
      {/* Animated drone pre-loader */}
      <PreLoader />
      {/* Hero — Scroll-triggered frame animation */}
      <DroneHero />

      {/* Hive Interface — Interactive drone anatomy with POI modals */}
      <HiveInterface />

      {/* Flight Loop — 4-step mission pipeline */}
      <FlightLoop />

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
            {'/// OPERATIONAL MODULES'}
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

      {/* Tech Bento — Technology capability cards */}
      <section id="technology">
        <TechBento />
      </section>

      {/* Tech Grid — Capabilities with wireframe */}
      <TechGrid />

      {/* Process Row — Detailed workflow timeline */}
      <section id="process">
        <ProcessRow />
      </section>

      {/* Drone Swarm — Interactive isometric simulation */}
      <DroneSwarm />

      {/* Data Output Strip — Scrolling format badges */}
      <DataOutputStrip />

      {/* Compliance & Safety */}
      <section id="compliance">
        <ComplianceSafety />
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-40 text-center px-6 bg-gradient-to-t from-[#0B1120] to-[#0f172a] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative z-10">
          <span className="font-mono text-cyan-500/60 text-xs tracking-[0.3em] block mb-4">
            {'/// READY FOR DEPLOYMENT'}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-rajdhani font-bold mb-4 text-white">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Scan
            </span>
            ?
          </h2>
          <p className="text-slate-400 font-inter max-w-md mx-auto mb-10 text-base md:text-lg">
            Deploy our fleet and transform your physical assets into
            high-precision digital twins.
          </p>
          <button className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-mono tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 overflow-hidden rounded">
            <span className="relative z-10">Initialize Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 border border-cyan-400/30 rounded" />
          </button>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>

      {/* Footer — 3-column layout */}
      <Footer />
    </main>
  );
}
