'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    title: 'DeFi Trading Platform',
    description: 'Decentralized exchange with advanced trading algorithms and real-time market data visualization',
    tech: ['Solidity', 'Web3.js', 'React', 'Node.js'],
    year: '2024',
  },
  {
    number: '02',
    title: 'AI Content Generator',
    description: 'Machine learning powered content creation platform with natural language processing',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'Next.js'],
    year: '2024',
  },
  {
    number: '03',
    title: 'Mobile Banking App',
    description: 'Cross-platform fintech application with biometric authentication and real-time transactions',
    tech: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    year: '2023',
  },
  {
    number: '04',
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with inventory management and advanced analytics dashboard',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
    year: '2023',
  },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header', {
        scrollTrigger: {
          trigger: '.work-header',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.project-item', {
        scrollTrigger: {
          trigger: '.project-list',
          start: 'top 70%',
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="min-h-screen py-32 px-6 lg:px-12 relative"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="work-header mb-24">
          <motion.div style={{ y }} className="inline-block">
            <h2 className="text-6xl lg:text-8xl font-light tracking-tight text-white mb-4">
              Selected Work
            </h2>
            <div className="w-32 h-[1px] bg-purple-500"></div>
          </motion.div>
        </div>

        <div className="project-list space-y-1">
          {projects.map((project, index) => (
            <div
              key={project.number}
              className="project-item group"
            >
              <a
                href="#"
                className="block py-12 border-t border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-1">
                    <span className="text-sm text-gray-600 font-mono">
                      {project.number}
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="text-3xl lg:text-4xl font-light text-white group-hover:text-purple-400 transition-colors duration-300 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-white/10 text-xs text-gray-400 tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 text-right">
                    <span className="text-sm text-gray-600">{project.year}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <a
            href="#"
            className="inline-block px-12 py-4 border border-white/20 hover:border-white/40 transition-all duration-300 group"
          >
            <span className="text-white font-light tracking-wider">
              VIEW ALL PROJECTS
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
