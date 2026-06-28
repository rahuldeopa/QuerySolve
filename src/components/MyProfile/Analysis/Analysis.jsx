import React, { useState, useEffect } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import Chart from "../../charts/Chart";

export default function Analysis() {
    const [filters, setFilters] = useState({ startDate: "", endDate: "" });
    const [questions, setQuestions] = useState([]);
    const [Tags, setTags] = useState([]);
    const [count, setCount] = useState([]);
    const [queLen, setQueLen] = useState(0);

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setQuestions(data));
    }, [])

    useEffect(() => {
        const freqOfTags = [];
        const tag = [];
        const cnt = [];

        if (filters.startDate && filters.endDate) {
            let cntVal = 0;
            questions.forEach(question => {
                if (question.createdAt.substring(0, 10) >= filters.startDate && question.createdAt.substring(0, 10) <= filters.endDate) {
                    cntVal++;
                    question.tags.split(" ").forEach(tag => {
                        freqOfTags[tag] = 0;
                    })
                }
            })

            questions.forEach(question => {
                if (question.createdAt.substring(0, 10) >= filters.startDate && question.createdAt.substring(0, 10) <= filters.endDate)
                    question.tags.split(" ").forEach(tag => {
                        freqOfTags[tag] = freqOfTags[tag] + 1;
                    })
            })

            setQueLen(cntVal);
        }
        else {
            questions.forEach(question =>
                question.tags.split(" ").forEach(tag => {
                    freqOfTags[tag] = 0;
                })
            )

            questions.forEach(question =>
                question.tags.split(" ").forEach(tag => {
                    freqOfTags[tag] = freqOfTags[tag] + 1;
                })
            )
            setQueLen(questions.length);
        }

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
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUserAcceptedAnsweredQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setAcceptedAnsweredQues(data));
    }, []);

    useEffect(() => {
        const ac_ans_freqOfTags = [];
        const ac_ans_tag = [];
        const ac_ans_cnt = [];

        if (filters.startDate && filters.endDate) {
            let cntVal = 0;
            acceptedansweredQues.forEach(ques => {
                const tags = ques[0].tags;
                if (ques[0].createdAt.substring(0, 10) >= filters.startDate && ques[0].createdAt.substring(0, 10) <= filters.endDate) {
                    cntVal++;
                    tags.split(" ").forEach(tag =>
                        ac_ans_freqOfTags[tag] = 0
                    )
                }
            })

            acceptedansweredQues.forEach(ques => {
                const tags = ques[0].tags;
                if (ques[0].createdAt.substring(0, 10) >= filters.startDate && ques[0].createdAt.substring(0, 10) <= filters.endDate)
                    tags.split(" ").forEach(tag =>
                        ac_ans_freqOfTags[tag] = ac_ans_freqOfTags[tag] + 1
                    )
            })

            setactAnsLen(cntVal);
        }
        else {
            acceptedansweredQues.forEach(ques => {
                const tags = ques[0].tags;
                tags.split(" ").forEach(tag =>
                    ac_ans_freqOfTags[tag] = 0
                )
            })

            acceptedansweredQues.forEach(ques => {
                const tags = ques[0].tags;
                tags.split(" ").forEach(tag =>
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
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answer/fetchUserAnsweredQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => setAnsweredQues(data));
    }, []);

    useEffect(() => {
        const ans_freqOfTags = [];
        const ans_tag = [];
        const ans_cnt = [];

        if (filters.startDate && filters.endDate) {
            let cntVal = 0;
            answeredQues.forEach(ques => {
                const tags = ques[0].tags;
                if (ques[0].createdAt.substring(0, 10) >= filters.startDate && ques[0].createdAt.substring(0, 10) <= filters.endDate) {
                    cntVal++;
                    tags.split(" ").forEach(tag =>
                        ans_freqOfTags[tag] = 0
                    )
                }
            })

            answeredQues.forEach(ques => {
                const tags = ques[0].tags;
                if (ques[0].createdAt.substring(0, 10) >= filters.startDate && ques[0].createdAt.substring(0, 10) <= filters.endDate)
                    tags.split(" ").forEach(tag =>
                        ans_freqOfTags[tag] = ans_freqOfTags[tag] + 1
                    )
            })

            setansLen(cntVal);
        }
        else {
            answeredQues.forEach(ques => {
                const tags = ques[0].tags;
                tags.split(" ").forEach(tag =>
                    ans_freqOfTags[tag] = 0
                )
            })

            answeredQues.forEach(ques => {
                const tags = ques[0].tags;
                tags.split(" ").forEach(tag =>
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
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <ProfileSidebar />
                
                <div className="flex-1 flex flex-col gap-6">
                    <ProfileHeader />

                    {/* Date filter card */}
                    <div className="glass border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-bold text-textMain">Analysis Period:</span>
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

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Chart 
                            title={`Questions Asked: ${queLen} total`} 
                            count={count} 
                            Tags={Tags} 
                        />
                        <Chart 
                            title={`Answers Given: ${ansLen} total`} 
                            count={Anscount} 
                            Tags={AnsTags} 
                        />
                        <div className="lg:col-span-2">
                            <Chart 
                                title={`Accepted Answers: ${actAnsLen} total`} 
                                count={AcAnscount} 
                                Tags={AcAnsTags} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
