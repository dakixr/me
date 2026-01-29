'use client';

import { useState } from 'react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
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
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01 1.414 1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
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
    </section>
  );
}
