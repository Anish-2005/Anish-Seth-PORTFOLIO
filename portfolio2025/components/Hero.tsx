'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, MoveDown } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        delay: 0.6,
        stagger: 0.2,
      });

      gsap.from('.hero-social', {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 1.2,
        stagger: 0.1,
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-6 lg:px-12 z-10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="hero-title mb-8">
            <h1 className="text-7xl lg:text-9xl font-light tracking-tight text-white mb-4">
              Anish<span className="text-purple-500">.</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          </div>

          <div className="space-y-4 mb-12">
            <p className="hero-subtitle text-2xl lg:text-4xl font-light text-gray-300 tracking-wide">
              Full Stack Developer
            </p>
            <p className="hero-subtitle text-xl lg:text-2xl font-light text-gray-400">
              Building digital experiences with{' '}
              <span className="text-purple-400">Machine Learning</span>,{' '}
              <span className="text-blue-400">Blockchain</span>, and modern web technologies
            </p>
          </div>

          <div className="flex gap-4 mb-16">
            <a
              href="https://github.com/Anish-2005"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social group"
            >
              <div className="p-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a
              href="https://linkedin.com/in/anishseth"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social group"
            >
              <div className="p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a
              href="mailto:anishseth2005@gmail.com"
              className="hero-social group"
            >
              <div className="p-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>

          <div className="hero-cta">
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 transition-all duration-300 group"
            >
              <span className="text-white font-light tracking-wider">VIEW WORK</span>
              <MoveDown className="w-4 h-4 text-gray-400 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
