'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setFormState(res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch {
      setFormState('error');
    }
  };

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

      {/* Contact / CTA Section */}
      <section
        id="contact"
        className="py-20 md:py-40 px-6 bg-gradient-to-t from-[#0B1120] to-[#0f172a] relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-cyan-500/60 text-xs tracking-[0.3em] block mb-4">
              {'/// READY FOR DEPLOYMENT'}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-rajdhani font-bold mb-4 text-white">
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Touch
              </span>
            </h2>
            <p className="text-slate-400 font-inter max-w-md mx-auto text-base">
              Ready to transform your physical assets into high-precision digital twins? Let&apos;s talk.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl p-10 text-center border-cyan-500/30"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">Message Sent</h3>
                <p className="text-slate-400 font-inter text-sm">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-6 font-mono text-xs text-cyan-400 hover:text-cyan-300 tracking-wider"
                >
                  SEND ANOTHER →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 sm:p-10 border-cyan-500/20 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[10px] text-cyan-500/60 tracking-[0.2em] uppercase mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-cyan-500/60 tracking-[0.2em] uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-cyan-500/60 tracking-[0.2em] uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {formState === 'error' && (
                  <p className="font-mono text-xs text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="group relative w-full px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white font-mono tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 overflow-hidden rounded-lg"
                >
                  <span className="relative z-10">
                    {formState === 'sending' ? 'Transmitting...' : 'Initialize Project'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>

      {/* Footer — 3-column layout */}
      <Footer />
    </main>
  );
}
