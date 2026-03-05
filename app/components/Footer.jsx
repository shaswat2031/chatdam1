'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Droplets, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
    const { isDark } = useTheme();

    const textMuted = isDark ? 'rgba(200,200,240,0.55)' : 'rgba(30,30,80,0.55)';
    const textFaint = isDark ? 'rgba(200,200,240,0.4)' : 'rgba(30,30,80,0.4)';
    const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(14,165,233,0.12)';
    const iconBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(14,165,233,0.06)';
    const iconBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(14,165,233,0.18)';
    const iconColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(30,30,80,0.5)';
    const footerBg = isDark ? 'rgba(5,5,10,0.95)' : 'rgba(14,165,233,0.03)';
    const brandColor = isDark ? 'white' : '#0d0d2e';

    return (
        <footer style={{
            background: footerBg,
            borderTop: `1px solid ${border}`,
            padding: '60px 24px 40px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Gradient orb */}
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: 600, height: 200, borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(14,165,233,0.07) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                {/* Main row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 48 }}>

                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 12 }}>
                            <div style={{
                                height: 44, width: 'auto',
                                display: 'flex', alignItems: 'center',
                                borderRadius: 10,
                                padding: isDark ? '4px 8px' : '0px',
                                background: isDark ? 'rgba(255,255,255,0.92)' : 'transparent',
                            }}>
                                <img src="/DamChat Logo copy.png" alt="DamChat" style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block' }} />
                            </div>
                        </Link>
                        <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
                            AI-powered assistants for dam safety and water resource management —
                            built on official CWC documents and government publications.
                        </p>
                    </div>

                    {/* Nav links + socials */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
                        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {[
                                { label: 'Features', href: '#features' },
                                { label: 'Assistants', href: '/chat' },
                                { label: 'Testimonials', href: '#testimonials' },
                                { label: 'Privacy', href: '#' },
                                { label: 'Contact', href: '#' },
                            ].map((l) => (
                                <a key={l.label} href={l.href}
                                    style={{ color: textMuted, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.color = isDark ? 'rgba(255,255,255,0.9)' : '#0d0d2e'}
                                    onMouseLeave={(e) => e.target.style.color = textMuted}
                                >{l.label}</a>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label}
                                    style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, border: `1px solid ${iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, textDecoration: 'none', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.15)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.color = isDark ? 'white' : '#0d0d2e'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = iconBg; e.currentTarget.style.borderColor = iconBorder; e.currentTarget.style.color = iconColor; }}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ color: textFaint, fontSize: 13 }}>© 2025 DamChat. All rights reserved.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'pulse-glow 2s ease-in-out infinite' }} />
                        <span style={{ color: textFaint, fontSize: 13 }}>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
