'use client';

import Link from 'next/link';
import { usePageTransition } from './PageTransition';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  transitionType?: 'fade' | 'slide' | 'scale' | 'none';
}

export function TransitionLink({ 
  href, 
  children, 
  className = '',
  transitionType 
}: TransitionLinkProps) {
  const { startTransition, setTransitionType } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (transitionType) {
      setTransitionType(transitionType);
    }
    
    startTransition(href);
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
