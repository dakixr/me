'use client';

import Link from 'next/link';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({ 
  href, 
  children, 
  className = ''
}: TransitionLinkProps) {
  return (
    <Link 
      href={href} 
      className={className}
    >
      {children}
    </Link>
  );
}
