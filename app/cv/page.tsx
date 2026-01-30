'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { markdownSanitizeSchema } from '../../src/lib/markdownSanitize';

export default function CVPage() {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchMarkdown = async () => {
      try {
        const response = await fetch('/daniel_cv.md');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarkdown();
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light dark:bg-dark">
        <div className="h-12 w-12 border-t-2 border-b-2 border-dark dark:border-light animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-light dark:bg-dark p-4 border-b border-dark-300 dark:border-light-300 sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-xl font-bold text-dark dark:text-light hover:underline transition duration-200">
              Daniel
            </Link>
          </div>
          <div className="flex justify-end gap-4">
            <Link
              href="/"
              className="px-3 py-1 text-sm border border-dark-300 dark:border-light-300 text-dark dark:text-light hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </Link>
            <a
              href="/api/generate-pdf"
              className="px-3 py-1 text-sm border-2 border-dark dark:border-light bg-dark dark:bg-light text-light dark:text-dark hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-light dark:bg-dark p-6 overflow-auto">
        <div className="container mx-auto max-w-4xl">
          <article className="prose dark:prose-invert max-w-none text-dark dark:text-light [&_*]:text-dark dark:[&_*]:text-light [&_a]:underline [&_h1]:text-dark dark:[&_h1]:text-light [&_h2]:text-dark dark:[&_h2]:text-light [&_h3]:text-dark dark:[&_h3]:text-light [&_h4]:text-dark dark:[&_h4]:text-light [&_p]:text-dark-500 dark:[&_p]:text-light-300 [&_li]:text-dark-500 dark:[&_li]:text-light-300">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeHighlight, [rehypeSanitize, markdownSanitizeSchema]]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
} 
