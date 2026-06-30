import React, { useEffect, useState } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import PostsAns from './PostsAns';
import Pagination from '../../Questions/Pagination';

export default function MyAnswers() {
    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "", status: "" });
    const [answers, setAnswers] = useState([]);
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [usedTags, setUsedTags] = useState([]);

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const fetchAllFilteredAnswers = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUserFilteredAnswers/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags , status:filters.status})
        }).then(response => response.json()).then(data => setAnswers(data));
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/givenAnswersTags/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setUsedTags(data));
    }, []);

    useEffect(() => {
        fetchAllFilteredAnswers();
    }, [filters]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUserAnswers/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setAnswers(data));
    }, []);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = answers.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <ProfileSidebar />
                
                <div className="flex-1 flex flex-col gap-6">
                    <ProfileHeader />

                    {/* Filter Card */}
                    <div className="glass border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="font-bold text-textMain">Date Range:</span>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="date" 
                                    name="startDate" 
                                    onChange={onChange} 
                                    className="bg-surfaceHover border border-surfaceBorder rounded-xl px-3 py-2 text-xs text-textMain focus:outline-none focus:border-primary/50"
                                />
                                <span className="text-textMuted text-xs">to</span>
                                <input 
                                    type="date" 
                                    name="endDate" 
                                    onChange={onChange} 
                                    className="bg-surfaceHover border border-surfaceBorder rounded-xl px-3 py-2 text-xs text-textMain focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-textMuted text-xs font-medium">Tag:</span>
                            <select 
                                name="tags" 
                                onChange={onChange} 
                                className="bg-surfaceHover border border-surfaceBorder rounded-xl px-3 py-2 text-xs text-textMain focus:outline-none focus:border-primary/50"
                            >
                                <option value="none" disabled hidden selected>select tag</option>
                                {usedTags.map(tag => (
                                    <option key={tag} value={tag}>#{tag}</option>
                                ))}
                            </select>
                        </div>

                        {/* Custom Styled Status Filter Radio/Pills */}
                        <div className="flex items-center gap-3 ml-auto">
                            <span className="text-textMuted text-xs font-medium">Status:</span>
                            <div className="flex bg-surfaceHover border border-surfaceBorder rounded-xl p-0.5">
                                <label className="relative flex items-center justify-center px-3 py-1 text-xs cursor-pointer select-none">
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Accepted" 
                                        onChange={onChange}
                                        className="sr-only peer"
                                    />
                                    <span className="text-textMuted peer-checked:text-primary peer-checked:font-bold transition-all">Accepted</span>
                                </label>
                                <label className="relative flex items-center justify-center px-3 py-1 text-xs cursor-pointer select-none border-l border-surfaceBorder">
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Not Accepted" 
                                        onChange={onChange}
                                        className="sr-only peer"
                                    />
                                    <span className="text-textMuted peer-checked:text-primary peer-checked:font-bold transition-all">Not Accepted</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Answers list */}
                    <div className="flex flex-col gap-4">
                        <PostsAns posts={currentPosts} />
                    </div>

                    {/* Pagination */}
                    {answers.length > postPerPage && (
                        <div className="mt-4">
                            <Pagination postsPerPage={postPerPage} totalPosts={answers.length} paginate={paginate} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
