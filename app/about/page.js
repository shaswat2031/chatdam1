'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Droplets, ArrowRight, BookOpen, ShieldCheck,
    FlaskConical, Users, ExternalLink, Sparkles, ChevronLeft
} from 'lucide-react';

function FloatingOrb({ style }) {
    return (
        <div style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            animation: 'orb-float 14s ease-in-out infinite',
            ...style,
        }} />
    );
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary, #050508)',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#f0f0ff',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background orbs */}
            <FloatingOrb style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', top: '-15%', left: '-15%', animationDelay: '0s' }} />
            <FloatingOrb style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', bottom: '10%', right: '-10%', animationDelay: '-6s' }} />
            <FloatingOrb style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', top: '50%', left: '55%', animationDelay: '-10s' }} />

            {/* Grid overlay */}
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                backgroundImage: `linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse at 50% 30%, transparent 20%, black 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, transparent 20%, black 65%)',
            }} />

            {/* ── NAVBAR ── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
                padding: '12px 24px',
                background: 'rgba(5,5,10,0.7)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(14,165,233,0.35)' }}>
                        <Droplets size={16} color="white" />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'white', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px' }}>
                        Dam<span style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chat</span>
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'rgba(200,200,240,0.7)', fontSize: 14, transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(200,200,240,0.7)'}
                    >
                        <ChevronLeft size={14} /> Home
                    </Link>
                    <Link href="/chat" style={{ textDecoration: 'none' }}>
                        <motion.button
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#059669)', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 20px rgba(14,165,233,0.3)' }}
                        >
                            <Sparkles size={13} /> Try DamChat
                        </motion.button>
                    </Link>
                </div>
            </nav>

            {/* ── CONTENT ── */}
            <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>

                {/* ── HERO ── */}
                <section style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
                    <motion.div {...fadeUp(0.05)}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px 5px 8px', borderRadius: 99, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', marginBottom: 28 }}>
                            <span style={{ background: 'linear-gradient(135deg,#0ea5e9,#059669)', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em' }}>About</span>
                            <span style={{ color: 'rgba(220,220,255,0.8)', fontSize: 13, fontWeight: 500 }}>DamChat — ICED, IIT Roorkee</span>
                        </div>
                    </motion.div>

                    <motion.h1 {...fadeUp(0.12)} style={{
                        fontSize: 'clamp(40px, 6vw, 76px)',
                        fontWeight: 800,
                        lineHeight: 1.08,
                        letterSpacing: '-3px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        marginBottom: 22,
                        color: '#f0f0ff',
                    }}>
                        About{' '}
                        <span style={{ background: 'linear-gradient(135deg,#0ea5e9 0%,#10b981 60%,#a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            DamChat
                        </span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} style={{ fontSize: 18, color: 'rgba(200,200,240,0.65)', maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.65, fontWeight: 400 }}>
                        Ensuring dam safety with clarity and compliance.
                    </motion.p>

                    {/* Divider line */}
                    <motion.div {...fadeUp(0.25)} style={{ width: 80, height: 3, background: 'linear-gradient(90deg,#0ea5e9,#10b981)', borderRadius: 99, margin: '0 auto 52px' }} />

                    {/* Institution logos */}
                    <motion.div {...fadeUp(0.3)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                        {/* ICED logo */}
                        <motion.div
                            whileHover={{ scale: 1.04, y: -3 }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                                padding: '24px 32px', borderRadius: 24,
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(14,165,233,0.2)',
                                backdropFilter: 'blur(12px)',
                                transition: 'box-shadow 0.3s',
                                cursor: 'default',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 16px 48px rgba(14,165,233,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                        >
                            <div style={{ width: 110, height: 110, borderRadius: 18, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, boxShadow: '0 0 24px rgba(14,165,233,0.15)' }}>
                                <Image src="/ICED.png" alt="ICED — International Centre for Dams" width={96} height={96} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0ff', marginBottom: 3 }}>ICED</div>
                                <div style={{ fontSize: 11.5, color: 'rgba(200,200,240,0.55)', maxWidth: 140, lineHeight: 1.5 }}>International Centre for Dams</div>
                            </div>
                        </motion.div>

                        {/* Connector */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, transparent, rgba(200,200,240,0.3), transparent)' }} />
                            <div style={{ fontSize: 11, color: 'rgba(200,200,240,0.4)', fontWeight: 600, letterSpacing: '0.06em' }}>AT</div>
                            <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, transparent, rgba(200,200,240,0.3), transparent)' }} />
                        </div>

                        {/* IIT Roorkee logo */}
                        <motion.div
                            whileHover={{ scale: 1.04, y: -3 }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                                padding: '24px 32px', borderRadius: 24,
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(16,185,129,0.2)',
                                backdropFilter: 'blur(12px)',
                                transition: 'box-shadow 0.3s',
                                cursor: 'default',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 16px 48px rgba(16,185,129,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                        >
                            <div style={{ width: 110, height: 110, borderRadius: 18, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, boxShadow: '0 0 24px rgba(16,185,129,0.15)' }}>
                                <Image src="/IITR_logo.gif" alt="IIT Roorkee Logo" width={96} height={96} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0ff', marginBottom: 3 }}>IIT Roorkee</div>
                                <div style={{ fontSize: 11.5, color: 'rgba(200,200,240,0.55)', maxWidth: 140, lineHeight: 1.5 }}>Indian Institute of Technology Roorkee</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── PURPOSE ── */}
                <section style={{ padding: '60px 24px', maxWidth: 860, margin: '0 auto' }}>
                    <motion.div {...fadeUp(0.1)} style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(14,165,233,0.18)',
                        borderRadius: 28,
                        padding: '52px 56px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Accent orb inside card */}
                        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#0ea5e9,#0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(14,165,233,0.3)', flexShrink: 0 }}>
                                <BookOpen size={20} color="white" />
                            </div>
                            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif', margin: 0 }}>Purpose</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <p style={{ fontSize: 15.5, color: 'rgba(210,210,250,0.78)', lineHeight: 1.8, margin: 0 }}>
                                DamChat is an AI-powered knowledge assistant designed to help you explore and understand the <strong style={{ color: '#7dd3fc', fontWeight: 600 }}>Dam Safety Act, 2021</strong> and its related regulations in India. Developed by the <strong style={{ color: '#6ee7b7', fontWeight: 600 }}>International Centre for Dams (ICED), IIT Roorkee</strong>, DamChat brings together cutting-edge artificial intelligence with expert knowledge of dam safety practices, policies, and governance.
                            </p>
                            <p style={{ fontSize: 15.5, color: 'rgba(210,210,250,0.78)', lineHeight: 1.8, margin: 0 }}>
                                Our aim is to make the complexities of the Dam Safety Act accessible to all — whether you are a policymaker, engineer, researcher, student, or an interested citizen. With DamChat, you can ask questions in natural language and receive intelligent, reliable, and easy-to-understand explanations backed by authoritative sources.
                            </p>
                            <p style={{ fontSize: 15.5, color: 'rgba(210,210,250,0.78)', lineHeight: 1.8, margin: 0 }}>
                                DamChat is free to use and built to encourage <strong style={{ color: '#c4b5fd', fontWeight: 600 }}>awareness, transparency, and informed decision-making</strong> about dam safety in India. By bridging the gap between technical regulations and public understanding, DamChat supports ICED's mission to strengthen knowledge dissemination and build safer water infrastructure for the nation.
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* ── STATS ROW ── */}
                <section style={{ padding: '10px 24px 60px', maxWidth: 860, margin: '0 auto' }}>
                    <motion.div {...fadeUp(0.1)}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                        {[
                            { icon: ShieldCheck, label: 'Official Documents', val: '20+', color: '#0ea5e9', glow: 'rgba(14,165,233,0.25)' },
                            { icon: BookOpen, label: 'Regulations Covered', val: '100%', color: '#10b981', glow: 'rgba(16,185,129,0.25)' },
                            { icon: Users, label: 'AI Assistants', val: '2', color: '#a78bfa', glow: 'rgba(167,139,250,0.25)' },
                            { icon: FlaskConical, label: 'Institution', val: 'IIT Roorkee', color: '#f59e0b', glow: 'rgba(245,158,11,0.2)', small: true },
                        ].map((s) => {
                            const SIcon = s.icon;
                            return (
                                <motion.div key={s.label} whileHover={{ y: -4 }} style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${s.color}22`, borderRadius: 20, padding: '24px 20px', textAlign: 'center', cursor: 'default', transition: 'box-shadow 0.3s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 12px 40px ${s.glow}`}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                                        <SIcon size={18} color={s.color} />
                                    </div>
                                    <div style={{ fontSize: s.small ? 16 : 26, fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 4 }}>{s.val}</div>
                                    <div style={{ fontSize: 12.5, color: 'rgba(200,200,240,0.5)' }}>{s.label}</div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── RESEARCH & DEVELOPMENT ── */}
                <section style={{ padding: '0 24px 80px', maxWidth: 860, margin: '0 auto' }}>
                    <motion.div {...fadeUp(0.1)} style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(167,139,250,0.18)',
                        borderRadius: 28,
                        padding: '52px 56px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.12) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(139,92,246,0.3)', flexShrink: 0 }}>
                                <FlaskConical size={20} color="white" />
                            </div>
                            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif', margin: 0 }}>Research &amp; Development</h2>
                        </div>

                        <p style={{ fontSize: 15.5, color: 'rgba(210,210,250,0.78)', lineHeight: 1.8, margin: '0 0 32px' }}>
                            DamChat has been conceptualized and developed under the vision and guidance of{' '}
                            <strong style={{ color: '#c4b5fd', fontWeight: 600 }}>Professor B. Ravi Kumar Pillai</strong> and{' '}
                            <strong style={{ color: '#c4b5fd', fontWeight: 600 }}>Professor M. L. Sharma</strong>. Their idea, mentorship, and unwavering support have been the driving force behind this initiative, making it possible to bring dam safety knowledge closer to everyone.
                        </p>

                        {/* Institution logos in R&D */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderRadius: 14, background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, flexShrink: 0 }}>
                                    <Image src="/ICED.png" alt="ICED" width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#7dd3fc' }}>ICED, IIT Roorkee</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderRadius: 14, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, flexShrink: 0 }}>
                                    <Image src="/IITR_logo.gif" alt="IIT Roorkee" width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#6ee7b7' }}>IIT Roorkee</span>
                            </div>
                        </div>

                        {/* Professors */}
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {[
                                { name: 'Prof. B. Ravi Kumar Pillai', role: 'Vision & Guidance', initials: 'BRP', color: '#0ea5e9' },
                                { name: 'Prof. M. L. Sharma', role: 'Vision & Guidance', initials: 'MLS', color: '#10b981' },
                            ].map((prof) => (
                                <div key={prof.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 16, background: `${prof.color}0d`, border: `1px solid ${prof.color}25`, flex: '1 1 240px' }}>
                                    <div style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg,${prof.color},${prof.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0, border: `2px solid ${prof.color}40` }}>
                                        {prof.initials}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0ff', marginBottom: 3 }}>{prof.name}</div>
                                        <div style={{ fontSize: 12, color: prof.color }}>{prof.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* ── DEVELOPED BY ── */}
                <section style={{ padding: '0 24px 100px', maxWidth: 860, margin: '0 auto' }}>
                    <motion.div {...fadeUp(0.1)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.a
                            href="https://inventislabs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 14,
                                padding: '22px 36px', borderRadius: 22,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(139,92,246,0.15)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(200,200,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Developed by</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: 'white', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px' }}>
                                    Inventis<span style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Labs</span>
                                </div>
                            </div>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ExternalLink size={16} color="#a78bfa" />
                            </div>
                        </motion.a>
                    </motion.div>
                </section>

                {/* ── CTA ── */}
                <section style={{ padding: '0 24px 100px', textAlign: 'center' }}>
                    <motion.div {...fadeUp(0.1)}>
                        <p style={{ fontSize: 14, color: 'rgba(200,200,240,0.5)', marginBottom: 16 }}>Ready to explore?</p>
                        <Link href="/chat" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(14,165,233,0.4)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg,#0ea5e9,#059669)', border: 'none', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 30px rgba(14,165,233,0.3)' }}
                            >
                                Start chatting with DamChat <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </section>
            </main>
        </div>
    );
}
