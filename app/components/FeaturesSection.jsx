'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    Droplets, ShieldCheck, BookOpen, FileText,
    Quote, MapPin, FlaskConical, Leaf, Users, BadgeCheck
} from 'lucide-react';

// ── DamChat features ──────────────────────────────────────────────────────────
const damchatFeatures = [
    {
        icon: BookOpen,
        color: '#0ea5e9',
        bg: 'rgba(14,165,233,0.1)',
        title: 'Dam Safety Act 2021',
        description: 'Full coverage of every provision, section, and schedule of the Dam Safety Act 2021, with context-aware answers and precise citations.',
        badge: 'Legislative',
    },
    {
        icon: FileText,
        color: '#38bdf8',
        bg: 'rgba(56,189,248,0.1)',
        title: 'Gazette Notifications',
        description: 'Instant access to all official Gazette notifications related to dam safety regulations, rules, and amendments issued by the government.',
        badge: 'Regulatory',
    },
    {
        icon: MapPin,
        color: '#06b6d4',
        bg: 'rgba(6,182,212,0.1)',
        title: 'Inspection SOPs',
        description: 'Standard operating procedures for pre-monsoon, post-monsoon, and special safety inspections of large and medium dams.',
        badge: 'Field-Ready',
    },
    {
        icon: Quote,
        color: '#0284c7',
        bg: 'rgba(2,132,199,0.1)',
        title: 'Source-Cited Answers',
        description: 'Every response includes the exact document name and page number so you can verify and reference the original official source.',
        badge: 'Authoritative',
    },
];

// ── CWC Assistant features ─────────────────────────────────────────────────────
const cwcFeatures = [
    {
        icon: ShieldCheck,
        color: '#10b981',
        bg: 'rgba(16,185,129,0.1)',
        title: 'Risk Assessment',
        description: 'Guidelines for assessing and managing risks associated with dams — covering hazard classification, consequence analysis, and mitigation strategies.',
        badge: 'Safety',
    },
    {
        icon: Leaf,
        color: '#34d399',
        bg: 'rgba(52,211,153,0.1)',
        title: 'Environmental Safeguards',
        description: 'CWC guidelines for integrating environmental monitoring and clearance conditions into water resource project management.',
        badge: 'Environmental',
    },
    {
        icon: FlaskConical,
        color: '#059669',
        bg: 'rgba(5,150,105,0.1)',
        title: 'Instrumentation Standards',
        description: 'Expert guidance on dam instrumentation systems for monitoring seepage, pore pressure, displacement, and structural performance.',
        badge: 'Technical',
    },
    {
        icon: Users,
        color: '#6ee7b7',
        bg: 'rgba(110,231,183,0.1)',
        title: 'Capacity Building',
        description: 'CWC\'s framework for developing competent dam safety manpower and state-of-the-art technical infrastructure across India.',
        badge: 'Advisory',
    },
];

function FeatureCard({ feat, i }) {
    const Icon = feat.icon;
    return (
        <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, padding: '24px 26px',
                cursor: 'default', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = feat.color + '35';
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 30px ${feat.color}15`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Corner glow */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle, ${feat.color}12 0%, transparent 70%)`, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: feat.bg, border: `1px solid ${feat.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={feat.color} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: feat.color, background: feat.bg, border: `1px solid ${feat.color}22`, borderRadius: 999, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {feat.badge}
                </span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff', marginBottom: 8, fontFamily: 'Space Grotesk' }}>
                {feat.title}
            </h3>
            <p style={{ fontSize: 13.5, color: 'rgba(200,200,240,0.68)', lineHeight: 1.7, margin: 0 }}>
                {feat.description}
            </p>
        </motion.div>
    );
}

export default function FeaturesSection() {
    return (
        <section id="features" style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>

            {/* ── Banner image ── */}
            <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1 }}
                style={{
                    position: 'relative', maxWidth: 1200, margin: '0 auto 80px',
                    borderRadius: 28, overflow: 'hidden', height: 280,
                    boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <Image
                    src="/image_1475x963_2.jpg"
                    alt="Dam safety knowledge accessible to all — DamChat and CWC Assistant"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                    sizes="(max-width: 1248px) 100vw, 1200px"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(5,5,8,0.88) 0%, rgba(5,5,8,0.5) 55%, rgba(5,5,8,0.75) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 99, background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', marginBottom: 18, fontSize: 11.5, fontWeight: 700, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.1em', width: 'fit-content' }}>
                        ✦ Features
                    </div>
                    <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 12, fontFamily: 'Space Grotesk, sans-serif', color: '#f0f0ff', maxWidth: 520, lineHeight: 1.1 }}>
                        Two assistants,{' '}
                        <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #34d399 60%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            one mission
                        </span>
                    </h2>
                    <p style={{ color: 'rgba(224,224,255,0.7)', fontSize: 15.5, maxWidth: 460, lineHeight: 1.65 }}>
                        Dam safety knowledge made accessible — every answer backed by official CWC documents and government publications.
                    </p>
                </div>
            </motion.div>

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* ── DamChat section ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ marginBottom: 60 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(14,165,233,0.3)' }}>
                            <Droplets size={18} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk' }}>DamChat</div>
                            <div style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600 }}>Academic Dam Safety Assistant</div>
                        </div>
                        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, rgba(14,165,233,0.3), transparent)', marginLeft: 8 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                        {damchatFeatures.map((feat, i) => <FeatureCard key={feat.title} feat={feat} i={i} />)}
                    </div>
                </motion.div>

                {/* ── CWC Assistant section ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#059669,#065f46)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(5,150,105,0.3)' }}>
                            <ShieldCheck size={18} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk' }}>CWC Assistant</div>
                            <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>Central Water Commission Expert</div>
                        </div>
                        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, rgba(16,185,129,0.3), transparent)', marginLeft: 8 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                        {cwcFeatures.map((feat, i) => <FeatureCard key={feat.title} feat={feat} i={i} />)}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
