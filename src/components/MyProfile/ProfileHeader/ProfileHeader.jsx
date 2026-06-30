import React, { useState, useEffect, useRef } from 'react';
import UserAvatar from '../../common/UserAvatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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

    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Ensure it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Limit size to 2MB
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be less than 2MB');
            return;
        }

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/uploadProfilePhoto`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ photo: base64String })
                });
                
                if (response.ok) {
                    // Update cache version to force avatar reloads
                    localStorage.setItem('avatar_version', Date.now().toString());
                    // Force a reload to reflect new avatar everywhere
                    window.location.reload();
                } else {
                    alert('Failed to upload image');
                }
            } catch (err) {
                console.error(err);
                alert('Error uploading image');
            } finally {
                setIsUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
            {/* Main Header Banner */}
            <div className="group relative rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden border border-surfaceBorder bg-surface">
                {/* Decorative Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-accent/5 opacity-80"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-primary/30 transition-transform duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute top-0 right-0 w-full h-full border-t border-white/5 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 w-full">
                    <div className="relative group/avatar cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-md opacity-40 group-hover/avatar:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                        <div className="rounded-full ring-4 ring-surfaceBorder group-hover/avatar:ring-primary/40 p-1 bg-surface transition-all duration-500 group-hover/avatar:scale-105 relative z-10 overflow-hidden">
                            <UserAvatar 
                                username={localStorage.getItem("username")} 
                                className="w-24 h-24 text-4xl shadow-inner" 
                            />
                            
                            {/* Upload Overlay */}
                            <div className="absolute inset-0 m-1 rounded-full bg-black/50 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-sm">
                                {isUploading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <CameraAltIcon className="text-white mb-1" fontSize="small" />
                                        <span className="text-[10px] text-white font-bold tracking-wider">UPDATE</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            className="hidden" 
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-textMain tracking-tight">
                            {localStorage.getItem("username")}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                Pro Member
                            </span>
                            <p className="text-sm text-textMuted font-medium">
                                Joined <strong className="text-textMain">{localStorage.getItem("since")}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 bg-background/60 backdrop-blur-sm border border-surfaceBorder/60 px-6 py-4 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg w-full md:w-auto">
                        <span className="text-xs font-bold text-textMuted uppercase tracking-widest">Reputation</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{points}</span>
                            <span className="text-sm font-semibold text-textMuted">pts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Placeholder for future detailed stats to fill space */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="glass rounded-2xl p-6 border-theme flex items-center justify-between hover:border-primary/30 transition-colors">
                    <div>
                        <h3 className="text-textMuted text-sm font-bold uppercase tracking-wider mb-1">Contributions</h3>
                        <p className="text-2xl font-bold text-textMain">Active</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                </div>
                <div className="glass rounded-2xl p-6 border-theme flex items-center justify-between hover:border-primary/30 transition-colors">
                    <div>
                        <h3 className="text-textMuted text-sm font-bold uppercase tracking-wider mb-1">Impact Level</h3>
                        <p className="text-2xl font-bold text-textMain">Rising Star</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
