import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UserAvatar from '../common/UserAvatar';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ConfirmModal from '../common/ConfirmModal';

export default function PostsAns({ posts }) {
    const [vote, setVotes] = useState({});
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

    useEffect(() => {
        fetchVotes();
    }, []);

    const fetchVotes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchVotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let json = await response.json();
            setVotes(json);
        } catch (error) {
            console.error("Error fetching votes:", error);
        }
    }

    const deleteAnswer = async (id) => {
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteanswer/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.status === 'success' || data.status === 'deleted' || response.ok) {
                alert("Answer deleted successfully. Please refresh the page to see changes.");
            }
        } catch (error) {
            console.error("Error deleting answer:", error);
            alert("Failed to delete answer.");
        }
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="glass border border-surfaceBorder rounded-2xl p-8 text-center text-textMuted">
                No answers found for the current filters.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {posts.map(answer => (
                <div key={answer.id} className="glass border border-surfaceBorder rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start hover:shadow-lg transition-shadow">
                    
                    {/* Left side: Content */}
                    <div className="flex-1 flex flex-col min-w-0 gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold border border-primary/20">
                                <UserAvatar username={answer.postedBy} className="w-4 h-4 text-[9px]" />
                                {answer.postedBy}
                            </span>
                            {answer.createdAt && (
                                <span className="text-xs text-textMuted flex items-center gap-1">
                                    <AccessTimeIcon style={{ fontSize: '14px' }} />
                                    {new Date(answer.createdAt).toLocaleDateString()}
                                </span>
                            )}
                            {answer.status === "Accepted" && (
                                <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-xs font-bold border border-emerald-500/20">
                                    Accepted
                                </span>
                            )}
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none text-textMain line-clamp-4 bg-surfaceHover/30 p-4 rounded-xl border border-surfaceBorder">
                            {parse(answer.answer || "")}
                        </div>
                    </div>

                    {/* Right side: Stats & Actions */}
                    <div className="flex flex-col sm:items-end gap-3 min-w-[120px]">
                        <div className="flex sm:flex-col items-center sm:items-end gap-2">
                            <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 w-full justify-center sm:justify-end">
                                <ThumbUpOutlinedIcon style={{ fontSize: '14px' }} /> {vote[answer.id] || 0} Votes
                            </div>
                            <div className="text-xs font-bold text-textMuted bg-surfaceHover px-3 py-1 rounded-lg border border-surfaceBorder w-full text-center sm:text-right">
                                0 Views
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full mt-auto sm:mt-2">
                            <NavLink 
                                to={`/question/${answer.questionId || answer.questionid}`}
                                className="w-full px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                                <OpenInNewIcon style={{ fontSize: '14px' }} /> View Question
                            </NavLink>
                            <button 
                                onClick={() => setConfirmModal({ isOpen: true, id: answer.id })}
                                className="w-full px-3 py-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                                <DeleteIcon style={{ fontSize: '14px' }} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, id: null })}
                onConfirm={() => deleteAnswer(confirmModal.id)}
                title="Delete Answer"
                message="Are you sure you want to permanently delete this answer? This action cannot be undone."
                confirmText="Delete Answer"
                isDanger={true}
            />
        </div>
    );
}
