import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AuthModal from '../AuthModal';

export default function Posts({ posts }) {
    const [noOfAns, setnoOfAns] = useState({});
    const [vote, setVotes] = useState({});
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const FindFrequencyOfAns = async () => {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/answer/findNumberOfAns", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        setnoOfAns(json);
    }

    const fetchVotes = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchallVotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        let json = await response.json();
        setVotes(json);
    }

    useEffect(() => {
        FindFrequencyOfAns();
        fetchVotes();
    }, []);

    // Helper to generate a quick mock AI summary preview
    const getAiSummary = (questionText) => {
        try {
            // strip HTML tags to get clean text
            const cleanText = questionText.replace(/<[^>]*>/g, '');
            if (cleanText.length > 120) {
                return cleanText.substring(0, 120) + '...';
            }
            return cleanText || "Analysis pending database context sync.";
        } catch {
            return "Unable to generate summary preview.";
        }
    };

    return (
        <div className="flex flex-col gap-6 p-1">
            {posts.map((question, index) => {
                const votesCount = vote[question.id] || 0;
                const answersCount = noOfAns[question.id] || 0;
                const aiSummary = getAiSummary(question.question);

                return (
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                        whileHover={{ y: -6 }}
                        className="group relative bg-surface border-theme rounded-2xl p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                    >
                        {/* Animated gradient border glow on hover */}
                        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/40 via-accent/30 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[3px] -z-10"></div>
                        <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:border group-hover:border-primary/30 transition-colors duration-300"></div>

                        {/* Glow decorative background */}
                        <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl group-hover:from-primary/15 group-hover:to-accent/15 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col gap-4">

                            {/* Card Header: Category/Badges & Votes */}
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border-theme">
                                        <AutoAwesomeIcon className="w-3 h-3" style={{ fontSize: '12px' }} />
                                        AI Autocategorized
                                    </span>
                                    {answersCount > 0 ? (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border-theme">
                                            Resolved
                                        </span>
                                    ) : (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border-theme">
                                            Open Query
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-textMuted text-sm">
                                    <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} className="flex items-center gap-1.5 font-medium px-2 py-1 rounded-lg hover:text-primary hover:bg-primary/10 cursor-default transition-colors">
                                        <ThumbUpOutlinedIcon style={{ fontSize: '16px' }} />
                                        {votesCount}
                                    </motion.span>
                                    <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} className="flex items-center gap-1.5 font-medium px-2 py-1 rounded-lg hover:text-accent hover:bg-accent/10 cursor-default transition-colors">
                                        <ChatBubbleOutlineOutlinedIcon style={{ fontSize: '16px' }} />
                                        {answersCount}
                                    </motion.span>
                                </div>
                            </div>

                            {/* Card Title */}
                            <motion.div
                                whileTap={{ scale: 0.99 }}
                                onClick={(e) => {
                                    if (!localStorage.getItem('token')) {
                                        e.preventDefault();
                                        setShowAuthModal(true);
                                    } else {
                                        navigate(`/question/${question.id}`);
                                    }
                                }}
                                className="cursor-pointer text-xl font-bold text-textMain group-hover:text-primary transition-colors leading-snug w-fit"
                            >
                                {question.title}
                            </motion.div>

                            {/* AI Summary Section */}
                            <div className="relative rounded-lg bg-surfaceHover/40 border-l-2 border-accent/60 pl-4 pr-3.5 py-3">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <AutoAwesomeIcon style={{ fontSize: '13px' }} className="text-accent" />
                                    <span className="text-[10px] font-semibold tracking-[0.12em] text-accent/90 uppercase">AI Summary</span>
                                </div>
                                <p className="text-sm text-textMuted leading-relaxed">{aiSummary}</p>
                            </div>

                            {/* Tags Section */}
                            <div className="flex flex-wrap gap-2">
                                {question.tags.split(" ").filter(t => t.trim()).map(tag => (
                                    <motion.div key={tag} whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.92 }} className="inline-block">
                                        <NavLink
                                            to={{ pathname: `/questionOntags/${tag.toLowerCase()}` }}
                                            className="block px-3 py-1 rounded-lg text-xs font-medium bg-surfaceHover border-theme text-textMuted hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
                                        >
                                            #{tag}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer: User Details & Metadata */}
                            <div className="flex justify-between items-center pt-4 border-t border-surfaceBorder mt-2 text-xs text-textMuted">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary/30 to-accent/20 flex items-center justify-center text-primary font-bold text-xs border-theme">
                                        {question.postedBy ? question.postedBy.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <span className="font-semibold text-textMain">{question.postedBy || "Anonymous"}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <AccessTimeIcon style={{ fontSize: '12px' }} />
                                    <span>Asked {question.createdAt.slice(0, 10)} at {question.createdAt.slice(11, 16)}</span>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                );
            })}

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message="Join the community to view full threads, read answers, and vote!"
            />
        </div>
    );
}
