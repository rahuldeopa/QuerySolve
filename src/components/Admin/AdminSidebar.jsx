import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ForumIcon from '@mui/icons-material/Forum';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Menu, Close } from '@mui/icons-material';

export default function AdminSidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
        <>
            {/* Mobile Toggle Button (Only visible on small screens) */}
            <button 
                onClick={() => setIsOpen(true)} 
                className="md:hidden fixed bottom-6 left-6 z-40 p-3 bg-rose-500 text-white rounded-full shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform"
            >
                <Menu />
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)} 
                    className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity"
                ></div>
            )}

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 z-50 md:z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex w-64 flex-shrink-0 min-h-screen md:min-h-auto md:h-auto`}>
                <div className="glass border-r md:border border-surfaceBorder md:rounded-2xl w-full h-full p-4 flex flex-col gap-2 shadow-2xl md:shadow-sm md:sticky md:top-24 overflow-y-auto custom-scrollbar relative">
                    
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="md:hidden absolute top-4 right-4 p-2 text-textMuted hover:text-textMain transition-colors bg-surface/50 rounded-full z-50"
                    >
                        <Close />
                    </button>

                    <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider px-3 mb-4 mt-2 block">ADMINISTRATOR</span>

                    {links.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `group px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                                    isActive
                                        ? 'bg-rose-500/15 text-rose-500 border-l-2 border-rose-500 pl-3.5'
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
        </>
    );
}
