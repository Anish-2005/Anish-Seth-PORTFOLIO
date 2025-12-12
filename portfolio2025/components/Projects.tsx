'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    category: 'Full Stack',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
  },
  {
    title: 'AI-Powered Chatbot',
    description: 'Intelligent chatbot using natural language processing for customer support automation with sentiment analysis.',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'NLP'],
    category: 'Machine Learning',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
  },
  {
    title: 'DeFi Staking Platform',
    description: 'Decentralized staking platform with smart contracts for yield farming and token rewards.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'Hardhat'],
    category: 'Blockchain',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
  },
  {
    title: 'Fitness Tracking App',
    description: 'Cross-platform mobile app for tracking workouts, nutrition, and progress with social features.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    category: 'Mobile',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
  },
  {
    title: 'Real Estate Marketplace',
    description: 'Platform connecting buyers and sellers with virtual tours, mortgage calculator, and map integration.',
    technologies: ['Next.js', 'PostgreSQL', 'Google Maps API', 'Prisma'],
    category: 'Full Stack',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    title: 'Image Classification Model',
    description: 'Deep learning model for image classification with transfer learning and data augmentation.',
    technologies: ['PyTorch', 'FastAPI', 'Docker', 'AWS'],
    category: 'Machine Learning',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
];

const categories = ['All', 'Full Stack', 'Mobile', 'Machine Learning', 'Blockchain'];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Featured Projects
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-white/5 text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
