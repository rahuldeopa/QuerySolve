import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../common/Logo';

export default function Navbar() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const isLoggedin = () => {
    if (localStorage.getItem('username')) {
      setLoginStatus(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('since');
    localStorage.removeItem('Usertype');
    localStorage.removeItem('token');
    setLoginStatus(false);
    navigate("/");
    window.location.reload(true);
  };

  const searchQuestion = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/question/search?keyword=${searchQuery}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
      });
      const questions = await response.json();
      navigate("/search", { state: questions });
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  useEffect(() => {
    isLoggedin();
  }, [loginStatus]);

  const username = localStorage.getItem("username");
  const userInitial = username ? username.charAt(0).toUpperCase() : '';

  return (
    <nav className="sticky top-0 z-50 glass border-b border-surfaceBorder transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Brand Logo */}
          <Logo className="group" />

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1 ml-10">
            <NavLink to="/questions" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'}`}>
              Explore
            </NavLink>
            <NavLink to="/tags" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'}`}>
              Tags
            </NavLink>
            {localStorage.getItem("Usertype") === 'user' && (
              <NavLink to="/editor" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'}`}>
                Code Editor
              </NavLink>
            )}
            {localStorage.getItem("Usertype") === 'admin' && (
              <>
                <NavLink to="/adminHome" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'}`}>
                  Dashboard
                </NavLink>
                <NavLink to="/adminuser" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'text-textMuted hover:bg-surfaceHover hover:text-textMain'}`}>
                  Users
                </NavLink>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">

            {/* Search Bar */}
            <form onSubmit={searchQuestion} className="hidden lg:flex relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" style={{ fontSize: '18px' }} />
              <input
                type="text"
                placeholder="Search questions..."
                className="pl-9 pr-4 py-1.5 bg-surfaceHover border border-surfaceBorder rounded-xl text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 w-64 focus:w-72"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <button
              onClick={toggleTheme}
              className="p-1.5 text-textMuted hover:text-textMain hover:bg-surfaceHover rounded-xl transition-all duration-300 hover:rotate-12 active:scale-90"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </button>

            {/* Auth/Profile */}
            <div className="w-80 flex justify-end items-center border-l border-surfaceBorder">
              {loginStatus ? (
                <div className="flex items-center gap-3 pl-4">
                  <NavLink to="/analysis" className="group flex items-center gap-2 hover:bg-surfaceHover px-2 py-1 rounded-xl transition-all duration-200">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/30 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/30 group-hover:scale-105">
                      {userInitial}
                    </div>
                    <span className="text-sm font-medium text-textMain hidden sm:block">{username}</span>
                  </NavLink>
                  <button
                    onClick={logout}
                    className="px-4 py-1.5 text-sm font-medium text-textMuted border border-surfaceBorder rounded-xl hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-500 transition-all duration-200 active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-4">
                  <NavLink to="/login" className="px-4 py-2 text-sm font-medium text-textMain hover:text-primary transition-all duration-200 hover:-translate-y-0.5">
                    Log In
                  </NavLink>
                  <NavLink to="/register" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/50 active:scale-95">
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
