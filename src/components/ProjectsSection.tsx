'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  technologies: string[];
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const allTechnologies = projects.flatMap((project) => project.technologies);

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === 'All' || project.technologies.includes(activeFilter);
    const matchesSearch = 
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

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

        <div className="mb-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-900 dark:text-white border border-gray-200 dark:border-dark-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProjectFilter
              technologies={allTechnologies}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </motion.div>
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
            <AnimatePresence mode="popLayout">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="contents"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`${project.title}-${activeFilter}-${searchQuery}`}
                    variants={itemVariants}
                    layout
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div 
            ref={containerRef}
            className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-6 pb-8 -mx-4 px-4 scrollbar-hide"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${activeFilter}-${searchQuery}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="snap-center shrink-0 w-[85vw] max-w-sm"
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-300"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
