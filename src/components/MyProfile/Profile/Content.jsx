import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import parse from "html-react-parser";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MessageIcon from '@mui/icons-material/Message';

export default function Content(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [question, setQuestion] = useState([]);
    const [html, setHtml] = useState("");
    const [answers, setAnswer] = useState([]);
    const [vote, setVotes] = useState({});
    const [voteStatus, setVoteStatus] = useState({});
    const [loginstatus, setloginstatus] = useState(false);
    const [answerstatus, setanswerstatus] = useState({});

    const isLoggedIn = () => {
        if (localStorage.getItem('username') !== null) {
            setloginstatus(true);
        }
    }

    const fetchQuestion = async (id) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchQueById/${id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then((data) => {
            setQuestion(data);
            setHtml(parse(data.question || ""));
        });
    }

    const fetchAnswers = async (id) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchanswer/${id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then((data) => {
            setAnswer(data);
        });
    }

    const upvote = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/upvote/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            let json = await response.json();
            setVoteStatus(json);
        } else {
            navigate("/login");
        }
    }

    const downvote = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/downvote/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            let json = await response.json();
            setVoteStatus(json);
        } else {
            navigate("/login");
        }
    }

    const fetchVotes = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchVotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        let json = await response.json();
        setVotes(json);
    }

    const acceptAnswer = async (e, id) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/acceptanswer/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" }
        });
        let json = await response.json();
        setanswerstatus(json);
    }

    useEffect(() => {
        isLoggedIn();
        fetchQuestion(params.type);
        fetchAnswers(params.type);
        fetchVotes();
    }, [voteStatus, answerstatus, params.type]);

    return (
        <div className="min-h-screen bg-background text-textMain py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4">

                {/* Question Detail Card */}
                <div className="glass rounded-2xl p-6 border-theme mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

                    <div className="flex flex-col gap-4 relative z-10">
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">YOUR QUERY</span>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-textMain tracking-tight leading-tight">
                            {question.title}
                        </h1>
                        <div className="flex gap-4 text-xs text-textMuted border-b border-surfaceBorder pb-4">
                            <span className="flex items-center gap-1"><AccessTimeIcon className="w-3.5 h-3.5" /> Asked on {question.createdAt ? question.createdAt.slice(0, 10) : ''}</span>
                        </div>
                        <div className="prose prose-slate max-w-none text-textMain mt-2 leading-relaxed text-sm md:text-base">
                            {html}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {question.tags && question.tags.split(" ").filter(t => t.trim()).map(tag => (
                                <motion.span
                                    key={tag}
                                    whileHover={{ scale: 1.06, y: -2 }}
                                    whileTap={{ scale: 0.92 }}
                                    className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-surfaceHover border-theme text-textMuted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default"
                                >
                                    #{tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Answers Section */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-textMain pl-1 flex items-center gap-2">
                        <MessageIcon className="text-primary" /> {answers.length} Responses
                    </h2>

                    {answers.map((ans, index) => (
                        <motion.div
                            key={ans.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                            whileHover={{ y: -4 }}
                            className="bg-surface border-theme rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-shadow duration-300"
                        >
                            <div className="flex gap-4">

                                {/* Votes Side Controller */}
                                <div className="flex flex-col items-center gap-2 bg-surfaceHover/30 border-theme rounded-xl p-1.5 h-max">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={(e) => upvote(e, ans.id)}
                                        className="p-1 rounded-lg hover:bg-emerald-500/20 text-textMuted hover:text-emerald-500 transition-colors"
                                        title="Upvote Answer"
                                    >
                                        <ThumbUpIcon style={{ fontSize: '14px' }} />
                                    </motion.button>
                                    <span className="text-sm font-bold text-textMain">{vote[ans.id] || 0}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={(e) => downvote(e, ans.id)}
                                        className="p-1 rounded-lg hover:bg-rose-500/20 text-textMuted hover:text-rose-500 transition-colors"
                                        title="Downvote Answer"
                                    >
                                        <ThumbDownIcon style={{ fontSize: '14px' }} />
                                    </motion.button>
                                </div>

                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-primary/25 text-primary flex items-center justify-center text-xs font-bold">
                                                {ans.postedBy ? ans.postedBy.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            <span className="text-sm font-semibold text-textMain">{ans.postedBy}</span>
                                        </div>

                                        {ans.status === "Accepted" ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                <CheckCircleIcon style={{ fontSize: '14px' }} />
                                                Accepted
                                            </span>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => acceptAnswer(e, ans.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border-theme text-textMuted hover:border-emerald-500/40 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                                            >
                                                <CheckCircleIcon style={{ fontSize: '14px' }} /> Accept Answer
                                            </motion.button>
                                        )}
                                    </div>

                                    <div className="text-textMuted text-sm leading-relaxed prose">
                                        {parse(ans.answer)}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
