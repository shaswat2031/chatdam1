'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Droplets, Menu, X, Zap } from 'lucide-react';

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

    // Close mobile menu on resize to desktop
    useEffect(() => { if (!isMobile) setMobileOpen(false); }, [isMobile]);

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
                    background: scrolled ? 'rgba(5,5,10,0.95)' : 'rgba(5,5,10,0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.3s ease',
                }}>
                    {/* ── Logo ── */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: 10,
                            background: 'linear-gradient(135deg,#0ea5e9,#059669)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 18px rgba(14,165,233,0.4)',
                        }}>
                            <Droplets size={16} color="white" />
                        </div>
                        <span className="nav-logo-text" style={{
                            fontSize: 19, fontWeight: 800, color: 'white',
                            fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px',
                        }}>
                            Dam<span style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chat</span>
                        </span>
                    </Link>

                    {/* ── Desktop centre links ── */}
                    {!isMobile && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                            {navLinks.map((link) => (
                                <Link key={link.label} href={link.href} style={{
                                    color: 'rgba(240,240,255,0.8)',
                                    textDecoration: 'none',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    transition: 'color 0.2s',
                                    whiteSpace: 'nowrap',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240,240,255,0.8)'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* ── Right side ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
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
                                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center' }}
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
                            background: 'rgba(8,8,18,0.97)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 18, padding: '8px 4px',
                            display: 'flex', flexDirection: 'column',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <Link key={link.label} href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    color: 'rgba(255,255,255,0.85)',
                                    textDecoration: 'none',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    padding: '13px 20px',
                                    borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                    transition: 'color 0.2s, background 0.2s',
                                    borderRadius: 10,
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Mobile CTA */}
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
