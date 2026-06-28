import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Reusable premium Logo component for QuerySolve.
 * Includes a custom SVG mark (combining search/query and check/solve) and branded typography.
 */
export default function Logo({ 
  className = "", 
  iconClassName = "w-8 h-8", 
  textClassName = "text-xl", 
  iconOnly = false,
  to = "/" 
}) {
  const LogoMark = (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent p-1.5 shadow-md shadow-primary/20 hover:shadow-primary/35 transition-all duration-300 ${iconClassName}`}>
      {/* Glossy overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-white filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
      >
        {/* Magnifying glass ring (Query) */}
        <path
          d="M10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17C12.0622 17 13.4935 16.4479 14.6152 15.5348L18.7929 19.7121C19.1834 20.1026 19.8166 20.1026 20.2071 19.7121C20.5976 19.3216 20.5976 18.6884 20.2071 18.2979L16.0352 14.126C16.9479 13.0035 17.5 11.5722 17.5 10.5C17.5 6.91015 14.5899 4 10.5 4ZM10.5 5.875C13.0543 5.875 15.125 7.94569 15.125 10.5C15.125 13.0543 13.0543 15.125 10.5 15.125C7.94569 15.125 5.875 13.0543 5.875 10.5C5.875 7.94569 7.94569 5.875 10.5 5.875Z"
          fill="currentColor"
        />
        {/* Dynamic checkmark (Solve) */}
        <path
          d="M8.5 10.5L10 12L13 8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  if (iconOnly) {
    return to ? <NavLink to={to} className={`inline-flex ${className}`}>{LogoMark}</NavLink> : LogoMark;
  }

  const logoContent = (
    <div className={`flex items-center gap-2.5 flex-shrink-0 group ${className}`}>
      {LogoMark}
      <span className={`font-bold text-textMain tracking-tight transition-colors duration-200 ${textClassName}`}>
        Query<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Solve</span>
      </span>
    </div>
  );

  return to ? (
    <NavLink to={to} className="flex items-center no-underline hover:no-underline focus:no-underline">
      {logoContent}
    </NavLink>
  ) : logoContent;
}
