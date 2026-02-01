'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

type Project = {
  title: string;
  description: string;
  link?: string;
  image: string;
  technologies: string[];
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects: Project[] = [
    {
      title: 'OpenWhisper',
      description: 'Hold-to-talk transcription for macOS using OpenAI Whisper API. Press Fn to talk, release to insert text. Tracks usage + cost. Native menubar app with live waveform.',
      link: 'https://github.com/dakixr/open-whisper',
      image: '/projects/openwhisper.svg',
      technologies: ['Swift', 'macOS', 'OpenAI API', 'Whisper', 'Audio', 'Keychain', 'Accessibility'],
    },
    {
      title: 'Ionisium',
      description: 'SaaS platform for mass mailing communications with PDF watermarking, tracking, and delivery management via AWS Lambda.',
      link: 'https://ionisium.es',
      image: '/projects/ionisium.jpg',
      technologies: ['Python', 'Django', 'HTMX', 'htpy', 'Celery', 'AWS', 'PostgreSQL', 'Docker', 'Pulumi'],
    },
    {
      title: 'CostCompiler',
      description: 'B2B web application for cost controlling communications, featuring Excel processing, data analysis, and automated reporting.',
      link: 'https://costcompiler.com',
      image: '/projects/costcompiler.jpg',
      technologies: ['Python', 'Django', 'HTMX', 'htpy', 'Celery', 'Pandas', 'Polars', 'AWS', 'Docker'],
    },
    {
      title: 'wt',
      description: 'Git Worktree Toolkit - A CLI for managing git worktrees in feature-branch workflows with hooks, auto-setup, and PR integration.',
      link: 'https://github.com/dakixr/wt',
      image: '/projects/wt.jpg',
      technologies: ['Python', 'Git', 'CLI', 'Worktrees', 'Developer Tools'],
    },
    {
      title: 'ralph',
      description: 'CLI harness for running LLM agents on PRD-driven tasks, automating development workflows with AI assistance.',
      link: 'https://github.com/dakixr/ralph',
      image: '/projects/ralph.jpg',
      technologies: ['Python', 'LLM', 'CLI', 'AI Agents', 'Automation'],
    },
    {
      title: 'xpyxl',
      description: 'Create styled Excel reports with declarative Python. Tailwind-inspired utility classes for typography, colors, and layouts without manual coordinates.',
      link: 'https://github.com/dakixr/xpyxl',
      image: '/projects/xpyxl.jpg',
      technologies: ['Python', 'Excel', 'openpyxl', 'xlsxwriter', 'Declarative', 'Reporting'],
    },
    {
      title: 'htmx-extensions',
      description: 'Lightweight HTMX extensions: smart loading indicators, file downloads, and programmatic history restoration. Consolidated collection of previously separate extensions (27+ combined stars). No build step required.',
      link: 'https://github.com/dakixr/htmx-extensions',
      image: '/projects/htmx-extensions.jpg',
      technologies: ['JavaScript', 'HTMX', 'Extensions', 'Browser APIs', 'Loading states', 'History API'],
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
              className="border border-dark-300 dark:border-light-300 bg-light dark:bg-dark overflow-hidden"
            >
              <div className="h-48 border-b border-dark-300 dark:border-light-300 flex items-center justify-center">
                <div className="text-4xl font-bold text-dark dark:text-light">{project.title}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark dark:text-light mb-2">{project.title}</h3>
                <p className="text-dark-500 dark:text-light-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium border border-dark-300 dark:border-light-300 text-dark dark:text-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
{project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-dark dark:text-light hover:underline transition-colors duration-300"
                  >
                    {project.link.includes('github.com') ? 'View on GitHub' : 'Visit'}
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01 1.414 1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                )}
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
