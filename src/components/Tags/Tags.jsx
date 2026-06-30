import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'

export default function Tags() {

    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/tag/gettag", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(tags => setTags(tags));

    }

    useEffect(() => {
        fetchTags();
    }, [])

    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
                <Sidebar />
                
                <main className="flex-1 py-8 px-4 md:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-textMain mb-2">Tags</h1>
                        <p className="text-textMuted text-sm leading-relaxed max-w-xl">
                            A tag is a keyword or label that categorizes your question with other, similar questions. 
                            Using the right tags makes it easier for others to find and answer your query.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {tags.length > 0 && tags.map(tag => (
                            <div 
                                key={tag.tagname} 
                                className="group bg-surface border border-surfaceBorder rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <NavLink 
                                            to={{ pathname: `/questionOntags/${tag.tagname}` }} 
                                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all inline-block"
                                        >
                                            #{tag.tagname}
                                        </NavLink>
                                    </div>
                                    <p className="text-textMuted text-xs leading-relaxed">
                                        {tag.desc ? `${tag.desc.slice(0, 100)}...` : 'No description provided for this category.'}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-surfaceBorder flex justify-end">
                                    <NavLink 
                                        to={{ pathname: `/questionOntags/${tag.tagname}` }} 
                                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                                    >
                                        Explore Queries &rarr;
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
