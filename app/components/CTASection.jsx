'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
    return (
        <section style={{ padding: '80px 24px 120px', position: 'relative', overflow: 'hidden' }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    maxWidth: 900,
                    margin: '0 auto',
                    borderRadius: 32,
                    padding: '80px 60px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(6,182,212,0.08) 100%)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Gradient orbs */}
                <div style={{
                    position: 'absolute',
                    top: -80,
                    right: -80,
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: -80,
                    left: -80,
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                }} />

                {/* Rocket image — floating top-right decorative accent */}
                <motion.div
                    animate={{ y: [-12, 12, -12], rotate: [-4, 4, -4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: -20,
                        right: 40,
                        width: 160,
                        height: 160,
                        opacity: 0.18,
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                >
                    <Image
                        src="/rocket.png"
                        alt="Rocket launch — NeuralChat powering your ideas"
                        width={160}
                        height={160}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'saturate(0) brightness(2)' }}
                    />
                </motion.div>

                {/* Mirror rocket bottom-left */}
                <motion.div
                    animate={{ y: [12, -12, 12], rotate: [4, -4, 4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: -10,
                        left: 30,
                        width: 120,
                        height: 120,
                        opacity: 0.1,
                        pointerEvents: 'none',
                        zIndex: 0,
                        transform: 'scaleX(-1)',
                    }}
                >
                    <Image
                        src="/rocket.png"
                        alt=""
                        aria-hidden="true"
                        width={120}
                        height={120}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'saturate(0) brightness(2)' }}
                    />
                </motion.div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 16px',
                        borderRadius: 99,
                        background: 'rgba(139,92,246,0.15)',
                        border: '1px solid rgba(139,92,246,0.3)',
                        marginBottom: 24,
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#c4b5fd',
                    }}>
                        <Sparkles size={14} />
                        Start for free today
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(36px, 6vw, 64px)',
                        fontWeight: 800,
                        letterSpacing: '-2px',
                        marginBottom: 20,
                        fontFamily: 'Space Grotesk, sans-serif',
                        lineHeight: 1.1,
                        color: '#f0f0ff',
                    }}>
                        Ready to get
                        <br />
                        <span className="gradient-text">authoritative answers?</span>
                    </h2>

                    <p style={{
                        color: 'rgba(220,220,255,0.75)',
                        fontSize: 17,
                        maxWidth: 480,
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                    }}>
                        Access every CWC guideline, dam safety regulation, and official SOP — instantly cited, always accurate. Start talking with DamChat or the CWC Assistant right now.
                    </p>

                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/chat" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(139,92,246,0.5)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '14px 32px',
                                    borderRadius: 14,
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: 15,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 0 30px rgba(139,92,246,0.35)',
                                }}
                            >
                                Get Started Free
                                <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                        <Link href="/login" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '14px 32px',
                                    borderRadius: 14,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#f0f0ff',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                }}
                            >
                                Sign In
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
