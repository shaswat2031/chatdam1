'use client';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';

const plans = [
    {
        name: 'Starter',
        price: '0',
        period: 'forever',
        description: 'Perfect for personal use and exploring NeuralChat.',
        icon: Zap,
        color: '#3b82f6',
        features: [
            '100 messages / day',
            'GPT-3.5 Turbo model',
            'Basic file uploads',
            'Chat history (7 days)',
            'Standard response speed',
            'Email support',
        ],
        cta: 'Start Free',
        href: '/chat',
        popular: false,
    },
    {
        name: 'Pro',
        price: '19',
        period: 'per month',
        description: 'For power users who need unlimited AI assistance.',
        icon: Sparkles,
        color: '#8b5cf6',
        features: [
            'Unlimited messages',
            'GPT-4 Turbo + Claude 3',
            'Advanced file analysis',
            'Unlimited chat history',
            'Priority response speed',
            '24/7 priority support',
            'API access (10k calls)',
            'Custom personas',
        ],
        cta: 'Start Pro Trial',
        href: '/login',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '99',
        period: 'per month',
        description: 'Built for teams and organizations at scale.',
        icon: Crown,
        color: '#f59e0b',
        features: [
            'Unlimited everything',
            'All models + fine-tuning',
            'Team collaboration',
            'SSO & SAML integration',
            'Dedicated infrastructure',
            'SLA guarantee (99.99%)',
            'Unlimited API access',
            'Custom model training',
        ],
        cta: 'Contact Sales',
        href: '#',
        popular: false,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
            {/* Background */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                height: 400,
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
            }} />

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
                    ✦ Pricing
                </div>
                <h2 style={{
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    fontWeight: 800,
                    letterSpacing: '-2px',
                    marginBottom: 16,
                    fontFamily: 'Space Grotesk, sans-serif',
                }}>
                    Simple, transparent
                    <span className="gradient-text"> pricing</span>
                </h2>
                <p style={{ color: 'rgba(200,200,240,0.68)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
                    No hidden fees. Cancel anytime. Start free and upgrade when you're ready.
                </p>
            </motion.div>

            {/* Cards */}
            <div style={{
                maxWidth: 1100,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 24,
                alignItems: 'stretch',
            }}>
                {plans.map((plan, i) => {
                    const Icon = plan.icon;
                    return (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            style={{
                                position: 'relative',
                                borderRadius: 24,
                                padding: plan.popular ? '32px 28px' : '28px',
                                display: 'flex',
                                flexDirection: 'column',
                                background: plan.popular
                                    ? 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.08) 100%)'
                                    : 'rgba(255,255,255,0.025)',
                                border: plan.popular
                                    ? '1px solid rgba(139,92,246,0.35)'
                                    : '1px solid rgba(255,255,255,0.07)',
                                boxShadow: plan.popular ? '0 0 60px rgba(139,92,246,0.15)' : 'none',
                                transform: plan.popular ? 'scaleY(1.02)' : 'none',
                            }}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: -16,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                                    borderRadius: 999,
                                    padding: '6px 18px',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: 'white',
                                    whiteSpace: 'nowrap',
                                    letterSpacing: '0.05em',
                                }}>
                                    ⚡ MOST POPULAR
                                </div>
                            )}

                            {/* Plan header */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 12,
                                }}>
                                    <div style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: 12,
                                        background: `${plan.color}18`,
                                        border: `1px solid ${plan.color}30`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon size={20} color={plan.color} />
                                    </div>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>
                                        {plan.name}
                                    </h3>
                                </div>
                                <p style={{ fontSize: 13, color: 'rgba(200,200,240,0.62)', marginBottom: 20, lineHeight: 1.5 }}>
                                    {plan.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                                    <span style={{ fontSize: 14, color: 'rgba(200,200,240,0.6)', marginBottom: 6 }}>$</span>
                                    <span style={{
                                        fontSize: 52,
                                        fontWeight: 800,
                                        color: 'white',
                                        fontFamily: 'Space Grotesk',
                                        letterSpacing: '-2px',
                                        lineHeight: 1,
                                    }}>
                                        {plan.price}
                                    </span>
                                    <span style={{ fontSize: 13, color: 'rgba(200,200,240,0.55)', marginBottom: 8 }}>
                                        / {plan.period}
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

                            {/* Features */}
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                                {plan.features.map((feat) => (
                                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 6,
                                            background: `${plan.color}18`,
                                            border: `1px solid ${plan.color}30`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Check size={11} color={plan.color} strokeWidth={3} />
                                        </div>
                                        <span style={{ fontSize: 14, color: 'rgba(220,220,255,0.75)' }}>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link href={plan.href} style={{ textDecoration: 'none', marginTop: 28 }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        width: '100%',
                                        padding: '13px',
                                        borderRadius: 14,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: plan.popular
                                            ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                                            : 'rgba(255,255,255,0.07)',
                                        color: 'white',
                                        boxShadow: plan.popular ? '0 0 30px rgba(139,92,246,0.3)' : 'none',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {plan.cta} →
                                </motion.button>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
