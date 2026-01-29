'use client';

import { useState } from 'react';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  technologies: string[];
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  }

  return (
    <div className="relative group border border-dark-300 dark:border-light-300 bg-light dark:bg-dark">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-label={`Expand details for ${project.title}`}
        className="h-full cursor-pointer"
      >
        <div className="h-48 bg-light-200 dark:bg-dark-200 flex items-center justify-center relative">
          <div className="text-4xl text-dark dark:text-light">{project.title}</div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl text-dark dark:text-light mb-2">{project.title}</h3>
          <p
            className={`text-dark-500 dark:text-light-300 ${isExpanded ? '' : 'line-clamp-2'}`}
          >
            {project.description}
          </p>
          
          {isExpanded && (
            <div className="pt-4 mt-4 border-t border-dark-300 dark:border-light-300">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-sm border border-dark-300 dark:border-light-300 text-dark dark:text-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className={`text-dark dark:text-light transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 text-sm border-2 border-dark dark:border-light text-dark dark:text-light hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark"
            >
              Visit Project
              <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
