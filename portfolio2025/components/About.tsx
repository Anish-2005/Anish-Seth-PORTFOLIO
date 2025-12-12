'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Smartphone, Brain, Blocks } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            About Me
          </motion.h2>

          <motion.div variants={itemVariants} className="mb-12 text-center">
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I&apos;m a passionate full-stack developer with expertise in building modern web and mobile applications.
              My journey in tech spans across multiple domains including machine learning and blockchain development,
              allowing me to create innovative solutions that push the boundaries of what&apos;s possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              variants={itemVariants}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="mb-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg inline-block">
                <Code2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Stack Development</h3>
              <p className="text-gray-400">
                Building scalable web applications with modern frameworks and best practices
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="mb-4 p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg inline-block">
                <Smartphone className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">App Development</h3>
              <p className="text-gray-400">
                Creating intuitive mobile applications for iOS and Android platforms
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="mb-4 p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg inline-block">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
              <p className="text-gray-400">
                Implementing AI-powered solutions and intelligent data-driven applications
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="mb-4 p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg inline-block">
                <Blocks className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Blockchain</h3>
              <p className="text-gray-400">
                Developing decentralized applications and smart contracts on various chains
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
