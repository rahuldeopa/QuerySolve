import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
// import parse from 'html-react-parser';
import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
import { FilterList } from '@mui/icons-material';
import '../Header/header.css';
import Posts from './Posts';
import Pagination from './Pagination';

export default function Search() {

    const location = useLocation();
    // const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);



    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    //for pop-up of filter...
    // const [showFilter, setShowFilter] = useState(false);

    // fetch all the questions
    // const fetchAllQuestions = async () => {
    //     await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/fetchquestions", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => setQuestions(data))
    // }




    // Function to sort questions by higher votes question displays first
    const sortByVotes = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/fetchQueByHigherVotes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    // Function to filter all the questions which are answered.

    const answeredQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/answeredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    const unansweredQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/unansweredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    useEffect(() => {

        if (location.state !== null) {
            setQuestions(location.state);
        }

    })
    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row w-full">
                <Sidebar />
                <main className="flex-1 py-8 px-4 md:px-8 w-full border-none lg:border-r border-surfaceBorder overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-extrabold text-textMain tracking-tight">Search Results</h1>
                            <p className="text-textMuted font-medium text-sm">{questions.length} Questions Found</p>
                        </div>
                        <NavLink to="/editor" className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105">
                            Ask Question
                        </NavLink>
                    </div>

                    <div className="flex bg-surface p-1 rounded-xl shadow-sm gap-1 relative z-0 w-full overflow-x-auto no-scrollbar mb-6">
                        <button onClick={answeredQuestions} className="px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 text-textMuted hover:text-textMain hover:bg-surfaceHover/50">Answered</button>
                        <button onClick={sortByVotes} className="px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 text-textMuted hover:text-textMain hover:bg-surfaceHover/50">Votes</button>
                        <button onClick={unansweredQuestions} className="px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 text-textMuted hover:text-textMain hover:bg-surfaceHover/50">Unanswered</button>
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
