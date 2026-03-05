'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Droplets, Menu, X, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Assistants', href: '/chat' },
    { label: 'About', href: '/about' },
    { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { isDark, toggle } = useTheme();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { if (!isMobile) setMobileOpen(false); }, [isMobile]);

    const linkColor = isDark ? 'rgba(240,240,255,0.8)' : 'rgba(15,15,50,0.75)';
    const linkHover = isDark ? '#ffffff' : '#0d0d2e';

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, padding: '0 16px' }}
            >
                <div className="nav-inner" style={{
                    maxWidth: 1200,
                    margin: '12px auto 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                    borderRadius: 20,
                    background: scrolled
                        ? (isDark ? 'rgba(5,5,10,0.97)' : 'rgba(235,247,255,0.97)')
                        : (isDark ? 'rgba(5,5,10,0.60)' : 'rgba(235,247,255,0.80)'),
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(14,165,233,0.18)'}`,
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                }}>
                    {/* ── Logo ── */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{
                            height: 38, width: 'auto',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 10,
                            padding: isDark ? '3px 6px' : '0px',
                            background: isDark ? 'rgba(255,255,255,0.92)' : 'transparent',
                        }}>
                            <img
                                src="/DamChat Logo copy.png"
                                alt="DamChat Logo"
                                style={{ height: 32, width: 'auto', objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                    </Link>

                    {/* ── Desktop centre links ── */}
                    {!isMobile && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                            {navLinks.map((link) => (
                                <Link key={link.label} href={link.href} style={{
                                    color: linkColor, textDecoration: 'none',
                                    fontSize: 14, fontWeight: 500, transition: 'color 0.2s', whiteSpace: 'nowrap',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = linkHover}
                                    onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* ── Right side ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggle}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(14,165,233,0.1)',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(14,165,233,0.25)'}`,
                                color: isDark ? '#fbbf24' : '#0ea5e9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex' }}>
                                        <Sun size={16} />
                                    </motion.span>
                                ) : (
                                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex' }}>
                                        <Moon size={16} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {!isMobile && (
                            <>
                                <Link href="/login" style={{ textDecoration: 'none' }}>
                                    <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/chat" style={{ textDecoration: 'none' }}>
                                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Zap size={13} /> Start Free
                                    </button>
                                </Link>
                            </>
                        )}

                        {/* Hamburger — mobile only */}
                        {isMobile && (
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                style={{
                                    background: 'none', border: 'none',
                                    color: isDark ? 'white' : '#0d0d2e',
                                    cursor: 'pointer', padding: 6,
                                    display: 'flex', alignItems: 'center',
                                }}
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile dropdown menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -16, scale: 0.97 }}
                        transition={{ duration: 0.22 }}
                        style={{
                            position: 'fixed', top: 76, left: 12, right: 12, zIndex: 998,
                            background: isDark ? 'rgba(8,8,18,0.97)' : 'rgba(235,247,255,0.97)',
                            backdropFilter: 'blur(24px)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(14,165,233,0.18)'}`,
                            borderRadius: 18, padding: '8px 4px',
                            display: 'flex', flexDirection: 'column',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <Link key={link.label} href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(15,15,60,0.8)',
                                    textDecoration: 'none', fontSize: 15, fontWeight: 500,
                                    padding: '13px 20px',
                                    borderBottom: i < navLinks.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(14,165,233,0.08)'}` : 'none',
                                    transition: 'color 0.2s, background 0.2s', borderRadius: 10,
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div style={{ padding: '10px 16px 8px', display: 'flex', gap: 10 }}>
                            <Link href="/login" style={{ textDecoration: 'none', flex: 1 }}>
                                <button className="btn-secondary" style={{ width: '100%', padding: '11px 0', fontSize: 14 }}>
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/chat" style={{ textDecoration: 'none', flex: 1 }}>
                                <button className="btn-primary" style={{ width: '100%', padding: '11px 0', fontSize: 14 }}>
                                    Try DamChat
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
