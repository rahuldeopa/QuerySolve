import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import Chart from '../charts/Chart';
import '../MyProfile/Analysis/analysis.css';
import '../Header/header.css';
import '../Questions/questions.css';


export default function AdminAnalysis() {
  //const[questions,setQuestions] = useState([])
 const[NoOfQuestions,setNoofquestion]=useState([])
     const [answer, setAnswer] = useState(0);
    const [accept, setAccept] = useState(0);
    const [user, setUser] = useState(0);

    const [questions, setQuestions] = useState([]);
    const [Tags, setTags] = useState([]);
    const [count, setCount] = useState([]);
   


   
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchquestions`, {
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

        questions.map(question => question.tags.split(" ").map(tag => {
            freqOfTags[tag] = 0;
        }))

        questions.map(question => question.tags.split(" ").map(tag => {
            freqOfTags[tag] = freqOfTags[tag] + 1;
        }))

        // console.log(freqOfTags);

        for (const i in freqOfTags) {
            tag.push(i);
            cnt.push(parseInt(freqOfTags[i]));
        }

        setTags(tag);
        setCount(cnt);

    }, [questions]);

    const navigate = useNavigate()

    const noOfQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/noOfQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setNoofquestion(parseInt(data))
                console.log(data)
            }
            )
            
    }

    const noOfusers =  async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/noOfUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUser(data)
            }
            )
        }
    const noOfAnswers = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/noOfAnswers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAnswer(data)
            }
            )
    }

    const noOfAccept = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/noOfAccept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAccept(data)
            }
            )
    }
    
    const fetchQuestions = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setQuestions(data)
           
            })
    }

   const [january, setJanuary] = useState(0);
const [february, setFebruary] = useState(0);
const [march, setMarch] = useState(0);
const [april, setApril] = useState(0);
const [may, setMay] = useState(0);
const [june, setJune] = useState(0);
const [july, setJuly] = useState(0);
const [august, setAugust] = useState(0);
const [september, setSeptember] = useState(0);
const [october, setOctober] = useState(0);
const [november, setNovember] = useState(0);
const [december, setDecember] = useState(0);
   
useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/question-by-month');
        const data = await response.json();
  
        data.forEach(item => {
          const monthIndex = item._id - 1;
          const count = item.count;
          switch (monthIndex) {
            case 0:
              setJanuary(count);
              break;
            case 1:
              setFebruary(count);
              break;
            case 2:
              setMarch(count);
              break;
            case 3:
              setApril(count);
              break;
            case 4:
              setMay(count);
              break;
            case 5:
              setJune(count);
              break;
            case 6:
              setJuly(count);
              break;
            case 7:
              setAugust(count);
              break;
            case 8:
              setSeptember(count);
              break;
            case 9:
              setOctober(count);
              break;
            case 10:
              setNovember(count);
              break;
            case 11:
              setDecember(count);
              break;
            default:
              break;
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  const[twentyone,setTwentyone]=useState(0);
  const[twentytwo,setTwentytwo]=useState(0);
  const[twentythree,setTwentythree]=useState(0);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admin/question-by-year');
            const data = await response.json();
            data.forEach(item => {
                const yearIndex = item._id - 2021;
                const count = item.count;
                switch (yearIndex) {
                    case 0:
                        setTwentyone(count);
                        break;
                    case 1:
                        setTwentytwo(count);
                        break;
                    case 2:
                        setTwentythree(count);
                        break;
                    default:
                        break;
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
}, []);


  
            

   

    useEffect(() => {
        noOfusers();
        noOfQuestions();
        noOfAnswers();
        noOfAccept();
       
    }, [])
    
    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <AdminSidebar />
                <div className="flex-1 flex flex-col gap-6 w-full overflow-hidden">
                    <h1 className="text-3xl font-extrabold tracking-tight">Platform Analysis</h1>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div className="glass border border-surfaceBorder rounded-2xl p-6 hover:shadow-lg transition-all min-w-[300px] overflow-hidden">
                            <Chart title="Overall Platform Data" count={[user,NoOfQuestions,answer,accept]} Tags={["Users","Questions","Answers","Accepted"]} />
                        </div>
                        <div className="glass border border-surfaceBorder rounded-2xl p-6 hover:shadow-lg transition-all min-w-[300px] overflow-hidden">
                            <Chart title="Questions Distribution by Tag" count={count} Tags={Tags} />
                        </div>  
                        <div className="glass border border-surfaceBorder rounded-2xl p-6 hover:shadow-lg transition-all min-w-[300px] overflow-hidden">
                            <Chart title="Questions by Month" count={[january,february,march,april,may,june,july,august,september,october,november,december]} Tags={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]} />
                        </div>
                        <div className="glass border border-surfaceBorder rounded-2xl p-6 hover:shadow-lg transition-all min-w-[300px] overflow-hidden">
                            <Chart title="Questions by Year" count={[twentyone,twentytwo,twentythree]} Tags={["2021","2022","2023"]} />
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
}
