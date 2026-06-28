import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';

const config = {
    readonly: false,
    buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};

export default function UpdateQuestion() {
    const params = useParams();
    const editor = useRef(null);
    const [value, setValue] = useState("");
    const [state, setState] = useState(false);
    const [credentials, setCredentials] = useState({ title: "", tags: "" });
    const [question, setQuestion] = useState([]);

    const fetchQuestion = async (id) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/fetchQueById/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then((data) => {
            setQuestion(data);
            setCredentials(data);
            setValue(data.question || "");
        });
    }

    const updateQue = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/updateque/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: credentials.title, question: value, tags: credentials.tags }),
        });

        let json = await response.json();
        if (json.status === "updated") {
            setState(true);
            window.scrollTo(0, 0);
        }
    }

    const getValue = (newVal) => {
        setValue(newVal);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchQuestion(params.type);
    }, [params.type]);

    return (
        <div className="min-h-screen bg-background text-textMain py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 flex flex-col gap-8">
                
                {state && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-between shadow-lg">
                        <span>Your query was updated <strong>successfully</strong>!</span>
                        <button onClick={() => setState(false)} className="text-emerald-400 hover:text-white font-bold">&times;</button>
                    </div>
                )}

                {/* Guide Panel */}
                <div className="glass rounded-2xl p-6 border border-surfaceBorder relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider">EDIT SYSTEM</span>
                    <h2 className="text-2xl font-black text-textMain mt-1">Update Public Query</h2>
                    <p className="text-textMuted text-xs mt-2 max-w-xl leading-relaxed">
                        Refine your question to make it clearer for the community. Better formulated queries get faster, higher-quality solutions.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-surfaceBorder">
                        <div className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                            <p className="text-xs text-textMuted leading-relaxed">Summarize the core technical challenge in one clear line.</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                            <p className="text-xs text-textMuted leading-relaxed">Include code snippets, stack trace logs, or expected outputs.</p>
                        </div>
                    </div>
                </div>

                {/* Form fields */}
                <form onSubmit={(e) => updateQue(e, question.id)} className="flex flex-col gap-6">
                    <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-col gap-2">
                        <label className="text-sm font-bold text-textMain">Query Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            onChange={onChange} 
                            value={credentials.title} 
                            placeholder="e.g. How to handle state updates in React concurrent mode?"
                            className="bg-surfaceHover border border-surfaceBorder rounded-xl px-4 py-3 text-sm text-textMain focus:outline-none focus:border-primary/50 transition-all placeholder:text-textMuted/50"
                        />
                        <span className="text-[10px] text-textMuted">Be specific and imagine you are searching for your own problem.</span>
                    </div>

                    {/* Rich text editor wrapper */}
                    <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-col gap-2">
                        <label className="text-sm font-bold text-textMain mb-2">Detailed Context</label>
                        <div className="border border-surfaceBorder rounded-xl overflow-hidden text-black">
                            <JoditEditor
                                ref={editor}
                                value={credentials.question || ""}
                                config={config}
                                tabIndex={1}
                                onChange={getValue}
                            />
                        </div>
                    </div>

                    <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-col gap-2">
                        <label className="text-sm font-bold text-textMain">Tags</label>
                        <input 
                            type="text" 
                            name="tags" 
                            onChange={onChange} 
                            value={credentials.tags} 
                            placeholder="e.g. react js frontend"
                            className="bg-surfaceHover border border-surfaceBorder rounded-xl px-4 py-3 text-sm text-textMain focus:outline-none focus:border-primary/50 transition-all placeholder:text-textMuted/50"
                        />
                        <span className="text-[10px] text-textMuted">Space separated keywords to categorize the query.</span>
                    </div>

                    <div className="flex gap-4 items-center">
                        <button 
                            type="submit" 
                            className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primaryHover hover:shadow-lg hover:shadow-primary/20 transition-all"
                        >
                            Update Query
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
