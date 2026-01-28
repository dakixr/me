'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  magneticStrength?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  magneticStrength = 0.3,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y });

    setTimeout(() => setRipple(null), 1000);
  };

  const baseClasses =
    'relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

  const variantClasses = {
    primary:
      'bg-accent hover:bg-accent-dark text-white shadow-lg hover:shadow-xl hover:scale-105',
    outline:
      'border-2 border-accent text-accent hover:bg-accent hover:text-white hover:scale-105',
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        handleClick(e);
        if (props.onClick) props.onClick(e);
      }}
      animate={
        !prefersReducedMotion && isHovered
          ? {
              x: mousePosition.x * magneticStrength,
              y: mousePosition.y * magneticStrength,
            }
          : { x: 0, y: 0 }
      }
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
      disabled={props.disabled}
      type={props.type}
      form={props.form}
      id={props.id}
      aria-label={props['aria-label']}
    >
      {ripple && (
        <motion.span
          className="absolute rounded-full bg-white/30"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
          }}
        />
      )}
      <motion.span
        className="relative z-10"
        whileTap={!prefersReducedMotion ? { scale: 0.9 } : undefined}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
