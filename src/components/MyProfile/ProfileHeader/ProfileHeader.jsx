import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';

export default function ProfileHeader() {
    const [points, setPoints] = useState(0);

    const Points = async () => {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/answer/points", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });

        const json = await response.json();
        setPoints(json["points"]);
    }

    useEffect(() => {
        Points();
    }, []);

    return (
        <div className="group glass border border-surfaceBorder rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

            <div className="flex items-center gap-4">
                <div className="rounded-full ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300 group-hover:scale-105">
                    <Avatar
                        sx={{
                            height: '64px',
                            width: '64px',
                            bgcolor: 'var(--color-primary)',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}
                    >
                        {localStorage.getItem("username") ? localStorage.getItem("username").charAt(0).toUpperCase() : '?'}
                    </Avatar>
                </div>

                <div>
                    <h2 className="text-2xl font-extrabold text-textMain leading-tight">
                        {localStorage.getItem("username")}
                    </h2>
                    <p className="text-xs text-textMuted mt-1">
                        Member since <strong className="text-textMain">{localStorage.getItem("since")}</strong>
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 bg-surfaceHover/50 border border-surfaceBorder px-4 py-2.5 rounded-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5">
                <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Reputation score</span>
                <span className="text-xl font-black text-gradient">{points} <span className="text-xs text-textMuted font-normal">pts</span></span>
            </div>
        </div>
    );
}
