'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

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
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`${isMobile ? 'w-full' : 'w-full md:w-1/3 lg:w-1/4 flex-shrink-0 px-4'}`}
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-lg shadow-lg mx-auto mb-4 cursor-pointer z-10 relative focus:outline-none focus:ring-4 focus:ring-accent/30 ${
            isExpanded ? 'ring-4 ring-accent/30' : ''
          }`}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`Toggle details for ${experience.company}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {index + 1}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0.7,
            height: isExpanded ? 'auto' : 'auto'
          }}
          transition={{ duration: 0.3 }}
          className={`bg-white dark:bg-dark-100 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-accent ${
            isExpanded ? 'border-accent' : 'border-transparent'
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {experience.company}
              </h3>
              <p className="text-sm text-accent font-medium">{experience.title}</p>
            </div>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>

          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{experience.location}</span>
            <span className="mx-2">•</span>
            <span>{experience.period}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              {experience.missions.map((mission, missionIndex) => (
                <div key={missionIndex} className="border-t border-gray-200 dark:border-dark-300 pt-3">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {mission.name}
                  </h4>
                  <ul className="space-y-1">
                    {mission.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
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
                          className="px-2 py-1 bg-gradient-to-r from-accent/10 to-accent/20 dark:from-accent/20 dark:to-accent/30 text-accent text-xs rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="py-20 bg-gray-50 dark:bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Professional Experience
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
            My journey through impactful roles and projects in software engineering.
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            className={`absolute top-6 ${isMobile ? 'left-6 w-1 h-full' : 'left-1/2 w-0.5 h-full'} bg-gradient-to-b from-accent to-accent-dark origin-top`}
            style={{ scaleY: lineScale }}
          />

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
