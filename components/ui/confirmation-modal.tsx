'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    isDangerous?: boolean
    isLoading?: boolean
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDangerous = true,
    isLoading = false
}: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md bg-rich-black border border-white/10 p-8 md:p-10 pointer-events-auto"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDangerous ? 'bg-red-500/10 text-red-500' : 'bg-gold/10 text-gold'}`}>
                                    <AlertTriangle size={24} strokeWidth={1.5} />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-white/20 hover:text-white transition-colors"
                                >
                                    <X size={20} strokeWidth={1.5} />
                                </button>
                            </div>

                            <h3 className="font-sans text-xl text-white font-light tracking-tight mb-4">{title}</h3>
                            <p className="font-sans text-sm text-white/40 leading-relaxed mb-10">{message}</p>

                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`flex-1 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 flex items-center justify-center gap-2 ${isDangerous
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-white text-black hover:bg-gold hover:text-white'
                                        }`}
                                >
                                    {isLoading && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 border-2 border-current border-t-transparent rounded-full" />}
                                    {confirmText}
                                </button>
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="flex-1 px-8 py-4 border border-white/10 text-white text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
                                >
                                    {cancelText}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
