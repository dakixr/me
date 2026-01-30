'use client';

import Timeline from './Timeline';

export default function CVSection() {
  return (
    <section id="cv" className="bg-light dark:bg-dark">
      <Timeline />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-dark-500 dark:text-light-300">
            Want to see my complete CV with education, achievements, and more?
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="/api/generate-pdf"
              aria-label="Download CV as PDF"
              className="inline-flex items-center px-4 py-2 border-2 border-dark dark:border-light text-sm font-medium text-dark dark:text-light bg-light dark:bg-dark hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark focus:outline-none transition-all duration-200"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
            <a
              href="/cv"
              aria-label="View full CV"
              className="inline-flex items-center px-4 py-2 border-2 border-dark dark:border-light text-sm font-medium bg-dark dark:bg-light text-light dark:text-dark hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light focus:outline-none transition-all duration-200"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              View Full CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
