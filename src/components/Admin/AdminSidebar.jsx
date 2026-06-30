import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ForumIcon from '@mui/icons-material/Forum';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function AdminSidebar() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("Usertype") !== "admin") {
            navigate("/");
        }
    }, [navigate]);

    const links = [
        { to: '/adminHome', label: 'Dashboard', Icon: DashboardIcon },
        { to: '/adminuser', label: 'Users', Icon: PeopleIcon },
        { to: '/adminanalysis', label: 'Analysis', Icon: AnalyticsIcon },
        { to: '/adminquestions', label: 'Questions', Icon: QuestionAnswerIcon },
        { to: '/adminanswer', label: 'Answers', Icon: ForumIcon },
    ];

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="glass border border-surfaceBorder rounded-2xl p-4 flex flex-col gap-1.5 shadow-sm md:sticky md:top-24">
                <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider px-3 mb-2 block">ADMINISTRATOR</span>

                {links.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `group px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                                isActive
                                    ? 'bg-rose-500/15 text-rose-500 border-l-2 border-rose-500 pl-3.5'
                                    : 'text-textMuted hover:text-textMain hover:bg-surfaceHover hover:translate-x-1'
                            }`
                    >
                        <Icon style={{ fontSize: '18px' }} className="transition-transform duration-200 group-hover:scale-110" />
                        {label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
