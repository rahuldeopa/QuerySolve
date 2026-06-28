import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { useNavigate } from 'react-router-dom';

const config = {
    readonly: false,
    buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};

export default function Editor(props) {
    const editor = useRef(null);
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [html, setHtml] = useState("");
    const [state, setState] = useState(false);
    const [credentials, setCredentials] = useState({ title: "", tags: "" })

    const getValue = (val) => {
        setValue(val);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/question/addquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title: credentials.title, question: value, tags: credentials.tags }),
        });

        const json = await response.json();

        if (json["status"] === true) {
            setState(true);
            window.scrollTo(0, 0);
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 1000);
        }
        setHtml(parse(value));
    }

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto flex justify-center w-full">
                <Sidebar />
                <main className="flex-1 py-8 px-4 md:px-8 w-full">

                    {state && (
                        <div className="mb-6">
                            <Alert
                                message="Your Query has been posted <strong>successfully</strong>!"
                                type="success"
                                onClose={() => setState(false)}
                            />
                        </div>
                    )}

                    {/* Guide Header Card */}
                    <div className="glass rounded-2xl p-6 border border-surfaceBorder mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <HelpOutlineIcon />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-textMain mb-1">Create a New Query</h2>
                                <p className="text-sm text-textMuted leading-relaxed">
                                    Formulate your query clearly to get rapid and precise answers from the community or the AI resolver engine.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="flex gap-2.5 items-start">
                                        <span className="w-5 h-5 rounded-full bg-surfaceHover text-textMain text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                        <span className="text-xs text-textMuted">Summarize your issue in a concise title.</span>
                                    </div>
                                    <div className="flex gap-2.5 items-start">
                                        <span className="w-5 h-5 rounded-full bg-surfaceHover text-textMain text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                        <span className="text-xs text-textMuted">Provide concrete code snippets or error logs.</span>
                                    </div>
                                    <div className="flex gap-2.5 items-start">
                                        <span className="w-5 h-5 rounded-full bg-surfaceHover text-textMain text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                        <span className="text-xs text-textMuted">Explain what you tried and what was expected.</span>
                                    </div>
                                    <div className="flex gap-2.5 items-start">
                                        <span className="w-5 h-5 rounded-full bg-surfaceHover text-textMain text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                                        <span className="text-xs text-textMuted">Add relevant tags to categorize the topic.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Title Box */}
                        <div className="bg-surface border border-surfaceBorder dark:border-none rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-textMain tracking-wide">QUERY TITLE</label>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={onChange}
                                    placeholder="e.g. How to prevent memory leak in React useEffect dependencies?"
                                    className="w-full bg-surfaceHover border border-surfaceBorder rounded-xl px-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                                    required
                                />
                                <span className="text-xs text-textMuted">Be specific and explain what is failing.</span>
                            </div>
                        </div>

                        {/* Question Content Editor */}
                        <div className="bg-surface border border-surfaceBorder dark:border-none rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold text-textMain tracking-wide">QUERY DESCRIPTION</label>
                                <div className="rounded-xl overflow-hidden border border-surfaceBorder dark:border-none bg-surface">
                                    <JoditEditor
                                        ref={editor}
                                        value={props.initialValue || value}
                                        config={config}
                                        tabIndex={1}
                                        onChange={(newContent) => getValue(newContent)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags Box */}
                        <div className="bg-surface border border-surfaceBorder dark:border-none rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-textMain tracking-wide">TOPIC TAGS</label>
                                <input
                                    type="text"
                                    name="tags"
                                    onChange={onChange}
                                    placeholder="e.g. react javascript memory-leak"
                                    className="w-full bg-surfaceHover border border-surfaceBorder rounded-xl px-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                                    required
                                />
                                <span className="text-xs text-textMuted">Separate multiple tags with a single space.</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end mt-2">
                            <Button type="submit" variant="primary">
                                Publish Query <ArrowForwardIcon fontSize="small" />
                            </Button>
                        </div>

                    </form>

                </main>
            </div>
        </div>
    )
}
