'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        role: 'Senior Dam Safety Engineer, CWC',
        avatar: 'RK',
        color: '#0ea5e9',
        rating: 5,
        text: "DamChat has transformed how our team accesses critical dam safety regulations. Every response cites the exact source and page number — it's replaced hours of manual document searching for our team.",
    },
    {
        name: 'Anita Desai',
        role: 'State Dam Safety Officer, Maharashtra',
        avatar: 'AD',
        color: '#10b981',
        rating: 5,
        text: "The CWC Assistant gives our inspectors instant access to guidelines for risk assessment and instrumentation during field visits. The citation system ensures we always reference the correct official document.",
    },
    {
        name: 'Dr. S. Venkataraman',
        role: 'Research Director, National Water Academy',
        avatar: 'SV',
        color: '#8b5cf6',
        rating: 5,
        text: "DamChat understands the nuanced language of the Dam Safety Act 2021 far better than generic AI tools. It accurately distinguishes between prescriptive and advisory provisions — impressive for a specialised domain.",
    },
    {
        name: 'Meera Patel',
        role: 'Environmental Specialist, WAPCOS',
        avatar: 'MP',
        color: '#06b6d4',
        rating: 5,
        text: "Using DamChat to quickly cross-reference environmental safeguard requirements during project clearance reviews. It pulls relevant clauses from multiple guidelines simultaneously and cites everything properly.",
    },
    {
        name: 'Arjun Singh',
        role: 'Chief Engineer, BBMB',
        avatar: 'AS',
        color: '#f59e0b',
        rating: 5,
        text: "The Emergency Action Plan clarifications from DamChat are spot-on. Inundation zone definitions, flood routing protocols — all sourced directly from official SOPs. Exactly what field engineers need.",
    },
    {
        name: 'Priya Nair',
        role: 'Dam Safety Inspector, KSEB',
        avatar: 'PN',
        color: '#ec4899',
        rating: 5,
        text: "Both DamChat and the CWC Assistant are invaluable tools for our pre-monsoon inspection preparation. Having authoritative answers with source citations builds confidence when presenting findings to stakeholders.",
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" style={{ padding: '120px 24px', overflow: 'hidden', position: 'relative' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ textAlign: 'center', marginBottom: 72 }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 14px',
                    borderRadius: 99,
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    marginBottom: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#a78bfa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}>
                    ✦ Testimonials
                </div>
                <h2 style={{
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    fontWeight: 800,
                    letterSpacing: '-2px',
                    marginBottom: 16,
                    fontFamily: 'Space Grotesk, sans-serif',
                }}>
                    Trusted by dam safety
                    <span className="gradient-text"> professionals</span>
                </h2>
                <p style={{ color: 'rgba(200,200,240,0.68)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
                    From state dam safety officers to central government engineers — DamChat powers authoritative answers at every level.
                </p>
            </motion.div>

            {/* Testimonial grid */}
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                columns: '3 340px',
                columnGap: 24,
            }}>
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.07 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        style={{
                            background: 'rgba(255,255,255,0.025)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 20,
                            padding: 24,
                            marginBottom: 24,
                            breakInside: 'avoid',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'default',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = t.color + '25';
                            e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Quote icon */}
                        <div style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            opacity: 0.06,
                        }}>
                            <Quote size={48} color={t.color} fill={t.color} />
                        </div>

                        {/* Stars */}
                        <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                            {[...Array(t.rating)].map((_, j) => (
                                <Star key={j} size={13} color="#f59e0b" fill="#f59e0b" />
                            ))}
                        </div>

                        {/* Text */}
                        <p style={{
                            fontSize: 14,
                            color: 'rgba(220,220,255,0.78)',
                            lineHeight: 1.75,
                            marginBottom: 20,
                            fontStyle: 'italic',
                        }}>
                            "{t.text}"
                        </p>

                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 13,
                                fontWeight: 700,
                                color: 'white',
                                flexShrink: 0,
                                border: `2px solid ${t.color}30`,
                            }}>
                                {t.avatar}
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{t.name}</div>
                                <div style={{ fontSize: 12, color: 'rgba(200,200,240,0.6)' }}>{t.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
