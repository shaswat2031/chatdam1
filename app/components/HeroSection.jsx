'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Droplets, ShieldCheck, BookOpen, FileText, Star } from 'lucide-react';

function FloatingOrb({ style }) {
    return (
        <div style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'orb-float 12s ease-in-out infinite',
            pointerEvents: 'none',
            ...style,
        }} />
    );
}

function GridLines() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
        linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
      `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, transparent 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 0%, black 60%, transparent 100%)',
        }} />
    );
}

const BOTS = [
    {
        id: 'damchat',
        name: 'DamChat',
        tagline: 'Academic Dam Safety Assistant',
        description: 'Answers questions on the Dam Safety Act 2021, Gazette notifications, and official SOPs — with source & page citations on every response.',
        icon: Droplets,
        gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
        glow: 'rgba(14,165,233,0.3)',
        accent: '#0ea5e9',
        accentSoft: 'rgba(14,165,233,0.1)',
        accentBorder: 'rgba(14,165,233,0.25)',
        features: ['Dam Safety Act 2021', 'Gazette Notifications', 'Inspection SOPs', 'Emergency Action Plans'],
    },
    {
        id: 'cwc',
        name: 'CWC Assistant',
        tagline: 'Central Water Commission Expert',
        description: 'Expert advisory on dam safety, water resource management, environmental monitoring, and CWC policy — backed by official government guidelines.',
        icon: ShieldCheck,
        gradient: 'linear-gradient(135deg, #059669, #065f46)',
        glow: 'rgba(5,150,105,0.3)',
        accent: '#10b981',
        accentSoft: 'rgba(16,185,129,0.1)',
        accentBorder: 'rgba(16,185,129,0.25)',
        features: ['Risk Assessment Guidelines', 'Environmental Safeguards', 'Instrumentation Standards', 'Capacity Building'],
    },
];

export default function HeroSection() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '120px 24px 80px',
        }} className="hero-section hero-mesh">
            <GridLines />
            <FloatingOrb style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)', top: '-10%', left: '-10%', animationDelay: '0s' }} />
            <FloatingOrb style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', bottom: '0%', right: '-5%', animationDelay: '-4s' }} />
            <FloatingOrb style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', top: '50%', left: '60%', animationDelay: '-8s' }} />

            {/* Institution logos badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    padding: '8px 20px 8px 8px',
                    borderRadius: 99,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: 36,
                }}
                className="hero-badge"
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                        <Image src="/ICED.png" alt="ICED" width={26} height={26} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
                        <Image src="/IITR_logo.gif" alt="IIT Roorkee" width={26} height={26} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
                    </div>
                </div>
                <span style={{ color: 'rgba(220,220,255,0.8)', fontSize: 13, fontWeight: 500 }}>
                    ICED · IIT Roorkee — Official Dam Safety AI
                </span>
                <Star size={12} color="rgba(14,165,233,0.8)" fill="rgba(14,165,233,0.4)" />
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                    fontSize: 'clamp(38px, 5.5vw, 74px)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '-3px',
                    marginBottom: 22,
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: '#f0f0ff',
                    textAlign: 'center',
                    maxWidth: 820,
                }}
            >
                Dam Safety Knowledge,
                <br />
                <span style={{
                    background: 'linear-gradient(135deg, #38bdf8 0%, #34d399 50%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    Instantly Cited
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{
                    fontSize: 17,
                    color: 'rgba(220,220,255,0.7)',
                    maxWidth: 560,
                    lineHeight: 1.7,
                    marginBottom: 52,
                    fontWeight: 400,
                    textAlign: 'center',
                }}
            >
                Two specialised AI assistants — <strong style={{ color: '#38bdf8', fontWeight: 600 }}>DamChat</strong> and the <strong style={{ color: '#34d399', fontWeight: 600 }}>CWC Assistant</strong> — answer every question with source-cited responses drawn from official government documents.
            </motion.p>

            {/* ── Two bot cards ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900, width: '100%', marginBottom: 52 }}
                className="hero-bot-grid"
            >
                {BOTS.map((bot, idx) => {
                    const BotIcon = bot.icon;
                    return (
                        <Link key={bot.id} href="/chat" style={{ textDecoration: 'none', flex: '1 1 360px', maxWidth: 420 }} className="hero-bot-card">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    borderRadius: 22, overflow: 'hidden',
                                    border: `1px solid ${bot.accentBorder}`,
                                    background: 'rgba(255,255,255,0.03)',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 20px 60px ${bot.glow}`}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            >
                                {/* Card top */}
                                <div style={{ padding: '24px 24px 18px', background: bot.accentSoft, borderBottom: `1px solid ${bot.accentBorder}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 14, background: bot.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${bot.glow}`, flexShrink: 0 }}>
                                            <BotIcon size={20} color="white" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 17, fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk' }}>{bot.name}</div>
                                            <div style={{ fontSize: 11.5, color: bot.accent, fontWeight: 600 }}>{bot.tagline}</div>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 13.5, color: 'rgba(200,200,240,0.7)', lineHeight: 1.65, margin: 0 }}>{bot.description}</p>
                                </div>
                                {/* Feature list */}
                                <div style={{ padding: '16px 24px 20px' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                                        {bot.features.map((f) => (
                                            <span key={f} style={{ fontSize: 11.5, fontWeight: 600, color: bot.accent, background: bot.accentSoft, border: `1px solid ${bot.accentBorder}`, borderRadius: 99, padding: '3px 10px' }}>
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16 }}>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: bot.accent }}>Start chatting</span>
                                        <ArrowRight size={13} color={bot.accent} />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </motion.div>

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}
                className="hero-stats"
            >
                {[
                    { label: 'Official Documents', val: '20+' },
                    { label: 'Source Citations', val: '100%' },
                    { label: 'AI Assistants', val: '2' },
                ].map((s) => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk' }} className="hero-stats-val">{s.val}</div>
                        <div style={{ fontSize: 12, color: 'rgba(200,200,240,0.5)', marginTop: 3 }}>{s.label}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
