
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

import Pagination from './Pagination';
import Posts from './Posts';

export default function QuestionOnTags() {

    const params = useParams();

    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    // for questions
    const [questions, setQuestions] = useState([])

    // for tag Description
    const [tagdescription, settagdesc] = useState({});

    const fetchQue = async (tagname) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchQuePertag/${tagname}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))

    }

    const tagDesc = async (tagname) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tag/tagdesc/${tagname}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            settagdesc(data)
        });
    }

    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => {
        setcurrentPage(pageNum);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        fetchQue(params.type);
        tagDesc(params.type);
    }, [questions])

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row w-full">
                <Sidebar />

                <main className="flex-1 py-8 px-4 lg:px-8 w-full border-none lg:border-r border-surfaceBorder overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-extrabold text-textMain tracking-tight">Tag: {params.type}</h1>
                            <p className="text-textMuted font-medium text-sm">{tagdescription.desc}</p>
                            <p className="text-textMuted font-medium text-sm">Total {questions.length} Questions</p>
                        </div>
                        <NavLink to="/editor" className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105">
                            Ask Question
                        </NavLink>
                    </div>

                    <div className="mb-8">
                        <Posts posts={currentPosts} />
                    </div>
                    <div className="flex justify-center pb-8">
                        <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                    </div>
                </main>
            </div>
        </div>
    )
}
