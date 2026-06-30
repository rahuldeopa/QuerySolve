import React from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

export default function Profile() {
    return (
        <div className="min-h-screen bg-background text-textMain transition-colors duration-300">
            <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-6 py-12 px-4 md:px-8">
                <ProfileSidebar />
                <div className="flex-1">
                    <ProfileHeader />
                </div>
            </div>
        </div>
    );
}
