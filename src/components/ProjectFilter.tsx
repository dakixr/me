'use client';

import { motion } from 'framer-motion';

interface ProjectFilterProps {
  technologies: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectFilter({ technologies, activeFilter, onFilterChange }: ProjectFilterProps) {
  const uniqueTechnologies = Array.from(new Set(technologies)).sort();

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8" role="group" aria-label="Filter projects by technology">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onFilterChange('All')}
        aria-pressed={activeFilter === 'All'}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
          activeFilter === 'All'
            ? 'bg-accent text-white shadow-lg'
            : 'bg-gray-200 dark:bg-dark-300 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-dark-400'
        }`}
      >
        All
      </motion.button>
      {uniqueTechnologies.map((tech) => (
        <motion.button
          key={tech}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(tech)}
          aria-pressed={activeFilter === tech}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
            activeFilter === tech
              ? 'bg-accent text-white shadow-lg'
              : 'bg-gray-200 dark:bg-dark-300 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-dark-400'
          }`}
        >
          {tech}
        </motion.button>
      ))}
    </div>
  );
}
