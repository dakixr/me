'use client';

import { useState } from 'react';

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

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`bg-light dark:bg-dark p-6 cursor-pointer border border-dark-300 dark:border-light-300 focus:outline-none transition-all duration-200 ${
        isExpanded ? 'border-dark dark:border-light' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
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
          <p className="text-sm text-dark-500 dark:text-light-300">{experience.title}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-dark dark:text-light transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-light-300">
        <span>{experience.location}</span>
        <span>•</span>
        <span>{experience.period}</span>
      </div>

      {isExpanded && (
        <div className="space-y-4 mt-4">
          {experience.missions.map((mission, missionIndex) => (
            <div key={missionIndex} className="border-t border-dark-300 dark:border-light-300 pt-3">
              <h4 className="text-dark dark:text-light mb-2">
                {mission.name}
              </h4>
              <ul className="space-y-1">
                {mission.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-dark-500 dark:text-light-300 flex items-start">
                    <span className="text-dark dark:text-light mr-2 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {mission.techStack && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {mission.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 border border-dark-300 dark:border-light-300 text-dark dark:text-light text-xs"
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
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="py-20 bg-light dark:bg-dark">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
