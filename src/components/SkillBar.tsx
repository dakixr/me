'use client';

import { useState } from 'react';

interface SkillBarProps {
  skill: string;
  description?: string;
}

export default function SkillBar({ skill, description }: SkillBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="button"
      aria-label={`${skill}${description ? `: ${description}` : ''}`}
      aria-describedby={description ? `tooltip-${skill.replace(/\s+/g, '-')}` : undefined}
    >
      <span className="text-sm text-dark dark:text-light">{skill}</span>

      {description && (
        <div
          id={`tooltip-${skill.replace(/\s+/g, '-')}`}
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark dark:bg-light text-light dark:text-dark text-xs border border-dark dark:border-light whitespace-nowrap z-10 transition-opacity duration-200 ${
            showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          role="tooltip"
        >
          {description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark dark:border-t-light" />
        </div>
      )}
    </div>
  );
}
