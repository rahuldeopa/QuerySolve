import React from 'react';
import { NavLink } from 'react-router-dom';
import InsightsIcon from '@mui/icons-material/Insights';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import ForumIcon from '@mui/icons-material/Forum';

const links = [
    { to: '/analysis', label: 'Analysis Dashboard', Icon: InsightsIcon },
    { to: '/myquestions', label: 'My Questions', Icon: HelpOutlineIcon },
    { to: '/myanswers', label: 'My Answers', Icon: ForumIcon },
];

export default function ProfileSidebar() {
    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="glass border border-surfaceBorder rounded-2xl p-4 flex flex-col gap-1.5 shadow-sm md:sticky md:top-24 animate-fade-in">
                <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider px-3 mb-2 block">USER PROFILE</span>

                {links.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `group px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 no-underline hover:no-underline focus:no-underline ${
                                isActive
                                    ? 'bg-primary/15 text-primary border-l-2 border-primary pl-3.5'
                                    : 'text-textMuted hover:text-textMain hover:bg-surfaceHover hover:translate-x-1'
                            }`
                        }
                    >
                        <Icon style={{ fontSize: '18px' }} className="transition-transform duration-200 group-hover:scale-110" />
                        {label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
