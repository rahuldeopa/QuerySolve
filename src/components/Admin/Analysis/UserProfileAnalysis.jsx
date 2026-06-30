import React, { useState, useEffect } from "react";
import Chart from '../../charts/Chart';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UserProfileAnalysis() {
    const params = useParams();
    const navigate = useNavigate();
    let username = params.username;

    const [filters, setFilters] = useState({ startDate: "", endDate: "" });

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    //for fetching tags of asked questions.
    const [questions, setQuestions] = useState([]);
    const [Tags, setTags] = useState([]);
    const [count, setCount] = useState([]);
    const [queLen, setQueLen] = useState(0);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchUserQuestions/${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    }, [])


    useEffect(() => {
        const freqOfTags = [];
        const tag = [];
        const cnt = [];

        if (filters.startDate && filters.endDate) {
            let cnt = 0;
            questions.map(question => {
                // console.log(question.createdAt.substring(0, 10));
                if (question.createdAt.substring(0, 10) >= filters.startDate && question.createdAt.substring(0, 10) <= filters.endDate) {
                    cnt++;
                    question.tags.split(" ").map(tag => {
                        freqOfTags[tag] = 0;
                    })
                }
            })

            questions.map(question => {
                if (question.createdAt.substring(0, 10) >= filters.startDate && question.createdAt.substring(0, 10) <= filters.endDate)
                    question.tags.split(" ").map(tag => {
                        freqOfTags[tag] = freqOfTags[tag] + 1;
                    })
            })

            setQueLen(cnt);
        }
        else {
            questions.map(question =>
                question.tags.split(" ").map(tag => {
                    freqOfTags[tag] = 0;
                })
            )

            questions.map(question =>
                question.tags.split(" ").map(tag => {
                    freqOfTags[tag] = freqOfTags[tag] + 1;
                })
            )
            setQueLen(questions.length);
        }

        // console.log(freqOfTags);

        for (const i in freqOfTags) {
            tag.push(i);
            cnt.push(parseInt(freqOfTags[i]));
        }

        setTags(tag);
        setCount(cnt);

    }, [questions, filters]);

    //for fetching tags of accepted answered question.
    const [acceptedansweredQues, setAcceptedAnsweredQues] = useState([]);
    const [AcAnsTags, setAcAnsTags] = useState([]);
    const [AcAnscount, setAcAnsCount] = useState([]);
    const [actAnsLen, setactAnsLen] = useState(0);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUserAcceptedAnsweredQuestions/${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setAcceptedAnsweredQues(data));
    }, []);

    useEffect(() => {
        // console.log(answers);
        const ac_ans_freqOfTags = [];
        const ac_ans_tag = [];
        const ac_ans_cnt = [];

         if (filters.startDate && filters.endDate) {
            let cnt = 0;
            acceptedansweredQues.map(ques => {
                const tags = ques?.tags || "";
                if (ques?.createdAt?.substring(0, 10) >= filters.startDate && ques?.createdAt?.substring(0, 10) <= filters.endDate) {
                    cnt++;
                    tags.split(" ").map(tag =>
                        ac_ans_freqOfTags[tag] = 0
                    )
                }
            })

            acceptedansweredQues.map(ques => {
                const tags = ques?.tags || "";
                if (ques?.createdAt?.substring(0, 10) >= filters.startDate && ques?.createdAt?.substring(0, 10) <= filters.endDate)
                    tags.split(" ").map(tag =>
                        ac_ans_freqOfTags[tag] = ac_ans_freqOfTags[tag] + 1
                    )
            })

            setactAnsLen(cnt);
        }
        else {
            acceptedansweredQues.map(ques => {
                const tags = ques?.tags || "";
                tags.split(" ").map(tag =>
                    ac_ans_freqOfTags[tag] = 0
                )
            })

            acceptedansweredQues.map(ques => {
                const tags = ques?.tags || "";
                tags.split(" ").map(tag =>
                    ac_ans_freqOfTags[tag] = ac_ans_freqOfTags[tag] + 1
                )
            })
            setactAnsLen(acceptedansweredQues.length);
        }

        for (const i in ac_ans_freqOfTags) {
            ac_ans_tag.push(i);
            ac_ans_cnt.push(parseInt(ac_ans_freqOfTags[i]));
        }

        setAcAnsTags(ac_ans_tag);
        setAcAnsCount(ac_ans_cnt);

    }, [acceptedansweredQues, filters]);

    //for fetching tags of answered questions
    const [answeredQues, setAnsweredQues] = useState([]);
    const [AnsTags, setAnsTags] = useState([]);
    const [Anscount, setAnsCount] = useState([]);
    const [ansLen, setansLen] = useState(0);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUserAnsweredQuestions/${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setAnsweredQues(data));
    }, []);

    useEffect(() => {
        // console.log(answeredQues);
        const ans_freqOfTags = [];
        const ans_tag = [];
        const ans_cnt = [];

        if (filters.startDate && filters.endDate) {
            let cnt = 0;
            answeredQues.map(ques => {
                const tags = ques?.tags || "";
                if (ques?.createdAt?.substring(0, 10) >= filters.startDate && ques?.createdAt?.substring(0, 10) <= filters.endDate) {
                    cnt++;
                    tags.split(" ").map(tag =>
                        ans_freqOfTags[tag] = 0
                    )
                }
            })

            answeredQues.map(ques => {
                const tags = ques?.tags || "";
                if (ques?.createdAt?.substring(0, 10) >= filters.startDate && ques?.createdAt?.substring(0, 10) <= filters.endDate)
                    tags.split(" ").map(tag =>
                        ans_freqOfTags[tag] = ans_freqOfTags[tag] + 1
                    )
            })

            setansLen(cnt);
        }
        else {
            answeredQues.map(ques => {
                const tags = ques?.tags || "";
                tags.split(" ").map(tag =>
                    ans_freqOfTags[tag] = 0
                )
            })

            answeredQues.map(ques => {
                const tags = ques?.tags || "";
                tags.split(" ").map(tag =>
                    ans_freqOfTags[tag] = ans_freqOfTags[tag] + 1
                )
            })
            setansLen(answeredQues.length);
        }

        for (const i in ans_freqOfTags) {
            ans_tag.push(i);
            ans_cnt.push(parseInt(ans_freqOfTags[i]));
        }

        setAnsTags(ans_tag);
        setAnsCount(ans_cnt);

    }, [answeredQues, filters]);

    return (
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl bg-surface border border-surfaceBorder text-textMuted hover:text-primary hover:border-primary/30 transition-all duration-300"
                    >
                        <ArrowBackIcon />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Analysis: {username}
                        </h1>
                        <p className="text-textMuted text-sm mt-1">Detailed performance and activity metrics</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="glass p-3 rounded-2xl border border-surfaceBorder flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-textMuted">From</span>
                        <input 
                            type="date" 
                            name="startDate" 
                            onChange={onChange} 
                            className="bg-surface border border-surfaceBorder text-textMain text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-textMuted">To</span>
                        <input 
                            type="date" 
                            name="endDate" 
                            onChange={onChange} 
                            className="bg-surface border border-surfaceBorder text-textMain text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary/50"
                        />
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="glass rounded-2xl border border-surfaceBorder p-6 hover:border-primary/30 transition-colors duration-300">
                    <Chart title={`${queLen} Questions Asked`} count={count} Tags={Tags} />
                </div>
                <div className="glass rounded-2xl border border-surfaceBorder p-6 hover:border-primary/30 transition-colors duration-300">
                    <Chart title={`${ansLen} Answers Provided`} count={Anscount} Tags={AnsTags} />
                </div>
            </div>
            
            <div className="glass rounded-2xl border border-surfaceBorder p-6 hover:border-primary/30 transition-colors duration-300 w-full lg:w-2/3 mx-auto">
                <Chart title={`${actAnsLen} Answers Accepted`} count={AcAnscount} Tags={AcAnsTags} />
            </div>
        </div>
    );
}
