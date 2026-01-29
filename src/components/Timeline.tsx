'use client';

import { useState, useEffect } from 'react';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  missions: Array<{
    name: string;
    description: string[];
    techStack?: string[];
  }>;
}

const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'TMC',
    location: 'Luxembourg',
    period: '2023-Present',
    missions: [
      {
        name: 'Deloitte (second mission)',
        description: [
          'Developed Sirius - DAG Pipelines, a Python framework for data transformation leveraging metaprogramming',
          'Built a declarative DSL for decision trees, empowering non-engineers to update client logic',
          'Delivered a VS Code extension featuring live diagrams, code actions, and CLI tools',
          'Established comprehensive testing strategy with unit tests and snapshot testing'
        ],
        techStack: ['Python', 'VS Code Extension', 'Metaprogramming', 'Testing']
      },
      {
        name: 'Bank of Luxembourg Investments (BLI)',
        description: [
          'Automated manual processes, saving 100+ hours per quarter and cutting error rate by 95%',
          'Developed file-based querying system with indexing and cache for real-time data retrieval',
          'Built PDF mining and analysis tools for regulatory compliance',
          'Created internal web tools to speed up daily workflows'
        ],
        techStack: ['Python', 'Data Mining', 'Web Tools', 'Automation']
      },
      {
        name: 'Internal TMC Projects',
        description: [
          'Built web app to convert unstructured CVs into standardized format, reducing onboarding time by >6x',
          'Developed GenAI-driven meeting note system, saving 15 minutes per meeting for team members'
        ],
        techStack: ['GenAI', 'Web Development', 'Automation']
      },
      {
        name: 'Deloitte (first mission)',
        description: [
          'Engineered Stelar, a Python library to enrich investment portfolios with Duration and SCR',
          'Contributed to shared commons tools repository for code reusability',
          'Implemented Python ETL toolkit with configuration-driven data mapping',
          'Integrated robust CI/CD and built-in test suites'
        ],
        techStack: ['Python', 'ETL', 'CI/CD', 'Finance']
      }
    ]
  },
  {
    title: 'Business Intelligence & Software Engineer',
    company: 'Amazon',
    location: 'Luxembourg',
    period: '2022',
    missions: [
      {
        name: 'Operational Planning',
        description: [
          'Launched first ML forecasting solution for $60M+ operational plan',
          'Built new KPI tracking/warehousing tools for improved reporting',
          'Spearheaded engineering initiatives for velocity and data quality'
        ],
        techStack: ['ML', 'AWS', 'Data Warehousing', 'KPIs']
      }
    ]
  },
  {
    title: 'Full-Stack Software Engineer',
    company: 'Vector ITC Group / Santander Bank',
    location: 'Spain',
    period: '2019',
    missions: [
      {
        name: 'Mobile Banking',
        description: [
          'Developed and deployed mobile app modules for Santander Bank',
          'Focused on high user adoption and strong performance',
          'Built secure backend systems supporting rapid development'
        ],
        techStack: ['Java', 'Kotlin', 'Backend', 'Mobile']
      }
    ]
  }
];

interface TimelineNodeProps {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

function TimelineNode({ experience, index, isExpanded, onToggle, isMobile }: TimelineNodeProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };
 
  return (
    <div className={`${isMobile ? 'w-full' : 'w-full md:w-1/3 lg:w-1/4 flex-shrink-0 px-4'}`}>
      <div className="relative">
        <div
          className={`w-12 h-12 rounded-full bg-dark dark:bg-light flex items-center justify-center text-light dark:text-dark font-bold text-lg mx-auto mb-4 cursor-pointer z-10 relative focus:outline-none focus:ring-4 focus:ring-accent/30 ${
            isExpanded ? 'ring-4 ring-accent/30' : ''
          }`}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`Toggle details for ${experience.company}`}
        >
          {index + 1}
        </div>
 
        <div
          className={`bg-white dark:bg-dark-100 rounded-xl p-6 cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 ${
            isExpanded ? 'border-accent shadow-lg' : 'border-transparent shadow-md hover:shadow-lg'
          }`}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`${experience.company} - ${experience.title}, Press Enter to ${isExpanded ? 'collapse' : 'expand'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg text-dark dark:text-light">
                {experience.company}
              </h3>
              <p className="text-sm text-accent">{experience.title}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-dark-500 dark:text-light-400 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
 
          <div className="flex items-center gap-2 mb-3 text-sm text-dark-500 dark:text-light-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{experience.location}</span>
            <span className="mx-2">•</span>
            <span>{experience.period}</span>
          </div>
 
          {isExpanded && (
            <div className="space-y-4">
              {experience.missions.map((mission, missionIndex) => (
                <div key={missionIndex} className="border-t border-dark-300 dark:border-light-300 pt-3">
                  <h4 className="text-dark dark:text-light mb-2">
                    {mission.name}
                  </h4>
                  <ul className="space-y-1">
                    {mission.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-dark-500 dark:text-light-400 flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {mission.techStack && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {mission.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-dark-100 dark:bg-light-300 text-accent text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  return (
    <div className="py-20 bg-gray-50 dark:bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl text-dark dark:text-light mb-2">
            Professional Experience
          </h2>
          <div className="h-px w-20 bg-dark dark:bg-light mx-auto mb-4" />
          <p className="text-lg text-dark-500 dark:text-light-300 max-w-2xl mx-auto">
            My journey through impactful roles and projects in software engineering.
          </p>
        </div>
 
        <div className="relative">
          <div className={`absolute top-6 ${isMobile ? 'left-6 w-1 h-full' : 'left-1/2 w-0.5 h-full'} bg-dark dark:bg-light origin-top`} />
 
          <div className={`${isMobile ? 'ml-12' : 'flex md:overflow-x-auto md:pb-8 md:px-4'} ${!isMobile ? 'hide-scrollbar' : ''}`}>
            {experiences.map((experience, index) => (
              <TimelineNode
                key={index}
                experience={experience}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
 
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
