'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Sparkles, Eye, EyeOff, Mail, Lock, User, ArrowRight,
    Github, Chrome, CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function FloatingShape({ style }) {
    return (
        <div style={{
            position: 'absolute',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.08))',
            border: '1px solid rgba(139,92,246,0.1)',
            animation: 'float 8s ease-in-out infinite',
            pointerEvents: 'none',
            ...style,
        }} />
    );
}

function InputField({ icon: Icon, label, type, value, onChange, placeholder, id, isDark }) {
    const [focused, setFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);

    return (
        <div style={{ marginBottom: 16 }}>
            <label htmlFor={id} style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 500,
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,20,70,0.6)',
                marginBottom: 8,
            }}>
                {label}
            </label>
            <div style={{
                position: 'relative',
                transition: 'all 0.2s',
            }}>
                <Icon size={16} style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focused ? '#8b5cf6' : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,20,70,0.3)'),
                    transition: 'color 0.2s',
                    pointerEvents: 'none',
                }} />
                <input
                    id={id}
                    type={type === 'password' ? (showPass ? 'text' : 'password') : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'name'}
                    style={{
                        width: '100%',
                        background: focused ? (isDark ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)') : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(20,20,70,0.03)'),
                        border: `1px solid ${focused ? 'rgba(139,92,246,0.5)' : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,70,0.1)')}`,
                        borderRadius: 12,
                        padding: '12px 16px 12px 42px',
                        color: isDark ? 'white' : '#0d0d2e',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none',
                        transition: 'all 0.2s',
                    }}
                    className="input-field"
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        style={{
                            position: 'absolute',
                            right: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,20,70,0.3)',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function LoginPage() {
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { isDark } = useTheme();

    const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1600));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push('/chat'), 1200);
    };

    return (
        <main style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--bg-primary)',
        }}>
            {/* LEFT – Branding panel */}
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.08) 50%, rgba(6,182,212,0.05) 100%)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
            }}>
                {/* Background gradient */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.2) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 70% 70%, rgba(59,130,246,0.15) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />

                {/* Grid lines */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                    pointerEvents: 'none',
                }} />

                {/* Floating shapes */}
                <FloatingShape style={{ width: 200, height: 200, top: '15%', left: '10%', animationDelay: '0s' }} />
                <FloatingShape style={{ width: 150, height: 150, bottom: '20%', right: '8%', animationDelay: '-3s', animationDuration: '11s' }} />
                <FloatingShape style={{ width: 100, height: 100, top: '55%', left: '60%', animationDelay: '-6s', animationDuration: '9s' }} />

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}
                >
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <div style={{
                            height: 46, width: 'auto',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 12,
                            padding: '4px 10px',
                            background: 'rgba(255,255,255,0.92)',
                            boxShadow: '0 0 24px rgba(139,92,246,0.3)',
                        }}>
                            <img
                                src="/DamChat Logo.png"
                                alt="DamChat Logo"
                                style={{ height: 38, width: 'auto', objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                    </Link>
                </motion.div>

                {/* Center content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '5px 14px',
                        borderRadius: 99,
                        background: 'rgba(139,92,246,0.15)',
                        border: '1px solid rgba(139,92,246,0.3)',
                        marginBottom: 24,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#c4b5fd',
                    }}>
                        ✦ Trusted by 50K+ users
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(32px, 4vw, 52px)',
                        fontWeight: 800,
                        letterSpacing: '-2px',
                        lineHeight: 1.1,
                        marginBottom: 20,
                        fontFamily: 'Space Grotesk, sans-serif',
                    }}>
                        Your AI,
                        <br />
                        <span className="gradient-text">Your Way</span>
                    </h1>
                    <p style={{
                        fontSize: 16,
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.7,
                        maxWidth: 360,
                    }}>
                        Join professionals who use DamChat to manage dam safety, answer regulatory queries, and work smarter.
                    </p>

                    {/* Features list */}
                    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            'Context-aware memory that learns your style',
                            'Support for 100+ languages and dialects',
                            'No data used for model training — ever',
                        ].map((item) => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 6,
                                    background: 'rgba(139,92,246,0.2)',
                                    border: '1px solid rgba(139,92,246,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <CheckCircle2 size={12} color="#a78bfa" />
                                </div>
                                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom testimonial */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 16,
                        padding: 20,
                    }}
                >
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>
                        "DamChat has completely transformed how we reference CWC guidelines and standard operating procedures."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            color: 'white',
                        }}>SC</div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Sarah Chen</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Lead Engineer @ Stripe</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT – Auth form */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 40px',
                background: isDark ? 'rgba(5,5,10,0.6)' : 'white',
                position: 'relative',
                overflowY: 'auto',
            }}>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{ width: '100%', maxWidth: 420 }}
                >
                    {/* Tab switcher */}
                    <div style={{
                        display: 'flex',
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'transparent',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,70,0.1)'}`,
                        borderRadius: 14,
                        padding: 4,
                        marginBottom: 36,
                    }}>
                        {['login', 'signup'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: 10,
                                    border: 'none',
                                    background: mode === m
                                        ? (isDark ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.2))' : 'rgba(139,92,246,0.1)')
                                        : 'transparent',
                                    color: mode === m ? (isDark ? 'white' : '#8b5cf6') : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(20,20,70,0.4)'),
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {m === 'login' ? 'Sign In' : 'Create Account'}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '40px 0' }}
                            >
                                <div style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    boxShadow: '0 0 30px rgba(16,185,129,0.4)',
                                }}>
                                    <CheckCircle2 size={32} color="white" />
                                </div>
                                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 8 }}>
                                    {mode === 'login' ? 'Welcome back!' : 'Account created!'}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Redirecting to your dashboard...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div style={{ marginBottom: 32 }}>
                                    <h2 style={{
                                        fontSize: 28,
                                        fontWeight: 800,
                                        color: isDark ? 'white' : '#0d0d2e',
                                        marginBottom: 8,
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        letterSpacing: '-0.5px',
                                    }}>
                                        {mode === 'login' ? 'Welcome back' : 'Create your account'}
                                    </h2>
                                    <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(20,20,70,0.5)', fontSize: 14 }}>
                                        {mode === 'login'
                                            ? 'Sign in to continue your conversation'
                                            : 'Start chatting with AI in seconds'
                                        }
                                    </p>
                                </div>

                                {/* Social auth buttons */}
                                <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleSubmit}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            padding: '11px',
                                            borderRadius: 12,
                                            background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,70,0.1)'}`,
                                            color: isDark ? 'white' : '#0d0d2e',
                                            fontSize: 13,
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,70,0.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'white'}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Google
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleSubmit}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            padding: '11px',
                                            borderRadius: 12,
                                            background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,70,0.1)'}`,
                                            color: isDark ? 'white' : '#0d0d2e',
                                            fontSize: 13,
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,70,0.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'white'}
                                    >
                                        <Github size={16} />
                                        GitHub
                                    </motion.button>
                                </div>

                                {/* Divider */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                    marginBottom: 24,
                                }}>
                                    <div style={{ flex: 1, height: 1, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,70,0.1)' }} />
                                    <span style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(20,20,70,0.4)', whiteSpace: 'nowrap' }}>
                                        or continue with email
                                    </span>
                                    <div style={{ flex: 1, height: 1, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,70,0.1)' }} />
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit}>
                                    {mode === 'signup' && (
                                        <InputField
                                            id="name"
                                            icon={User}
                                            label="Full Name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange('name')}
                                            placeholder="John Doe"
                                            isDark={isDark}
                                        />
                                    )}
                                    <InputField
                                        id="email"
                                        icon={Mail}
                                        label="Email address"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange('email')}
                                        placeholder="you@company.com"
                                        isDark={isDark}
                                    />
                                    <InputField
                                        id="password"
                                        icon={Lock}
                                        label="Password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange('password')}
                                        placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
                                        isDark={isDark}
                                    />

                                    {mode === 'login' && (
                                        <div style={{ textAlign: 'right', marginBottom: 20, marginTop: -8 }}>
                                            <a href="#" style={{
                                                fontSize: 13,
                                                color: '#8b5cf6',
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                            }}>
                                                Forgot password?
                                            </a>
                                        </div>
                                    )}

                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 30px rgba(139,92,246,0.4)' } : {}}
                                        whileTap={!loading ? { scale: 0.98 } : {}}
                                        style={{
                                            width: '100%',
                                            padding: '13px',
                                            borderRadius: 14,
                                            background: loading
                                                ? 'rgba(139,92,246,0.4)'
                                                : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                                            border: 'none',
                                            color: 'white',
                                            fontSize: 15,
                                            fontWeight: 700,
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            boxShadow: '0 0 20px rgba(139,92,246,0.25)',
                                            marginTop: 8,
                                            fontFamily: 'inherit',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <div style={{
                                                    width: 16,
                                                    height: 16,
                                                    border: '2px solid rgba(255,255,255,0.3)',
                                                    borderTop: '2px solid white',
                                                    borderRadius: '50%',
                                                    animation: 'spin-slow 0.8s linear infinite',
                                                }} />
                                                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                                            </>
                                        ) : (
                                            <>
                                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                                                <ArrowRight size={16} />
                                            </>
                                        )}
                                    </motion.button>
                                </form>

                                {mode === 'signup' && (
                                    <p style={{
                                        fontSize: 12,
                                        color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(20,20,70,0.5)',
                                        textAlign: 'center',
                                        marginTop: 16,
                                        lineHeight: 1.5,
                                    }}>
                                        By creating an account, you agree to our{' '}
                                        <a href="#" style={{ color: '#8b5cf6', textDecoration: 'none' }}>Terms of Service</a>{' '}
                                        and{' '}
                                        <a href="#" style={{ color: '#8b5cf6', textDecoration: 'none' }}>Privacy Policy</a>.
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
