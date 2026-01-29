"use client";

export default function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex items-center py-12 md:py-24 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block border border-dark-300 dark:border-light-300 px-3 py-1 text-sm text-dark dark:text-light mb-4">
              Senior Software Engineer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-dark dark:text-light mb-4 leading-tight">
              Daniel Rodríguez Mariblanca
            </h1>
            <p className="text-lg md:text-xl text-dark-500 dark:text-light-300 mb-8">
              Building innovative and high-performance software solutions with a
              passion for clean code and elegant design.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => window.location.href = '#projects'}
                aria-label="View projects section"
                className="px-6 py-3 border-2 border-dark dark:border-light text-dark dark:text-light hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-colors"
              >
                View Projects
              </button>
              <button 
                onClick={() => window.location.href = '#contact'}
                aria-label="Go to contact section"
                className="px-6 py-3 border-2 border-dark dark:border-light text-dark dark:text-light hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-colors"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="border border-dark-300 dark:border-light-300 overflow-hidden" role="region" aria-label="Terminal code block">
              <div className="border-b border-dark-300 dark:border-light-300 px-4 py-2 bg-light-200 dark:bg-dark-100" role="presentation">
                <div className="w-3 h-3 bg-dark dark:bg-light"></div>
              </div>
              <pre className="p-4 font-mono text-sm text-dark dark:text-light">
                <code>
                  <p>
                    <span className="text-dark dark:text-light">danielrm@dev</span>:
                    <span className="text-dark dark:text-light">~</span>$ whoami
                  </p>
                  <p className="mt-2">
                    Senior Software Engineer with a passion for creating
                    efficient, innovative code solutions.
                  </p>
                  <p className="mt-4">
                    <span className="text-dark dark:text-light">danielrm@dev</span>:
                    <span className="text-dark dark:text-light">~</span>$ skills
                  </p>
                  <p className="mt-2">
                    Python | Java | JS | AWS | ML | Docker |{" "}
                    <a className="underline hover:no-underline" href="#skills">
                      Show more
                    </a>
                  </p>
                  <p className="mt-4">
                    <span className="text-dark dark:text-light">danielrm@dev</span>:
                    <span className="text-dark dark:text-light">~</span>$ experience
                  </p>
                  <p className="mt-2">
                    TMC @ Bank of Luxembourg Investments & Deloitte <br></br>{" "}
                    Amazon <br></br> Santander Bank<br></br>
                  </p>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
