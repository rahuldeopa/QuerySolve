import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Alert from '../../common/Alert';

export default function Posts({ posts }) {
    const [noOfAns, setnoOfAns] = useState({});
    const [vote, setVotes] = useState({});
    const [state, setState] = useState(false);

    const deleteQue = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/deleteque/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const json = await response.json()

            if (json["status"] === "deleted") {
                setState(true);
                window.scrollTo(0, 0)
                window.location.reload(true);
            }
        }
    }

    const FindFrequencyOfAns = async () => {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/answer/findNumberOfAns", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setnoOfAns(json);
    }

    const fetchVotes = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchallVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let json = await response.json();
        setVotes(json);
    }

    useEffect(() => {
        FindFrequencyOfAns();
        fetchVotes();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {state && (
                <Alert
                    type="success"
                    message="Your question has been deleted <strong>successfully</strong>."
                    onClose={() => setState(false)}
                />
            )}

            <div className="flex flex-col gap-4">
                {posts.map(question => (
                    <div
                        key={question.id}
                        className="group bg-surface border-theme rounded-2xl p-6 shadow-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start"
                    >
                        {/* Stats panel on left */}
                        <div className="flex md:flex-col gap-4 md:gap-2 flex-shrink-0">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/5 text-primary border border-primary/10 text-xs font-semibold">
                                <ThumbUpIcon style={{ fontSize: '14px' }} />
                                <span>{vote[question.id] || 0} votes</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/5 text-accent border border-accent/10 text-xs font-semibold">
                                <ForumIcon style={{ fontSize: '14px' }} />
                                <span>{noOfAns[question.id] || 0} answers</span>
                            </div>
                        </div>

                        {/* Middle Content */}
                        <div className="flex-1 flex flex-col gap-2">
                            <NavLink
                                to={{ pathname: `/answer/${question.id}` }}
                                className="text-lg font-bold text-textMain hover:text-primary transition-all leading-tight"
                            >
                                {question.title}
                            </NavLink>

                            <div className="text-textMuted text-xs line-clamp-2 mt-1 prose prose-slate">
                                {parse(question.question || "")[0]}
                            </div>

                            {/* Tags list */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {question.tags && question.tags.split(" ").filter(t => t.trim()).map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-surfaceHover border-theme text-textMuted"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right / Actions panel */}
                        <div className="flex md:flex-col items-end justify-between md:h-full gap-4 w-full md:w-auto flex-shrink-0">
                            {/* Edit / Delete Buttons */}
                            <div className="flex gap-2">
                                <NavLink
                                    to={{ pathname: `/updateque/${question.id}` }}
                                    className="p-2 rounded-xl bg-surfaceHover border-theme text-textMuted hover:text-primary hover:border-primary/20 transition-all"
                                    title="Edit Question"
                                >
                                    <EditIcon fontSize="small" />
                                </NavLink>
                                <button
                                    onClick={() => deleteQue(question.id)}
                                    className="p-2 rounded-xl bg-surfaceHover border-theme text-textMuted hover:text-rose-500 hover:border-rose-500/20 transition-all"
                                    title="Delete Question"
                                >
                                    <DeleteIcon fontSize="small" />
                                </button>
                            </div>

                            <span className="text-[10px] text-textMuted">
                                asked {question.createdAt.slice(0, 10)}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
