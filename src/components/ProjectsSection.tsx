'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  technologies: string[];
};

export default function ProjectsSection() {
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
      title: 'htmx-download',
      description: 'HTMX extension that adds file download capabilities, enabling server-side file generation and direct browser downloads without page refreshes.',
      link: 'https://github.com/dakixr/htmx-download',
      image: '/projects/htmx-download.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'File handling', 'Browser APIs'],
    },
    {
      title: 'htmx-global-indicator',
      description: 'Minimal HTMX extension that adds a global loading indicator with optional delayed spinner, automatically managing request states with light/dark mode support.',
      link: 'https://github.com/dakixr/htmx-global-indicator',
      image: '/projects/htmx-global-indicator.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'UX', 'Dark mode'],
    },
    {
      title: 'FormCraftSuite',
      description: 'Powerful toolkit for transforming PDF documents into structured, web-based forms. Ideal for creating employeneur profiles, qualification reports, and data collection.',
      link: 'https://github.com/dakixr/FormCraftSuite',
      image: '/projects/formcraftsuite.jpg',
      technologies: ['Python', 'HTML', 'PDF processing', 'Form generation', 'Web interfaces'],
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
      title: 'TypedJinja',
      description: 'Type safety for Jinja2 templates, bringing TypeScript-like type checking and IDE support to Python templating.',
      link: 'https://github.com/dakixr/TypedJinja',
      image: '/projects/typedjinja.jpg',
      technologies: ['Python', 'Jinja2', 'Type checking', 'IDE support', 'Tooling'],
    },
    {
      title: 'Hackathon-AXA',
      description: 'AXA Hackathon Winner: Full-stack application built with JHipster 7.0.1, offering modern development tools and production features for an unparalleled web app experience.',
      link: 'https://github.com/dakixr/Hackathon-AXA',
      image: '/projects/hackathon-axa.jpg',
      technologies: ['JavaScript', 'JHipster', 'Spring Boot', 'Angular', 'Full-stack'],
    },
    {
      title: 'isbtchot',
      description: 'Quantitative dashboard analyzing Bitcoin\'s market data to determine macro market trends.',
      link: 'https://isbtchot.dakixr.dev',
      image: '/projects/bitcoin.jpg',
      technologies: ['Python', 'Flask', 'API Integration', 'Plotly'],
    },
    {
      title: 'htmx-restore-history',
      description: 'HTMX extension to manually handle browser history, providing fine-grained control over navigation state in HTMX applications.',
      link: 'https://github.com/dakixr/htmx-restore-history',
      image: '/projects/htmx-restore-history.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'Browser history', 'Navigation'],
    },
    {
      title: 'SOCA',
      description: 'Command Line Interface tool for creating software catalogs from an organization URL.',
      link: 'https://github.com/oeg-upm/soca',
      image: '/projects/soca.jpg',
      technologies: ['Python', 'CLI', 'Web Scraping', 'GitHub'],
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

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
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-50 dark:bg-dark-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gray-300 dark:bg-dark-300 flex items-center justify-center">
                <div className="text-4xl font-bold text-accent">{project.title}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-dark-300 text-gray-800 dark:text-gray-200 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-accent hover:text-accent-dark transition-colors duration-300"
                >
                  Visit Project
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 