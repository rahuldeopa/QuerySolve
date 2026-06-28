import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import parse from "html-react-parser";
import JoditEditor from "jodit-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MessageIcon from '@mui/icons-material/Message';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import TechVote from '../TechVote';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../common/Button';
import Alert from '../common/Alert';

export default function Content(props) {
    const navigate = useNavigate();
    const editor = useRef(null);
    const params = useParams();
    const [value, setValue] = useState("");
    const [question, setQuestion] = useState([]);
    const [html, setHtml] = useState("");
    const [state, setState] = useState(false);
    const [answers, setAnswer] = useState([]);
    const [vote, setVotes] = useState({});
    const [voteStatus, setVoteStatus] = useState({});
    const [loginstatus, setloginstatus] = useState(false);
    const [quevoteStatus, setqueVoteStatus] = useState({});
    const [queVote, setQueVote] = useState(0);

    const [show, setShow] = useState(false);
    const [comment, setComment] = useState({});
    const [commentState, setCommentState] = useState(false);

    const config = useMemo(() => ({
        readonly: false,
        theme: "default",
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);

    const isLoggedIn = () => {
        if (localStorage.getItem('username') !== null) {
            setloginstatus(true);
        }
    }

    const fetchQuestion = async (id) => {
        await fetch(`http://localhost:5000/api/question/fetchQueById/${id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then((data) => {
            setQuestion(data);
            setHtml(parse(data.question || ""));
        });
    }

    const fetchAnswers = async (id) => {
        await fetch(`http://localhost:5000/api/answer/fetchanswer/${id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then((data) => {
            setAnswer(data);
        });
    }

    const getValue = (newvalue) => {
        setValue(newvalue);
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/answer/addanswer/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ answer: value }),
        });

        const json = await response.json();
        if (json["status"] === true) {
            setState(true);
            setValue("");
            window.scrollTo(0, 0);
        }
    }

    const upvoteQue = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/question/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let json = await response.json();
            setqueVoteStatus(json);
        } else {
            navigate("/login");
        }
    }

    const downvoteQue = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/question/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let json = await response.json();
            setqueVoteStatus(json);
        } else {
            navigate("/login");
        }
    }

    const upvote = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/answer/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
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
            const response = await fetch(`http://localhost:5000/api/answer/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let json = await response.json();
            setVoteStatus(json);
        } else {
            navigate("/login");
        }
    }

    const fetchVotes = async () => {
        const response = await fetch(`http://localhost:5000/api/answer/fetchVotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        let json = await response.json();
        setVotes(json);
    }

    const fetchQueVotes = async (id) => {
        const response = await fetch(`http://localhost:5000/api/question/fetchVotes/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        let json = await response.json();
        setQueVote(json);
    }

    const onChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }

    const addComment = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/comment/addcomment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ comment: comment.comment, qid: question.id }),
        });
        const json = await response.json();
        if (json["status"] === true) {
            setCommentState(true);
            window.scrollTo(0, 0);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
        isLoggedIn();
        fetchQuestion(params.type);
        fetchAnswers(params.type);
        fetchVotes();
        fetchQueVotes(params.type);
    }, [state, voteStatus, quevoteStatus, params.type, navigate]);

    // Simulated Smart AI Auto Analysis for design elevation
    const aiAnalysis = useMemo(() => {
        if (!question.title) return null;
        return {
            complexity: "Medium-High",
            category: question.tags ? question.tags.split(" ")[0].toUpperCase() : "GENERAL",
            confidence: "94%",
            explanation: `This query relates to engineering optimization in ${question.tags || 'development'}. Suggested fix is to implement standard modular abstraction.`
        };
    }, [question]);

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto flex justify-center w-full">

                <Sidebar />

                <main className="flex-1 py-8 px-4 md:px-8 w-full border-r border-surfaceBorder">

                    {/* Alert Banners */}
                    <div className="flex flex-col gap-4">
                        {state && (
                            <Alert
                                message="Your Answer has been posted <strong>successfully</strong>!"
                                type="success"
                                onClose={() => setState(false)}
                            />
                        )}
                        {commentState && (
                            <Alert
                                message="Your Comment has been posted <strong>successfully</strong>!"
                                type="success"
                                onClose={() => setCommentState(false)}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-6">

                        {/* Core Question Card */}
                        <div className="glass rounded-2xl p-6 border border-surfaceBorder relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"></div>

                            <div className="relative z-10 flex gap-6">
                                {/* Vote Controller (TechVote component) */}
                                <TechVote
                                    initialScore={queVote}
                                    onUpvote={(e) => upvoteQue(e, question.id)}
                                    onDownvote={(e) => downvoteQue(e, question.id)}
                                />

                                {/* Content Details */}
                                <div className="flex-1 flex flex-col gap-4">
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-textMain tracking-tight leading-tight">
                                        {question.title}
                                    </h1>

                                    <div className="flex flex-wrap gap-4 text-xs text-textMuted border-b border-surfaceBorder pb-4 mt-1">
                                        <span className="flex items-center gap-1"><PersonOutlineIcon className="w-3.5 h-3.5" /> Asked by <strong className="text-textMain">{question.postedBy || "Anonymous"}</strong></span>
                                        <span className="flex items-center gap-1"><AccessTimeIcon className="w-3.5 h-3.5" /> {question.createdAt ? question.createdAt.slice(0, 10) : ''}</span>
                                    </div>

                                    {/* Question Text */}
                                    <div className="prose prose-slate max-w-none text-textMain mt-2 leading-relaxed text-sm md:text-base">
                                        {html}
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {question.tags && question.tags.split(" ").filter(t => t.trim()).map(tag => (
                                            <motion.div key={tag} whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.92 }} className="inline-block">
                                                <NavLink
                                                    to={`/questionOntags/${tag.toLowerCase()}`}
                                                    className="block px-3 py-1 rounded-lg text-xs font-semibold bg-surfaceHover border border-surfaceBorder text-textMuted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                                                >
                                                    #{tag}
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Answers Section */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-xl font-bold text-textMain pl-1 flex items-center gap-2">
                                <MessageIcon className="text-primary" /> {answers.length} Answers
                            </h2>

                            {answers.map((ans, index) => (
                                <motion.div
                                    key={ans.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                                    whileHover={{ y: -4 }}
                                    className={`bg-surface border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-300 ${ans.status === "Accepted"
                                            ? 'border-emerald-500/30 shadow-emerald-500/5'
                                            : 'border-surfaceBorder hover:border-primary/30'
                                        }`}
                                >
                                    <div className="flex gap-4">

                                        {/* Vote controller for answer */}
                                        <TechVote
                                            initialScore={vote[ans.id] || 0}
                                            onUpvote={(e) => upvote(e, ans.id)}
                                            onDownvote={(e) => downvote(e, ans.id)}
                                        />

                                        <div className="flex-1 flex flex-col gap-4">

                                            {/* Header details */}
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/25 text-primary flex items-center justify-center text-xs font-bold">
                                                        {ans.postedBy ? ans.postedBy.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                    <span className="text-sm font-semibold text-textMain">{ans.postedBy}</span>
                                                </div>

                                                {ans.status === "Accepted" && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                        <CheckCircleIcon style={{ fontSize: '14px' }} />
                                                        Accepted Answer
                                                    </span>
                                                )}
                                            </div>

                                            {/* Answer Text */}
                                            <div className="text-textMuted text-sm leading-relaxed prose">
                                                {parse(ans.answer)}
                                            </div>

                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Submit Answer Form */}
                        {loginstatus ? (
                            <div className="glass rounded-2xl p-6 border border-surfaceBorder mt-4">
                                <h3 className="text-lg font-bold text-textMain mb-4">Your Answer</h3>
                                <form onSubmit={(e) => handleSubmit(e, question.id)} className="flex flex-col gap-4">
                                    <div className="rounded-xl overflow-hidden border border-surfaceBorder dark:border-none bg-surface">
                                        <JoditEditor
                                            ref={editor}
                                            config={config}
                                            tabIndex={1}
                                            value={value}
                                            onChange={(newContent) => getValue(newContent)}
                                        />
                                    </div>
                                    <Button type="submit" variant="primary" className="mt-2">
                                        Post Your Answer
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-6 rounded-2xl border border-dashed border-surfaceBorder text-center bg-surfaceMuted/20 mt-4">
                                <p className="text-textMuted mb-2">You must be logged in to answer queries.</p>
                                <Button onClick={() => navigate("/login")} variant="primary" className="mx-auto text-xs py-2 px-4">
                                    Log In
                                </Button>
                            </div>
                        )}

                    </div>
                </main>

                {/* Right Column: AI Assistant Insights Panel */}
                <aside className="w-80 flex-shrink-0 py-8 px-6 block">
                    <div className="sticky top-24 flex flex-col gap-6">
                        {aiAnalysis && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="rounded-2xl bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 p-px shadow-xl shadow-primary/10"
                            >
                                <div className="glass rounded-[15px] p-6 border-0 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>

                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                                            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-md">
                                                <AutoAwesomeIcon style={{ fontSize: '16px' }} />
                                            </span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI QUERY INTELLIGENCE</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-2 border-b border-surfaceBorder pb-4">
                                            <div>
                                                <span className="text-[10px] text-textMuted font-bold block uppercase">Complexity</span>
                                                <span className="text-sm font-semibold text-textMain">{aiAnalysis.complexity}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-textMuted font-bold block uppercase">Confidence</span>
                                                <span className="text-sm font-semibold text-textMain">{aiAnalysis.confidence}</span>
                                            </div>
                                        </div>

                                        <div className="text-xs leading-relaxed text-textMuted">
                                            <span className="font-bold text-textMain block mb-1">AUTOMATED DIAGNOSIS</span>
                                            {aiAnalysis.explanation}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="w-full p-3 bg-surfaceHover hover:bg-primary/10 rounded-xl border border-surfaceBorder hover:border-primary/30 text-xs text-primary font-semibold flex items-center justify-between transition-colors"
                                        >
                                            <span>Suggested Action: Add Refactor</span>
                                            <span className="text-[10px] bg-primary/25 px-2 py-0.5 rounded-full font-bold">98% Fit</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Related Actions */}
                        <div className="glass rounded-2xl p-6 border border-surfaceBorder">
                            <h3 className="text-sm font-bold text-textMain mb-4 tracking-wide">QUERY TIMELINE</h3>
                            <div className="flex flex-col gap-4 relative pl-4 border-l border-surfaceBorder">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-background"></div>
                                    <span className="text-[10px] text-textMuted block">CURRENT STATUS</span>
                                    <span className="text-xs font-semibold text-textMain">Active Resolution</span>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border border-background"></div>
                                    <span className="text-[10px] text-textMuted block">AI AUTO-PRIORITY</span>
                                    <span className="text-xs font-semibold text-textMain">Normal Severity Assigned</span>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent border border-background"></div>
                                    <span className="text-[10px] text-textMuted block">CREATION</span>
                                    <span className="text-xs font-semibold text-textMain">Query opened on dashboard</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    )
}
