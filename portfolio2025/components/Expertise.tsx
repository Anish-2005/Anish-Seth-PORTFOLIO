'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as d3 from 'd3';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { category: 'Frontend', value: 95, color: '#8b5cf6' },
  { category: 'Backend', value: 90, color: '#3b82f6' },
  { category: 'Mobile', value: 85, color: '#06b6d4' },
  { category: 'Machine Learning', value: 80, color: '#a855f7' },
  { category: 'Blockchain', value: 85, color: '#6366f1' },
  { category: 'DevOps', value: 75, color: '#8b5cf6' },
];

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.expertise-header', {
        scrollTrigger: {
          trigger: '.expertise-header',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 400;
    const height = 400;
    const margin = 60;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const radius = Math.min(width, height) / 2 - margin;

    // Scales
    const angleScale = d3
      .scaleBand()
      .domain(skills.map((d) => d.category))
      .range([0, 2 * Math.PI]);

    const radiusScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, radius]);

    // Grid circles
    const levels = [20, 40, 60, 80, 100];
    levels.forEach((level) => {
      g.append('circle')
        .attr('r', radiusScale(level))
        .attr('fill', 'none')
        .attr('stroke', '#ffffff10')
        .attr('stroke-width', 1);
    });

    // Axes
    skills.forEach((skill) => {
      const angle = angleScale(skill.category)! + angleScale.bandwidth() / 2;
      
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', radius * Math.cos(angle - Math.PI / 2))
        .attr('y2', radius * Math.sin(angle - Math.PI / 2))
        .attr('stroke', '#ffffff10')
        .attr('stroke-width', 1);

      // Labels
      const labelRadius = radius + 30;
      const x = labelRadius * Math.cos(angle - Math.PI / 2);
      const y = labelRadius * Math.sin(angle - Math.PI / 2);

      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('fill', '#9ca3af')
        .attr('font-size', '12px')
        .text(skill.category);
    });

    // Data area
    const lineGenerator = d3
      .lineRadial<{ category: string; value: number; color: string }>()
      .angle((d) => {
        const angle = angleScale(d.category)! + angleScale.bandwidth() / 2;
        return angle;
      })
      .radius((d) => radiusScale(d.value))
      .curve(d3.curveCardinalClosed);

    const path = g
      .append('path')
      .datum(skills)
      .attr('d', lineGenerator)
      .attr('fill', '#8b5cf620')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2);

    // Animate
    const pathLength = path.node()!.getTotalLength();
    
    path
      .attr('stroke-dasharray', `${pathLength} ${pathLength}`)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);

    // Points
    skills.forEach((skill, i) => {
      const angle = angleScale(skill.category)! + angleScale.bandwidth() / 2;
      const r = radiusScale(skill.value);
      const x = r * Math.cos(angle - Math.PI / 2);
      const y = r * Math.sin(angle - Math.PI / 2);

      g.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 0)
        .attr('fill', skill.color)
        .transition()
        .delay(i * 100)
        .duration(500)
        .attr('r', 4);
    });
  }, []);

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="min-h-screen py-32 px-6 lg:px-12"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="expertise-header mb-24">
          <h2 className="text-6xl lg:text-8xl font-light tracking-tight text-white mb-4">
            Expertise
          </h2>
          <div className="w-32 h-[1px] bg-blue-500"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex items-end justify-between mb-3">
                  <h3 className="text-2xl font-light text-white">
                    {skill.category}
                  </h3>
                  <span className="text-sm text-gray-500 font-mono">
                    {skill.value}%
                  </span>
                </div>
                <div className="h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    className="h-full absolute left-0 top-0"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <svg ref={chartRef} className="max-w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
