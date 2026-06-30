import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ConfirmModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Action", 
    message = "Are you sure you want to proceed? This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDanger = false
}) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        className="bg-surface border border-surfaceBorder w-full max-w-sm rounded-2xl p-6 relative shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Decorative glow */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl -z-10 ${isDanger ? 'bg-rose-500/20' : 'bg-primary/20'}`}></div>

                        <div className="flex flex-col gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDanger ? 'bg-rose-500/10 text-rose-500 ring-4 ring-rose-500/5' : 'bg-primary/10 text-primary ring-4 ring-primary/5'}`}>
                                {isDanger ? <WarningAmberRoundedIcon /> : <InfoOutlinedIcon />}
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-textMain">{title}</h3>
                                <p className="text-sm text-textMuted leading-relaxed mt-2">
                                    {message}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-4 w-full">
                                <Button 
                                    variant="secondary" 
                                    onClick={onClose}
                                    fullWidth
                                    className="py-2"
                                >
                                    {cancelText}
                                </Button>
                                <Button 
                                    variant={isDanger ? "danger" : "primary"} 
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    fullWidth
                                    className="py-2"
                                >
                                    {confirmText}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
