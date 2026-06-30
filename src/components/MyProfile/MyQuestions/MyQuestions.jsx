import React, { useEffect, useState } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Posts from './Posts';
import Pagination from './Pagination';

export default function MyQuestions() {
    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "" });
    const [questions, setQuestions] = useState([]);
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [usedTags, setUsedTags] = useState([]);

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const fetchAllFilteredQuestions = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchUserFilteredQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags })
        }).then(response => response.json()).then(data => setQuestions(data));
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/usedtags/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setUsedTags(data));
    }, []);

    useEffect(() => {
        fetchAllFilteredQuestions();
    }, [filters]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(data => setQuestions(data));
    }, []);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <ProfileSidebar />
                
                <div className="flex-1 flex flex-col gap-6">
                    <ProfileHeader />

                    {/* Filter card */}
                    <div className="glass border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-bold text-textMain">Filter Range:</span>
                        
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

                        <div className="flex items-center gap-2 ml-auto">
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
                    </div>

                    {/* Questions Listing */}
                    <div className="flex flex-col gap-4">
                        <Posts posts={currentPosts} />
                    </div>

                    {/* Pagination */}
                    {questions.length > postPerPage && (
                        <div className="mt-4">
                            <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
