import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from '../common/Logo';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Queries', path: '/queries', icon: ListAltIcon },
  { name: 'AI Assistant', path: '/ai-assistant', icon: AutoAwesomeIcon, isAI: true },
  { name: 'Knowledge Base', path: '/knowledge', icon: LibraryBooksIcon },
  { name: 'Analytics', path: '/analytics', icon: AnalyticsIcon },
  { name: 'Team', path: '/team', icon: PeopleIcon },
  { name: 'Workflow', path: '/workflow', icon: AccountTreeIcon },
  { name: 'Reports', path: '/reports', icon: AssessmentIcon },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-surfaceBorder h-full p-4 transition-colors duration-300">
      <div className="px-2 mb-8">
        <Logo className="group" />
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium no-underline hover:no-underline focus:no-underline ${isActive
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                  : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'
                }`
              }
            >
              <Icon fontSize="small" className={item.isAI ? 'text-accent' : ''} />
              {item.name}
              {item.isAI && (
                <span className="ml-auto text-[10px] uppercase font-bold bg-gradient-to-r from-accent to-secondary text-transparent bg-clip-text">
                  New
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-surfaceBorder">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium no-underline hover:no-underline focus:no-underline ${isActive
              ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
              : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'
            }`
          }
        >
          <SettingsIcon fontSize="small" />
          Settings
        </NavLink>

        {/* User mini profile */}
        <div className="mt-4 flex items-center gap-3 px-3 py-2 bg-surfaceHover rounded-xl border border-surfaceBorder">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-textMain truncate">Rahul Deopa</p>
            <p className="text-xs text-textMuted truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
