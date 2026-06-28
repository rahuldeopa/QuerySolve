import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Posts({ posts }) {

    const [vote, setVotes] = useState({});

    const fetchVotes = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await response.json();
        setVotes(json);

    }

    const deleteAns = async(id)=>{
        if (window.confirm("Are you sure you want to delete this response?")) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/deleteans/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const json = await response.json()

            if (json["status"] === "deleted") {
                window.scrollTo(0, 0)
                window.location.reload(true);
            }
        }
    }

    useEffect(() => {
        fetchVotes();
    }, [])

    return (
        <div className="flex flex-col gap-4">
            {posts.map(answer => (
                <div
                    key={answer.id}
                    className="group bg-surface border border-surfaceBorder rounded-2xl p-6 shadow-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start"
                >
                    {/* Stats Panel */}
                    <div className="flex md:flex-col gap-4 flex-shrink-0">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/5 text-primary border border-primary/10 text-xs font-semibold">
                            <ThumbUpIcon style={{ fontSize: '14px' }} />
                            <span>{vote[answer.id] || 0} votes</span>
                        </div>
                        {answer.status === "Accepted" && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold">
                                <CheckCircleIcon style={{ fontSize: '14px' }} />
                                <span>Accepted</span>
                            </div>
                        )}
                    </div>

                    {/* Middle Content */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <NavLink 
                                to={{ pathname: `/question/${answer.questionid}` }} 
                                className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                            >
                                Go to Question &rarr;
                            </NavLink>
                        </div>

                        <div className="text-textMuted text-sm mt-2 prose prose-slate">
                            {parse(answer.answer || "")}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex md:flex-col items-end justify-between md:h-full gap-4 w-full md:w-auto flex-shrink-0">
                        <div className="flex gap-2">
                            <NavLink 
                                to={{ pathname: `/updateans/${answer.id}` }}
                                className="p-2 rounded-xl bg-surfaceHover border border-surfaceBorder text-textMuted hover:text-primary hover:border-primary/20 transition-all"
                                title="Edit Response"
                            >
                                <EditIcon fontSize="small" />
                            </NavLink>
                            <button 
                                onClick={() => deleteAns(answer.id)}
                                className="p-2 rounded-xl bg-surfaceHover border border-surfaceBorder text-textMuted hover:text-rose-500 hover:border-rose-500/20 transition-all"
                                title="Delete Response"
                            >
                                <DeleteIcon fontSize="small" />
                            </button>
                        </div>

                        <span className="text-[10px] text-textMuted">
                            responded by {answer.postedBy}
                        </span>
                    </div>

                </div>
            ))}
        </div>
    )
}
