'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'JavaScript', level: 90 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Django/Flask', level: 75 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', level: 85 },
      { name: 'Flutter', level: 75 },
      { name: 'iOS/Android', level: 80 },
    ],
  },
  {
    title: 'Machine Learning',
    skills: [
      { name: 'TensorFlow', level: 75 },
      { name: 'PyTorch', level: 70 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'Pandas/NumPy', level: 85 },
    ],
  },
  {
    title: 'Blockchain',
    skills: [
      { name: 'Solidity', level: 75 },
      { name: 'Web3.js', level: 80 },
      { name: 'Ethereum', level: 75 },
      { name: 'Smart Contracts', level: 75 },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS/Cloud', level: 70 },
      { name: 'CI/CD', level: 75 },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            ease: "easeOut"
                          }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
