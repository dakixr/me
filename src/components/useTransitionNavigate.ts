import { usePageTransition } from './PageTransition';

export function useTransitionNavigate() {
  const { setTransitionType, startTransition } = usePageTransition();

  return (href: string, type: 'fade' | 'slide' | 'scale' | 'none' = 'fade') => {
    setTransitionType(type);
    startTransition(href);
  };
} 