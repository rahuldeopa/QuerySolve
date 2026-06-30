import React from 'react';

export default function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    className = '', 
    disabled = false,
    fullWidth = false
}) {
    const baseStyle = "flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    
    let variantStyle = "";
    if (variant === 'primary') {
        variantStyle = "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20";
    } else if (variant === 'secondary') {
        variantStyle = "bg-surfaceHover border border-surfaceBorder text-textMain hover:bg-surfaceBorder";
    } else if (variant === 'outline') {
        variantStyle = "bg-transparent border border-primary text-primary hover:bg-primary/5";
    } else if (variant === 'danger') {
        variantStyle = "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600";
    } else if (variant === 'ghost') {
        variantStyle = "bg-transparent text-textMuted hover:text-textMain hover:bg-surfaceHover shadow-none";
    }

    const widthStyle = fullWidth ? "w-full" : "w-max";

    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseStyle} ${variantStyle} ${widthStyle} ${className}`}
        >
            {children}
        </button>
    );
}
