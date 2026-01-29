import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

const ParallaxBackground = dynamic(() => import('@/components/ParallaxBackground'), {
  ssr: false,
  loading: () => null,
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <div className="h-screen w-full bg-light-50 dark:bg-dark-DEFAULT" />,
});

const SkillsSection = dynamic(() => import('@/components/SkillsSection'), {
  loading: () => <div className="h-screen w-full bg-light-50 dark:bg-dark-DEFAULT" />,
});

const CVSection = dynamic(() => import('@/components/CVSection'), {
  loading: () => <div className="h-screen w-full bg-light-50 dark:bg-dark-DEFAULT" />,
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="h-screen w-full bg-light-50 dark:bg-dark-DEFAULT" />,
});

const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <ParallaxBackground />
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <CVSection />
      <ContactSection />
      <Footer />
    </main>
  );
} 