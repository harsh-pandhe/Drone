'use client';
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
            {'/// WORKSHOP MODULES'}
          </span>
          <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
            Workshop Modules
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

      {/* Location Map Section */}
      <section className="py-20 px-6 bg-[#0B1120] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
              {'/// LOCATION'}
            </span>
            <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
              STES Campus, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Lonavala</span>
            </h2>
          </div>

          <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-cyan-500/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d944.6337038433385!2d73.4290702!3d18.7296335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be8018f5365330f%3A0xd2c0268c23675ef3!2sSinhgad%20Technical%20Education%20Society!5e0!3m2!1sen!2sin!4v1773485068119!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 invert-[0.85] hue-rotate-180 opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Register / CTA Section */}
      <section
        id="contact"
        className="py-20 md:py-40 px-6 bg-gradient-to-t from-[#0B1120] to-[#0f172a] relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="font-mono text-cyan-500/60 text-xs tracking-[0.3em] block mb-4">
            {'/// READY TO FLY?'}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-rajdhani font-bold mb-4 text-white">
            Join the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Workshop
            </span>
          </h2>
          <p className="text-slate-400 font-inter max-w-md mx-auto text-base mb-10">
            3 days of hands-on learning. Build your own drone, master the controls, and take to the skies. Limited seats available!
          </p>

          <a
            href="https://iicsit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block px-12 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-mono tracking-widest uppercase text-sm sm:text-base transition-all duration-300 overflow-hidden rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]"
          >
            <span className="relative z-10">Register Now →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>

      {/* Footer — 3-column layout */}
      <Footer />
    </main>
  );
}
