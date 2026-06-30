import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import { FilterList } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import Posts from './Posts';
import Pagination from './Pagination';
import AuthModal from '../AuthModal';
import Button from '../common/Button';

export default function Questions() {
    const [questions, setQuestions] = useState([]);
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [activeSort, setActiveSort] = useState('latest');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchAllQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/fetchquestions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => setQuestions(data))
    }

    const sortByVotes = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/fetchQueByHigherVotes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => setQuestions(data))
    }

    const answeredQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/answeredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => setQuestions(data))
    }

    const unansweredQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/unansweredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => setQuestions(data))
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const filter = queryParams.get('filter');

        if (filter === 'unanswered') {
            setActiveSort('open');
            unansweredQuestions();
        } else if (filter === 'top') {
            setActiveSort('top');
            sortByVotes();
        } else if (filter === 'resolved') {
            setActiveSort('resolved');
            answeredQuestions();
        } else {
            setActiveSort('latest');
            fetchAllQuestions();
        }
    }, [location.search]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => {
        setcurrentPage(pageNum);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto px-0 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
                {/* Left Sidebar */}
                <Sidebar />

                {/* Middle Feed */}
                <main className="flex-1 py-8 px-4 lg:px-8 w-full lg:border-r border-surfaceBorder overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-extrabold text-textMain tracking-tight">Public Feed</h1>
                            <p className="text-textMuted font-medium text-sm">{questions.length} Active Discussions</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} className="relative">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-40 blur-lg -z-10"></div>
                            <Button
                                onClick={() => {
                                    if (!localStorage.getItem('token')) {
                                        setShowAuthModal(true);
                                    } else {
                                        navigate('/editor');
                                    }
                                }}
                                variant="primary"
                                className="whitespace-nowrap"
                            >
                                <AddIcon style={{ fontSize: '18px' }} /> Ask Question
                            </Button>
                        </motion.div>
                    </div>



                    <div className="mb-8">
                        <Posts posts={currentPosts} />
                    </div>

                    <div className="flex justify-center pb-8">
                        <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} currentPage={currentPage} />
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar py-8 px-6 border-t border-surfaceBorder lg:border-t-0">
                    <div className="flex flex-col gap-6">

                        {/* Community Card */}
                        <div className="glass rounded-2xl p-5 relative overflow-hidden shadow-lg shadow-primary/5 shrink-0">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                            <h3 className="font-bold text-textMain mb-2 flex items-center gap-2">
                                <GroupsIcon className="text-primary" /> About Community
                            </h3>
                            <p className="text-sm text-textMuted leading-relaxed mb-4">
                                The premium network for developers to share knowledge, post bugs, and discuss emerging web technologies.
                            </p>
                            <div className="flex flex-col gap-3 text-sm border-t border-surfaceBorder pt-4">
                                <div className="flex justify-between">
                                    <span className="text-textMuted">Members</span>
                                    <span className="font-bold text-textMain">10.4k</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-textMuted">Online</span>
                                    <span className="font-bold text-emerald-500 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 1,204
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Trending Tags */}
                        <div className="bg-surface rounded-2xl p-5 border-theme hover:border-primary/20 shadow-lg transition-colors duration-300 shrink-0">
                            <h3 className="font-bold text-textMain text-sm mb-4 tracking-wide uppercase">Trending Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {['react', 'nextjs', 'typescript', 'architecture', 'api'].map(tag => (
                                    <motion.div key={tag} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.9 }} className="inline-block">
                                        <NavLink to={`/questionOntags/${tag}`} className="block px-3 py-1.5 bg-surfaceHover border-theme rounded-lg text-xs font-semibold text-textMuted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                                            #{tag}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Posts Mini-Feed */}
                        <div className="bg-surface rounded-2xl p-5 border-theme hover:border-primary/20 shadow-lg transition-colors duration-300 shrink-0">
                            <h3 className="font-bold text-textMain text-sm mb-4 tracking-wide uppercase">Recent Activity</h3>
                            <div className="flex flex-col gap-1">
                                {questions.slice(0, 3).map(q => (
                                    <motion.div key={q.id} whileHover={{ x: 4 }} className="flex flex-col gap-1 border-b border-surfaceBorder pb-3 mb-3 last:border-0 last:pb-0 last:mb-0 -mx-2 px-2 py-1 rounded-lg hover:bg-surfaceHover/50 transition-colors">
                                        <NavLink to={`/question/${q.id}`} className="text-sm font-bold text-textMain hover:text-primary transition-colors line-clamp-2 leading-snug">
                                            {q.title}
                                        </NavLink>
                                        <span className="text-[10px] text-textMuted">Posted by {q.postedBy || 'Anonymous'}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message="Join the community to post questions and discuss new tech!"
            />
        </div>
    )
}
