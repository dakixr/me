'use client';

import { motion } from 'framer-motion';
import SkillBar from './SkillBar';

const skills = [
  {
    category: 'Languages',
    color: 'from-blue-500 to-blue-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
    items: [
      { name: 'Python', proficiency: 95, description: 'Expert level with 8+ years experience' },
      { name: 'Java', proficiency: 85, description: 'Strong backend development skills' },
      { name: 'Kotlin', proficiency: 75, description: 'Modern Android development' },
      { name: 'C', proficiency: 70, description: 'Systems programming foundation' },
      { name: 'SQL', proficiency: 90, description: 'Advanced query optimization' },
      { name: 'Bash', proficiency: 85, description: 'Efficient automation scripting' },
    ],
  },
  {
    category: 'Web Development',
    color: 'from-green-500 to-green-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
        <line x1="12" y1="22" x2="12" y2="15.5"></line>
        <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
        <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
        <line x1="12" y1="2" x2="12" y2="8.5"></line>
      </svg>
    ),
    items: [
      { name: 'Django', proficiency: 90, description: 'Full-stack web applications' },
      { name: 'HTMX', proficiency: 85, description: 'Modern hypermedia-driven apps' },
      { name: 'htpy', proficiency: 80, description: 'Python HTML framework' },
      { name: 'HTML/CSS', proficiency: 90, description: 'Responsive design mastery' },
      { name: 'JavaScript', proficiency: 80, description: 'Client-side interactivity' },
      { name: 'REST APIs', proficiency: 88, description: 'API design and integration' },
    ],
  },
  {
    category: 'Data & ML',
    color: 'from-purple-500 to-purple-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    items: [
      { name: 'Pandas', proficiency: 92, description: 'Data manipulation expert' },
      { name: 'Polars', proficiency: 80, description: 'High-performance data processing' },
      { name: 'NumPy', proficiency: 88, description: 'Numerical computing foundation' },
      { name: 'scikit-learn', proficiency: 82, description: 'Machine learning pipelines' },
      { name: 'Keras', proficiency: 78, description: 'Deep learning models' },
      { name: 'Data Warehousing', proficiency: 85, description: 'Enterprise data architecture' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    color: 'from-orange-500 to-orange-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
        <polygon points="12 15 17 21 7 21 12 15"></polygon>
      </svg>
    ),
    items: [
      { name: 'AWS', proficiency: 85, description: 'Redshift, ECS, ECR, EC2, Lambda' },
      { name: 'Pulumi IaC', proficiency: 80, description: 'Infrastructure as Code' },
      { name: 'Docker', proficiency: 88, description: 'Containerization expertise' },
      { name: 'CI/CD', proficiency: 90, description: 'Automated deployment pipelines' },
      { name: 'Git', proficiency: 92, description: 'Version control mastery' },
    ],
  },
  {
    category: 'Tools & Environment',
    color: 'from-pink-500 to-pink-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    items: [
      { name: 'Unix/Linux', proficiency: 92, description: 'System administration' },
      { name: 'Jupyter', proficiency: 88, description: 'Data science notebooks' },
      { name: 'VS Code', proficiency: 95, description: 'Primary development environment' },
      { name: 'Vim Motions', proficiency: 75, description: 'Efficient text editing' },
    ],
  },
  {
    category: 'Methodologies',
    color: 'from-indigo-500 to-indigo-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
      </svg>
    ),
    items: [
      { name: 'Agile (Scrum)', proficiency: 88, description: 'Team collaboration and sprints' },
      { name: 'Continuous Integration', proficiency: 90, description: 'Automated testing and integration' },
      { name: 'TDD', proficiency: 85, description: 'Test-driven development' },
    ],
  },
  {
    category: 'Soft Skills',
    color: 'from-teal-500 to-teal-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    items: [
      { name: 'Communication', proficiency: 92, description: 'Clear and effective collaboration' },
      { name: 'Problem-Solving', proficiency: 95, description: 'Analytical thinking approach' },
      { name: 'Adaptability', proficiency: 90, description: 'Quick learning and flexibility' },
      { name: 'Team Leadership', proficiency: 85, description: 'Mentoring and guidance' },
    ],
  },
];

export default function SkillsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Technical Skills
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
            A comprehensive overview of my technical skills, tools, and methodologies I use to solve complex problems.
          </motion.p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skillCategory, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-dark-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dark-300"
            >
              <div className="flex items-center mb-6">
                <div className={`mr-3 bg-gradient-to-br ${skillCategory.color} p-2 rounded-lg text-white`}>
                  {skillCategory.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skillCategory.category}</h3>
              </div>
              <div className="space-y-4">
                {skillCategory.items.map((skill, itemIndex) => (
                  <SkillBar
                    key={itemIndex}
                    skill={skill.name}
                    proficiency={skill.proficiency}
                    description={skill.description}
                    delay={itemIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 