'use client';

import SkillBar from './SkillBar';

const skills = [
  {
    category: 'Languages',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
    items: [
      { name: 'Python', description: 'Expert level with 8+ years experience' },
      { name: 'Java', description: 'Strong backend development skills' },
      { name: 'Kotlin', description: 'Modern Android development' },
      { name: 'C', description: 'Systems programming foundation' },
      { name: 'SQL', description: 'Advanced query optimization' },
      { name: 'Bash', description: 'Efficient automation scripting' },
    ],
  },
  {
    category: 'Web Development',
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
      { name: 'Django', description: 'Full-stack web applications' },
      { name: 'HTMX', description: 'Modern hypermedia-driven apps' },
      { name: 'htpy', description: 'Python HTML framework' },
      { name: 'HTML/CSS', description: 'Responsive design mastery' },
      { name: 'JavaScript', description: 'Client-side interactivity' },
      { name: 'REST APIs', description: 'API design and integration' },
    ],
  },
  {
    category: 'Data & ML',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    items: [
      { name: 'Pandas', description: 'Data manipulation expert' },
      { name: 'Polars', description: 'High-performance data processing' },
      { name: 'NumPy', description: 'Numerical computing foundation' },
      { name: 'scikit-learn', description: 'Machine learning pipelines' },
      { name: 'Keras', description: 'Deep learning models' },
      { name: 'Data Warehousing', description: 'Enterprise data architecture' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
        <polygon points="12 15 17 21 7 21 12 15"></polygon>
      </svg>
    ),
    items: [
      { name: 'AWS', description: 'Redshift, ECS, ECR, EC2, Lambda' },
      { name: 'Pulumi IaC', description: 'Infrastructure as Code' },
      { name: 'Docker', description: 'Containerization expertise' },
      { name: 'CI/CD', description: 'Automated deployment pipelines' },
      { name: 'Git', description: 'Version control mastery' },
    ],
  },
  {
    category: 'Tools & Environment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    items: [
      { name: 'Unix/Linux', description: 'System administration' },
      { name: 'Jupyter', description: 'Data science notebooks' },
      { name: 'VS Code', description: 'Primary development environment' },
      { name: 'Vim Motions', description: 'Efficient text editing' },
    ],
  },
  {
    category: 'Methodologies',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
      </svg>
    ),
    items: [
      { name: 'Agile (Scrum)', description: 'Team collaboration and sprints' },
      { name: 'Continuous Integration', description: 'Automated testing and integration' },
      { name: 'TDD', description: 'Test-driven development' },
    ],
  },
  {
    category: 'Soft Skills',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    items: [
      { name: 'Communication', description: 'Clear and effective collaboration' },
      { name: 'Problem-Solving', description: 'Analytical thinking approach' },
      { name: 'Adaptability', description: 'Quick learning and flexibility' },
      { name: 'Team Leadership', description: 'Mentoring and guidance' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl text-dark dark:text-light mb-2">
            Technical Skills
          </h2>
          <div className="h-px w-20 bg-dark dark:bg-light mx-auto mb-4" />
          <p className="text-lg text-dark-500 dark:text-light-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and methodologies I use to solve complex problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={index}
              className="bg-light dark:bg-dark p-6 border border-dark-300 dark:border-light-300"
            >
              <div className="flex items-center mb-6">
                <div className="mr-3 border border-dark-300 dark:border-light-300 p-2 text-dark dark:text-light">
                  {skillCategory.icon}
                </div>
                <h3 className="text-xl text-dark dark:text-light">{skillCategory.category}</h3>
              </div>
              <ul className="space-y-2">
                {skillCategory.items.map((skill, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-dark dark:text-light mr-2">•</span>
                    <SkillBar
                      skill={skill.name}
                      description={skill.description}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
