'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  technologies: string[];
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'CostCompiler',
      description: 'A comprehensive financial platform tailored for production companies in the film industry, offering real-time updates, collaborative cost management, and secure data storage.',
      link: 'https://costcompiler.com',
      image: '/projects/costcompiler.jpg',
      technologies: ['Python', 'Django', 'HTMX', 'htpy', 'Alpine.js', 'Tailwind', 'AWS', 'PostgreSQL', 'Celery'],
    },
    {
      title: 'Ionisium',
      description: 'Automated document distribution system, personalizing and watermarking each document with the recipient\'s name.',
      link: 'https://ionisium.es',
      image: '/projects/ionisium.jpg',
      technologies: ['Python', 'Django', 'HTMX', 'htpy', 'Alpine.js', 'Tailwind', 'AWS', 'PostgreSQL', 'Celery'],
    },
    {
      title: 'xpyxl',
      description: 'Declarative Excel renderer for Python with Tailwind-like styling utilities and multi-engine support.',
      link: 'https://github.com/dakixr/xpyxl',
      image: '/projects/xpyxl.jpg',
      technologies: ['Python', 'openpyxl', 'xlsxwriter', 'Declarative API', 'Styling utilities'],
    },
    {
      title: 'htpy-uikit',
      description: 'htpy component library with a shadcn-style CLI to vendor Tailwind + Alpine-powered UI into projects.',
      link: 'https://github.com/dakixr/htpy-uikit',
      image: '/projects/htpy-uikit.jpg',
      technologies: ['Python', 'htpy', 'TailwindCSS', 'Alpine.js', 'CLI tooling'],
    },
    {
      title: 'isbtchot',
      description: 'Quantitative dashboard analyzing Bitcoin\'s market data to determine macro market trends.',
      link: 'https://isbtchot.dakixr.dev',
      image: '/projects/bitcoin.jpg',
      technologies: ['Python', 'Flask', 'API Integration', 'Plotly'],
    },
    {
      title: 'SOCA',
      description: 'Command Line Interface tool for creating software catalogs from an organization URL.',
      link: 'https://github.com/oeg-upm/soca',
      image: '/projects/soca.jpg',
      technologies: ['Python', 'CLI', 'Web Scraping', 'GitHub'],
    },
  ];

  function scrollLeft() {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }

  function scrollRight() {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            My Projects
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-accent mx-auto mb-4"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore my recent personal projects that showcase my technical skills and problem-solving abilities.
          </motion.p>
        </div>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-dark-100 shadow-lg hidden md:block"
            aria-label="Scroll projects left"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-dark-100 shadow-lg hidden md:block"
            aria-label="Scroll projects right"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          <div 
            ref={containerRef}
            className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-6 pb-8 -mx-4 px-4 scrollbar-hide"
          >
            {projects.map((project, index) => (
              <div key={index} className="snap-center shrink-0 w-[85vw] max-w-sm">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
