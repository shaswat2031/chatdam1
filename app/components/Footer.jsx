'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Droplets, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
    return (
        <footer style={{
            background: 'rgba(5,5,10,0.95)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '60px 24px 40px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Gradient orb */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 600,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(14,165,233,0.07) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                {/* Main footer content */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 32,
                    marginBottom: 48,
                }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 12 }}>
                            <div style={{
                                width: 38,
                                height: 38,
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #0ea5e9, #059669)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 20px rgba(14,165,233,0.35)',
                            }}>
                                <Droplets size={18} color="white" />
                            </div>
                            <span style={{ fontSize: 22, fontWeight: 800, color: 'white', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px' }}>
                                Dam<span style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chat</span>
                            </span>
                        </Link>
                        <p style={{ color: 'rgba(200,200,240,0.55)', fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
                            AI-powered assistants for dam safety and water resource management —
                            built on official CWC documents and government publications.
                        </p>
                    </div>

                    {/* Nav links + socials */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
                        {/* Quick links */}
                        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {[
                                { label: 'Features', href: '#features' },
                                { label: 'Assistants', href: '/chat' },
                                { label: 'Testimonials', href: '#testimonials' },
                                { label: 'Privacy', href: '#' },
                                { label: 'Contact', href: '#' },
                            ].map((l) => (
                                <a key={l.label} href={l.href} style={{ color: 'rgba(200,200,240,0.55)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}
                                    onMouseLeave={(e) => e.target.style.color = 'rgba(200,200,240,0.55)'}
                                >{l.label}</a>
                            ))}
                        </div>

                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: 10 }}>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label}
                                    style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.15)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: 28,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 12,
                }}>
                    <p style={{ color: 'rgba(200,200,240,0.4)', fontSize: 13 }}>
                        © 2025 DamChat. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: '#22c55e', boxShadow: '0 0 8px #22c55e',
                            animation: 'pulse-glow 2s ease-in-out infinite',
                        }} />
                        <span style={{ color: 'rgba(200,200,240,0.45)', fontSize: 13 }}>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
