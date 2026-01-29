'use client';

import { useState } from 'react';

interface SkillBarProps {
  skill: string;
  proficiency: number;
  description?: string;
}

export default function SkillBar({ skill, proficiency, description }: SkillBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="button"
      aria-label={`${skill}: ${proficiency}%${description ? `, ${description}` : ''}`}
      aria-describedby={description ? `tooltip-${skill.replace(/\s+/g, '-')}` : undefined}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-dark dark:text-light">{skill}</span>
        <span className="text-xs text-dark-500 dark:text-light-400">{proficiency}%</span>
      </div>

      <div className="h-3 bg-dark-300 dark:bg-light-300 rounded-full overflow-hidden" role="progressbar" aria-valuenow={proficiency} aria-valuemin={0} aria-valuemax={100} aria-hidden="true">
        <div
          className="h-full bg-dark dark:bg-light rounded-full transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>

      {description && (
        <>
          <div
            id={`tooltip-${skill.replace(/\s+/g, '-')}`}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark dark:bg-light text-light dark:text-dark text-xs rounded-lg shadow whitespace-nowrap z-10 transition-opacity duration-200 ${
              showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            role="tooltip"
          >
            {description}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark dark:border-t-light" />
          </div>
        </>
      )}
    </div>
  );
}
