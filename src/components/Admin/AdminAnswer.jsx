import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileSidebar from './AdminSidebar';
import Pagination from '../Questions/Pagination';
import PostsAns from './PostAns';


export default function Adminanswer() {

    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "", status: "" });

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const [answers, setAnswers] = useState([]);

    // for pagination in Answers in Admin section.
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);


    const fetchAllFilteredAnswers = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchAllFilteredAnswers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags , status:filters.status})

        }).then(response => {
            return response.json();
        }).then(data => setAnswers(data));
    };

    const [usedTags, setUsedTags] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/givenAllAnswersTags/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setUsedTags(data));
    }, []);

    // console.log(usedTags);
    
    useEffect(() => {
        fetchAllFilteredAnswers();
    }, [filters])


    // This function will find the No. of answers given by a User
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUseranswer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => setAnswers(data));
    },[]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = answers.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <ProfileSidebar />
                <div className="flex-1 flex flex-col gap-6 w-full overflow-hidden">
                    <h1 className="text-3xl font-extrabold tracking-tight">Manage Answers</h1>

                    {/* filter based on date , tags and status  */}
                    <div className="glass border border-surfaceBorder rounded-xl p-6 flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="font-bold text-sm text-textMuted uppercase">Filter:</span>
                            <input type="date" name="startDate" onChange={onChange} className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm focus:border-primary/50 text-textMain focus:outline-none" />
                            <span className="text-textMuted font-bold text-sm">TO</span>
                            <input type="date" name="endDate" onChange={onChange} className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm focus:border-primary/50 text-textMain focus:outline-none" />
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <select name="tags" onChange={onChange} className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm focus:border-primary/50 text-textMain focus:outline-none min-w-[120px]">
                                <option value="none" defaultValue hidden>Select Tag</option>
                                {usedTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                            </select>

                            <div className="flex items-center gap-3 bg-surfaceHover px-4 py-1.5 rounded-lg border border-surfaceBorder">
                                <label className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer text-emerald-500">
                                    <input type="radio" name="status" value="Accepted" onChange={onChange} className="accent-emerald-500" />
                                    Accepted
                                </label>
                                <label className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer text-textMuted hover:text-textMain">
                                    <input type="radio" name="status" value="Not Accepted" onChange={onChange} className="accent-primary" />
                                    Pending
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <PostsAns posts={currentPosts} />
                    </div>
                    
                    <div className="flex justify-center mt-4">
                        <Pagination postsPerPage={postPerPage} totalPosts={answers.length} paginate={paginate} />
                    </div>

                </div>
            </div>
        </div>
    )
}

