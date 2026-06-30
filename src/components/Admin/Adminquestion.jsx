import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import '../Questions/questions.css';
import '../Header/header.css';
import AdminSidebar from './AdminSidebar';
import Pagination from '../MyProfile/MyQuestions/Pagination';
import ProfileSidebar from './AdminSidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function Adminquestion() {

    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "" });

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }
   
    const [questions, setQuestions] = useState([])

    const [noOfAns, setnoOfAns] = useState({});
    const [vote, setVotes]  = useState({});
    const [usedTags, setUsedTags] = useState([]);
     // for pagination in questions in profile
     const [postPerPage] = useState(4);
     const [currentPage, setcurrentPage] = useState(1);
     const [filteredQue, setFilteredQue] = useState([]);
     const [searchQuery, setSearchQuery] = useState("");

     const indexOfLastPost = currentPage * postPerPage;
     const indexOfFirstPost = indexOfLastPost - postPerPage;
     const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);
 
     const paginate = pageNum => setcurrentPage(pageNum);
    
    const fetchAllFilteredQuestions = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchUserFilteredQuestions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags })

        });
        const data = await response.json();
        setQuestions(data);
        setFilteredQue(data);
    };
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/usedtags`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setUsedTags(data));
    }, []);
    
    useEffect(() => {
        fetchAllFilteredQuestions();
    }, [filters])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchquestions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    },[]);


      // This function will find the count of No. of answer for a perticular Question
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

    const fetchAllQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/question/fetchquestions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }




    
    const fetchVotes = async()=>{

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchallVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await response.json();
        setVotes(json);

    }

    const deleteQuestion = async (id) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/deleteque/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // fetchQuestions()
            window.location.reload();
            return response.json()
        })
        const data = await response.json()
        if (data.status === 'success') {
            // fetchQuestions()
        }
    }

    useEffect(() => {
        // fetchAllQuestions();
        FindFrequencyOfAns();
        fetchVotes();
        fetchAllQuestions();
    }, [])

    const searchHandler = (searchQuery) => {
        setSearchQuery(searchQuery.target.value);
        const filteredData = questions.filter((question) => {
            return question.title.toLowerCase().includes(searchQuery.target.value.toLowerCase());
        });
        setFilteredQue(filteredData);
    };

   
    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <AdminSidebar />
                <div className="flex-1 flex flex-col gap-6 w-full overflow-hidden">
                    <h1 className="text-3xl font-extrabold tracking-tight">Manage Questions</h1>
                    
                    {/* Filters & Search */}
                    <div className="glass border border-surfaceBorder rounded-xl p-6 flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="font-bold text-sm text-textMuted uppercase">Filter:</span>
                            <input type="date" name="startDate" onChange={onChange} className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm text-textMain focus:outline-none focus:border-primary/50" />
                            <span className="text-textMuted text-sm font-bold">TO</span>
                            <input type="date" name="endDate" onChange={onChange} className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm text-textMain focus:outline-none focus:border-primary/50" />
                            
                            <select name="tags" onChange={onChange} className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm text-textMain focus:outline-none focus:border-primary/50 ml-auto">
                                <option value="none" defaultValue hidden>Select Tag</option>
                                {usedTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                            </select>
                        </div>
                        
                        <input 
                            type="text" 
                            className="w-full bg-surfaceHover border border-surfaceBorder rounded-lg px-4 py-2 text-sm text-textMain focus:outline-none focus:border-primary/50" 
                            placeholder="Search question titles..." 
                            onChange={searchHandler} 
                        />
                    </div>

                    {/* Questions List */}
                    <div className="flex flex-col gap-4">
                        {filteredQue.map(question => (
                            <div key={question.id} className="glass border border-surfaceBorder rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start hover:shadow-lg transition-shadow">
                                <div className="flex-1 flex flex-col gap-2">
                                    <NavLink to={`/question/${question.id}`} className="text-lg font-bold text-textMain hover:text-primary transition-colors">
                                        {question.title}
                                    </NavLink>
                                    
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {question.tags.split(" ").filter(t => t.trim()).map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded border border-surfaceBorder text-xs text-textMuted bg-surfaceHover">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="text-xs text-textMuted mt-2">
                                        Asked {question.createdAt.slice(0, 10)} by <span className="text-primary font-semibold">{question.postedBy}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:items-end gap-3 min-w-[120px]">
                                    <div className="text-xs font-bold text-textMuted bg-surfaceHover px-3 py-1 rounded-lg border border-surfaceBorder text-center">
                                        {noOfAns[question.id] || 0} Answers
                                    </div>
                                    <button onClick={() => deleteQuestion(question.id)} className="w-full px-3 py-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors flex items-center justify-center gap-1">
                                        <DeleteIcon style={{ fontSize: '14px' }} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


}
