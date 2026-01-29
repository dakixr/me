'use client';

import { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  technologies: string[];
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects: Project[] = [
    {
      title: 'htmx-download',
      description: 'HTMX extension for file downloads with 27 stars, enabling server-driven generation and direct browser downloads.',
      link: 'https://github.com/dakixr/htmx-download',
      image: '/projects/htmx-download.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'File handling', 'Browser APIs'],
    },
    {
      title: 'htmx-global-indicator',
      description: 'Global loading indicator with a delayed spinner and 24 stars, handling HTMX request state centrally.',
      link: 'https://github.com/dakixr/htmx-global-indicator',
      image: '/projects/htmx-global-indicator.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'UX', 'Loading states'],
    },
    {
      title: 'FormCraftSuite',
      description: 'Toolkit for turning PDFs into structured, web-ready forms for data capture and workflows.',
      link: 'https://github.com/dakixr/FormCraftSuite',
      image: '/projects/formcraftsuite.jpg',
      technologies: ['Python', 'PDF processing', 'Form generation', 'HTML', 'Web forms'],
    },
    {
      title: 'TypedJinja',
      description: 'Type safety for Jinja2 templates with 2 stars, bringing typed checks and editor hints to templating.',
      link: 'https://github.com/dakixr/TypedJinja',
      image: '/projects/typedjinja.jpg',
      technologies: ['Python', 'Jinja2', 'Type checking', 'IDE support', 'Tooling'],
    },
    {
      title: 'Hackathon-AXA',
      description: 'AXA Hackathon winner with 1 star, a full-stack app built with JHipster and Spring Boot.',
      link: 'https://github.com/dakixr/Hackathon-AXA',
      image: '/projects/hackathon-axa.jpg',
      technologies: ['JavaScript', 'JHipster', 'Spring Boot', 'Angular', 'Full-stack'],
    },
    {
      title: 'htmx-restore-history',
      description: 'Manual browser history handling for HTMX with 6 stars, enabling explicit navigation control.',
      link: 'https://github.com/dakixr/htmx-restore-history',
      image: '/projects/htmx-restore-history.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'Browser history', 'Navigation'],
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
          <h2 className="text-3xl font-bold text-dark dark:text-light mb-2">My Projects</h2>
          <div className="h-1 bg-dark dark:bg-light mx-auto mb-4" />
          <p className="text-lg text-dark-600 dark:text-light-300 max-w-2xl mx-auto">
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
              className="w-full px-4 py-2 border border-dark dark:border-light bg-light dark:bg-dark text-dark dark:text-light focus:outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-light dark:bg-dark border border-dark dark:border-light hidden md:block"
            aria-label="Scroll projects left"
          >
            <svg className="w-6 h-6 text-dark dark:text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-light dark:bg-dark border border-dark dark:border-light hidden md:block"
            aria-label="Scroll projects right"
          >
            <svg className="w-6 h-6 text-dark dark:text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7" />
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
                className="mt-4 px-6 py-2 border-2 border dark:border-light text-dark dark:text-light hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark"
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
