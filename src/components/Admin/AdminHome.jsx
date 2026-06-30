import React, { useEffect, useState } from "react";
import AdminSidebar from './AdminSidebar';
import PeopleIcon from '@mui/icons-material/People';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function AdminHome() {
    const [stats, setStats] = useState({ users: 0, questions: 0, answers: 0, accepted: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const urls = ['/api/admin/noOfUsers', '/api/admin/noOfQuestions', '/api/admin/noOfAnswers', '/api/admin/noOfAccept'];
            const res = await Promise.all(urls.map(url => 
                fetch(import.meta.env.VITE_BACKEND_URL + url, { method: 'POST' }).then(r => r.json())
            ));
            setStats({ users: res[0], questions: res[1], answers: res[2], accepted: res[3] });
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Users', value: stats.users, Icon: PeopleIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Questions Asked', value: stats.questions, Icon: QuestionAnswerIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Answers Given', value: stats.answers, Icon: ForumIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Accepted Answers', value: stats.accepted, Icon: CheckCircleIcon, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    ];

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <AdminSidebar />
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
                        {cards.map((c, i) => (
                            <div key={i} className="glass border border-surfaceBorder p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${c.bg} ${c.color}`}>
                                    <c.Icon fontSize="large" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-textMuted font-bold uppercase tracking-wider">{c.label}</span>
                                    <span className="text-3xl font-extrabold">{c.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
