'use client';

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
    <section id="projects" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl text-dark dark:text-light mb-2">
            My Projects
          </h2>
          <div className="h-px w-20 bg-dark dark:bg-light mx-auto mb-4" />
          <p className="text-lg text-dark-500 dark:text-light-300 max-w-2xl mx-auto">
            Explore my recent personal projects that showcase my technical skills and problem-solving abilities.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
              className="w-full px-4 py-2 border border-dark-300 dark:border-light-300 bg-light dark:bg-dark text-dark dark:text-light focus:outline-none"
            />
          </div>

          <ProjectFilter
            technologies={allTechnologies}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
        
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-light dark:bg-dark border border-dark-300 dark:border-light-300 hidden md:block"
            aria-label="Scroll projects left"
          >
            <svg className="w-6 h-6 text-dark dark:text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-light dark:bg-dark border border-dark-300 dark:border-light-300 hidden md:block"
            aria-label="Scroll projects right"
          >
            <svg className="w-6 h-6 text-dark dark:text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div 
            ref={containerRef}
            className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-6 pb-8 -mx-4 px-4 scrollbar-hide"
          >
            {filteredProjects.map((project, index) => (
              <div key={`${project.title}-${activeFilter}-${searchQuery}`} className="snap-center shrink-0 w-[85vw] max-w-sm">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-dark-500 dark:text-light-400 text-lg">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
                aria-label="Clear all filters"
                className="mt-4 px-6 py-2 border-2 border-dark dark:border-light text-dark dark:text-light hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
