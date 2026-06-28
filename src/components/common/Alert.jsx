import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Alert({ 
    message, 
    type = 'success', 
    onClose, 
    className = '' 
}) {
    if (!message) return null;

    const baseStyle = "p-4 rounded-xl flex items-center justify-between shadow-lg transition-all duration-300 animate-slide-up";
    
    let colorStyle = "";
    let Icon = null;
    
    if (type === 'success') {
        colorStyle = "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500";
        Icon = CheckCircleIcon;
    } else if (type === 'error') {
        colorStyle = "bg-red-500/10 border border-red-500/20 text-red-500";
        Icon = ErrorOutlineIcon;
    } else if (type === 'info') {
        colorStyle = "bg-primary/10 border border-primary/20 text-primary";
        Icon = InfoOutlinedIcon;
    }

    return (
        <div className={`${baseStyle} ${colorStyle} ${className}`}>
            <div className="flex items-center gap-3">
                <Icon fontSize="small" />
                <span className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: message }}></span>
            </div>
            {onClose && (
                <button onClick={onClose} className="hover:opacity-70 transition-opacity font-bold">
                    &times;
                </button>
            )}
        </div>
    );
}
