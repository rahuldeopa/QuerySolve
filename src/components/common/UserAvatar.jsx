import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';

export default function UserAvatar({ username, className = "", style = {} }) {
    const [imgError, setImgError] = useState(false);

    if (!username) {
        return (
            <div
                className={`flex-shrink-0 flex items-center justify-center rounded-full bg-surfaceHover border border-surfaceBorder text-textMuted ${className}`}
                style={style}
            >
                <PersonOutlineIcon fontSize="inherit" />
            </div>
        );
    }

    if (!imgError) {
        const cacheVersion = localStorage.getItem('avatar_version') || '1';
        return (
            <img 
                src={`${import.meta.env.VITE_BACKEND_URL}/api/auth/profilePhoto/${username}?v=${cacheVersion}`}
                alt={username}
                className={`flex-shrink-0 rounded-full object-cover ${className}`}
                style={style}
                onError={() => setImgError(true)}
            />
        );
    }

    const initial = username.charAt(0).toUpperCase();

    // Generate a consistent background color based on the username string
    const colors = [
        'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        'bg-rose-500/10 text-rose-500 border-rose-500/20',
        'bg-amber-500/10 text-amber-500 border-amber-500/20',
        'bg-purple-500/10 text-purple-500 border-purple-500/20',
        'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
        'bg-pink-500/10 text-pink-500 border-pink-500/20',
        'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
        'bg-teal-500/10 text-teal-500 border-teal-500/20',
        'bg-orange-500/10 text-orange-500 border-orange-500/20'
    ];

    // Simple hash function for the username
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Select color based on hash (ensure positive index)
    const colorIndex = Math.abs(hash) % colors.length;
    const colorClass = colors[colorIndex];

    return (
        <div
            className={`flex-shrink-0 flex items-center justify-center rounded-full border font-bold uppercase ${colorClass} ${className}`}
            style={style}
            title={username}
        >
            {initial}
        </div>
    );
}
