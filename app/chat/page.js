'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Sparkles, Send, Plus, ChevronLeft, Settings,
    Trash2, Copy, Check, Paperclip, User, MessageSquare,
    RefreshCw, ThumbsUp, ThumbsDown, FileText, ShieldCheck,
    Droplets, BookOpen, Menu, ChevronDown, ArrowRight
} from 'lucide-react';

// ── Bot definitions ────────────────────────────────────────────────────────────
const BOTS = {
    damchat: {
        id: 'damchat',
        name: 'DamChat',
        tagline: 'Academic Dam Safety Assistant',
        description:
            'DamChat answers questions specifically related to dam safety, dam regulations, and related academic topics using official PDFs and documents — including the Dam Safety Act 2021, Gazette notifications, and standard operating procedures. Every fact is cited with its source and page number.',
        icon: Droplets,
        gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
        glow: 'rgba(14,165,233,0.35)',
        accent: '#0ea5e9',
        accentSoft: 'rgba(14,165,233,0.12)',
        accentBorder: 'rgba(14,165,233,0.3)',
        starters: [
            { icon: BookOpen, label: 'Dam Safety Act 2021', prompt: 'What are the key provisions of the Dam Safety Act 2021?' },
            { icon: FileText, label: 'Gazette Notifications', prompt: 'Summarise the latest Gazette notifications related to dam safety regulations.' },
            { icon: ShieldCheck, label: 'Safety Inspection', prompt: 'What are the standard safety inspection procedures for large dams?' },
            { icon: Droplets, label: 'SOP Overview', prompt: 'Explain the standard operating procedures for dam emergency action plans.' },
        ],
        welcomeTitle: 'Hello, I\'m DamChat',
        welcomeSub: 'Your academic guide to dam safety, regulations, and official SOPs. Ask me anything — every answer comes with source citations.',
        placeholder: 'Ask about dam safety, regulations, or SOPs…',
        responses: [
            "Based on the **Dam Safety Act 2021**, Section 10 mandates that every dam owner shall carry out regular inspections. The National Committee on Dam Safety (NCDS) is responsible for evolving policies and standards.\n\n*(Source: Dam Safety Act 2021, Page 8)*",
            "According to the **Guidelines for Safety Inspection of Dams** (Page 284), pre-monsoon and post-monsoon inspections are mandatory for all large dams. The inspection team must include a dam safety expert and a structural engineer.\n\n- Visual inspection of spillway gates\n- Seepage measurement at gallery drains\n- Structural crack assessment\n\n*(Source: Guidelines for Safety Inspection of Dams, Page 287)*",
            "The **Standard Operating Procedures** for Emergency Action Plans require dam owners to define three inundation zones:\n\n1. **Zone A** — Immediate danger zone (0–2 hrs flood travel time)\n2. **Zone B** — Secondary danger zone (2–6 hrs)\n3. **Zone C** — Warning zone (6+ hrs)\n\n*(Source: CWC Emergency Action Plan Guidelines, Page 45)*",
        ],
    },
    cwc: {
        id: 'cwc',
        name: 'CWC Assistant',
        tagline: 'Central Water Commission Expert',
        description:
            'The CWC Assistant provides expert advisory on matters relating to dam safety, water resources management, environmental monitoring, policy and quality assurance, and capacity building — drawing from the official CWC guidelines and government publications.',
        icon: ShieldCheck,
        gradient: 'linear-gradient(135deg, #059669, #065f46)',
        glow: 'rgba(5,150,105,0.35)',
        accent: '#10b981',
        accentSoft: 'rgba(16,185,129,0.12)',
        accentBorder: 'rgba(16,185,129,0.3)',
        starters: [
            { icon: ShieldCheck, label: 'CWC Role & Mission', prompt: 'What is the vision and mission of the Central Water Commission?' },
            { icon: FileText, label: 'Environmental Guidelines', prompt: 'Explain CWC\'s role in environmental monitoring for water resource projects.' },
            { icon: Droplets, label: 'Risk Management', prompt: 'How does the CWC assess and manage risks associated with large dams?' },
            { icon: BookOpen, label: 'Instrumentation', prompt: 'What are the CWC guidelines for instrumentation of large dams?' },
        ],
        welcomeTitle: 'Hello, I\'m CWC Assistant',
        welcomeSub: 'Your expert on the Central Water Commission — dam safety advisories, water resource management, environmental safeguards, and policy guidance.',
        placeholder: 'Ask about CWC guidelines, dam management, or policy…',
        responses: [
            "The **Central Water Commission (CWC)** is a premier technical organisation under the Ministry of Water Resources. Its vision is to remain a premier organisation with the best technical and managerial expertise for providing advisory services on dam safety and water resources management.\n\n*(Source: Guidelines for Safety Inspection of Dams, Page 284)*",
            "CWC plays a significant role in **integrating environmental concerns** into water resources development. It coordinates with the Ministry of Environment & Forests and State authorities to monitor and implement environmental safeguards.\n\nKey responsibilities include:\n- Environmental Monitoring Committees at central, state, and project levels\n- Implementation of safeguards stipulated during project clearance\n- Water resources impact assessments\n\n*(Source: Guidelines for Environment, Page 11)*",
            "According to the **Guidelines for Assessing and Managing Risks Associated with Dams** (Page 426), the CWC's capacity-building mandate includes:\n\n1. Developing competent manpower with state-of-the-art technical infrastructure\n2. Providing expert advisory to State Dam Safety Organisations (SDSOs)\n3. Technical support for dam owners and operating agencies\n\n*(Source: Guidelines for Assessing and Managing Risks Associated with Dams, Page 426)*",
        ],
    },
};

// ── Chat sidebar history items ─────────────────────────────────────────────────
const INITIAL_HISTORY = [
    { id: 1, title: 'Dam Safety Act provisions', date: 'Today', bot: 'damchat' },
    { id: 2, title: 'CWC environmental guidelines', date: 'Today', bot: 'cwc' },
    { id: 3, title: 'Monsoon inspection SOP', date: 'Yesterday', bot: 'damchat' },
    { id: 4, title: 'Risk assessment framework', date: 'Yesterday', bot: 'cwc' },
];

// ── Typing indicator ───────────────────────────────────────────────────────────
function TypingIndicator({ bot }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
        >
            <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: bot.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: `0 0 12px ${bot.glow}`,
            }}>
                <bot.icon size={14} color="white" />
            </div>
            <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px 16px 16px 16px',
                padding: '14px 18px',
                display: 'flex', gap: 5, alignItems: 'center',
            }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
            </div>
        </motion.div>
    );
}

// ── Message bubble ─────────────────────────────────────────────────────────────
function MessageBubble({ message, bot }) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

    const copyText = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, i) => {
            if (part.startsWith('```')) {
                const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
                const lang = match?.[1] || 'code';
                const code = match?.[2] || part.slice(3, -3);
                return (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, margin: '12px 0', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <span style={{ fontSize: 12, color: 'rgba(200,200,240,0.55)', fontFamily: 'monospace' }}>{lang}</span>
                            <button onClick={copyText} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 6 }}>
                                {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <pre style={{ margin: 0, padding: '16px', fontSize: 13, lineHeight: 1.6, color: '#e2e8f0', fontFamily: "'Fira Code', monospace", overflowX: 'auto', whiteSpace: 'pre' }}>
                            <code>{code.trim()}</code>
                        </pre>
                    </div>
                );
            }
            const lines = part.split('\n');
            return lines.map((line, j) => {
                let rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:white;font-weight:600">$1</strong>');
                rendered = rendered.replace(/\*(.*?)\*/g, '<em>$1</em>');
                if (rendered.startsWith('- ')) {
                    return (
                        <div key={`${i}-${j}`} style={{ display: 'flex', gap: 10, margin: '4px 0' }}>
                            <span style={{ color: bot.accent, flexShrink: 0, marginTop: 2 }}>•</span>
                            <span dangerouslySetInnerHTML={{ __html: rendered.slice(2) }} />
                        </div>
                    );
                }
                const numMatch = rendered.match(/^(\d+)\. (.*)/);
                if (numMatch) {
                    return (
                        <div key={`${i}-${j}`} style={{ display: 'flex', gap: 10, margin: '4px 0' }}>
                            <span style={{ color: bot.accent, flexShrink: 0, minWidth: 20, fontWeight: 600 }}>{numMatch[1]}.</span>
                            <span dangerouslySetInnerHTML={{ __html: numMatch[2] }} />
                        </div>
                    );
                }
                return line ? (
                    <p key={`${i}-${j}`} style={{ margin: '6px 0', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: rendered }} />
                ) : <br key={`${i}-${j}`} />;
            });
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', gap: 12, alignItems: 'flex-start', padding: '4px 0' }}
        >
            {!isUser && (
                <div style={{ width: 32, height: 32, borderRadius: 10, background: bot.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 12px ${bot.glow}`, marginTop: 2 }}>
                    <bot.icon size={14} color="white" />
                </div>
            )}
            <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{
                    background: isUser ? bot.gradient : 'rgba(255,255,255,0.04)',
                    border: isUser ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                    padding: '12px 16px', fontSize: 14,
                    color: isUser ? 'white' : 'rgba(255,255,255,0.82)',
                    lineHeight: 1.65,
                    boxShadow: isUser ? `0 4px 20px ${bot.glow}` : 'none',
                }}>
                    {renderContent(message.content)}
                </div>
                {!isUser && (
                    <div style={{ display: 'flex', gap: 4, opacity: 0, transition: 'opacity 0.2s' }} className="message-actions">
                        {[{ icon: ThumbsUp, label: 'Like' }, { icon: ThumbsDown, label: 'Dislike' }, { icon: Copy, label: 'Copy', action: copyText }, { icon: RefreshCw, label: 'Regenerate' }].map(({ icon: Icon, label, action }) => (
                            <button key={label} onClick={action} title={label}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.15s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                            ><Icon size={12} /></button>
                        ))}
                    </div>
                )}
            </div>
            {isUser && (
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #6d28d9, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <User size={14} color="white" />
                </div>
            )}
        </motion.div>
    );
}

// ── Bot selector screen ────────────────────────────────────────────────────────
function BotSelector({ onSelect }) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 600);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const logoSize = isMobile ? 64 : 100;
    const imgSize = isMobile ? 52 : 84;
    const pad = isMobile ? '18px 16px' : '32px 24px';
    const gap = isMobile ? 8 : 14;
    const mb = isMobile ? 20 : 36;
    const outerPad = isMobile ? '16px 14px' : '40px 24px';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: outerPad, overflow: 'auto',
            }}
        >
            {/* ── Centered institution logos ── */}
            <motion.div
                initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 44, width: '100%', maxWidth: 600 }}
            >
                {/* Logo strip */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
                    borderRadius: 20, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    marginBottom: mb,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}>
                    {/* ICED half */}
                    <div style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap, padding: pad,
                        background: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(6,182,212,0.06) 100%)',
                        borderRight: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        <div style={{ width: logoSize, height: logoSize, borderRadius: 16, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6, boxShadow: '0 0 24px rgba(14,165,233,0.25)' }}>
                            <Image src="/ICED.png" alt="ICED" width={imgSize} height={imgSize} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: '#7dd3fc', marginBottom: 2 }}>ICED</div>
                            {!isMobile && <div style={{ fontSize: 11, color: 'rgba(200,200,240,0.5)', lineHeight: 1.4 }}>International Centre<br />for Dams</div>}
                        </div>
                    </div>

                    {/* IIT Roorkee half */}
                    <div style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap, padding: pad,
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)',
                    }}>
                        <div style={{ width: logoSize, height: logoSize, borderRadius: 16, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6, boxShadow: '0 0 24px rgba(16,185,129,0.25)' }}>
                            <Image src="/IITR_logo.gif" alt="IIT Roorkee" width={imgSize} height={imgSize} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
                        </div>
                        <div>
                            <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: '#6ee7b7', marginBottom: 2 }}>IIT Roorkee</div>
                            {!isMobile && <div style={{ fontSize: 11, color: 'rgba(200,200,240,0.5)', lineHeight: 1.4 }}>Indian Institute of<br />Technology Roorkee</div>}
                        </div>
                    </div>
                </div>

                <h1 style={{ fontSize: isMobile ? '22px' : 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-1px', marginBottom: 10 }}>
                    Which assistant do you need?
                </h1>
                <p style={{ color: 'rgba(200,200,240,0.6)', fontSize: isMobile ? 13 : 14.5, maxWidth: 460, margin: '0 auto', lineHeight: 1.6 }}>
                    Both assistants are powered by official CWC documents and government publications. Pick the one that fits your query.
                </p>
            </motion.div>

            {/* Bot cards — always 2 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 10 : 20, width: '100%', maxWidth: 860 }}>
                {Object.values(BOTS).map((bot, idx) => {
                    const BotIcon = bot.icon;
                    return (
                        <motion.button
                            key={bot.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onSelect(bot.id)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0,
                                padding: 0, borderRadius: isMobile ? 16 : 22, overflow: 'hidden',
                                background: 'rgba(255,255,255,0.03)',
                                border: `1px solid ${bot.accentBorder}`,
                                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                                boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                                transition: 'box-shadow 0.3s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 32px ${bot.glow}`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`; }}
                        >
                            {/* Card header */}
                            <div style={{ width: '100%', padding: isMobile ? '14px 14px 12px' : '24px 24px 18px', background: bot.accentSoft, borderBottom: `1px solid ${bot.accentBorder}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, marginBottom: isMobile ? 0 : 14 }}>
                                    <div style={{ width: isMobile ? 34 : 46, height: isMobile ? 34 : 46, borderRadius: isMobile ? 10 : 14, background: bot.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${bot.glow}`, flexShrink: 0 }}>
                                        <BotIcon size={isMobile ? 16 : 22} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: isMobile ? 13 : 17, fontWeight: 800, color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.2 }}>{bot.name}</div>
                                        <div style={{ fontSize: isMobile ? 10 : 11.5, color: bot.accent, fontWeight: 600, marginTop: 2 }}>{bot.tagline}</div>
                                    </div>
                                </div>
                                {!isMobile && (
                                    <p style={{ fontSize: 13, color: 'rgba(200,200,240,0.7)', lineHeight: 1.6, margin: 0 }}>
                                        {bot.description}
                                    </p>
                                )}
                            </div>

                            {/* Sample starters */}
                            <div style={{ width: '100%', padding: isMobile ? '10px 14px 14px' : '16px 24px 22px' }}>
                                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(200,200,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                                    {isMobile ? 'Topics' : 'Sample questions'}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {bot.starters.slice(0, isMobile ? 2 : 3).map((s) => (
                                        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                            <div style={{ width: 18, height: 18, borderRadius: 5, background: bot.accentSoft, border: `1px solid ${bot.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <s.icon size={9} color={bot.accent} />
                                            </div>
                                            <span style={{ fontSize: isMobile ? 11 : 12.5, color: 'rgba(200,200,240,0.65)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isMobile ? 'nowrap' : 'normal' }}>{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: isMobile ? 10 : 16, gap: 4 }}>
                                    <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 600, color: bot.accent }}>Start</span>
                                    <ArrowRight size={isMobile ? 11 : 13} color={bot.accent} />
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ── Main chat page ─────────────────────────────────────────────────────────────
export default function ChatPage() {
    const [selectedBotId, setSelectedBotId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [history, setHistory] = useState(INITIAL_HISTORY);
    const [activeChat, setActiveChat] = useState(null);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    // Detect mobile and auto-collapse sidebar
    useEffect(() => {
        const check = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const bot = selectedBotId ? BOTS[selectedBotId] : null;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollH = Math.min(textareaRef.current.scrollHeight, 160);
            textareaRef.current.style.height = scrollH + 'px';
        }
    }, [input]);

    const sendMessage = useCallback(async (content = input) => {
        if (!content.trim() || isTyping || !bot) return;
        setInput('');
        const userMsg = { id: Date.now(), role: 'user', content: content.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        const delay = 900 + Math.random() * 700;
        await new Promise((r) => setTimeout(r, delay));

        const aiContent = bot.responses[Math.floor(Math.random() * bot.responses.length)];
        setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', content: aiContent }]);
        setIsTyping(false);

        if (messages.length === 0) {
            const title = content.slice(0, 40) + (content.length > 40 ? '...' : '');
            setHistory((prev) => [{ id: Date.now(), title, date: 'Today', bot: bot.id }, ...prev]);
        }
    }, [input, isTyping, messages.length, bot]);

    const newChat = () => { setMessages([]); setActiveChat(null); };
    const switchBot = () => { setMessages([]); setActiveChat(null); setSelectedBotId(null); };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    const handleSelectBot = (id) => {
        setSelectedBotId(id);
        setMessages([]);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-primary)', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>

            {/* ── Mobile backdrop ── */}
            {isMobile && sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 99, backdropFilter: 'blur(2px)' }}
                />
            )}

            {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
            <motion.aside
                animate={{ x: sidebarOpen ? 0 : -280, opacity: sidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{
                    background: 'rgba(10,10,20,0.97)',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', flexShrink: 0,
                    position: isMobile ? 'fixed' : 'relative',
                    top: 0, left: 0, bottom: 0,
                    zIndex: isMobile ? 100 : 'auto',
                    width: 260,
                    pointerEvents: sidebarOpen ? 'all' : 'none',
                }}
            >
                <div style={{ width: 260, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Header */}
                    <div style={{ padding: '14px 12px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {/* Institution logos row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                                {/* ICED logo */}
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, flexShrink: 0, boxShadow: '0 0 10px rgba(14,165,233,0.2)' }}>
                                    <Image src="/ICED.png" alt="ICED" width={30} height={30} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                {/* divider pip */}
                                <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
                                {/* IIT Roorkee logo */}
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, flexShrink: 0, boxShadow: '0 0 10px rgba(16,185,129,0.2)' }}>
                                    <Image src="/IITR_logo.gif" alt="IIT Roorkee" width={30} height={30} style={{ width: '100%', height: '100%', objectFit: 'contain' }} unoptimized />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(200,200,240,0.45)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>ICED · IIT Roorkee</div>
                                </div>
                            </div>
                        </div>
                        {/* Brand link */}
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg,#0ea5e9,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(14,165,233,0.3)', flexShrink: 0 }}>
                                <Droplets size={13} color="white" />
                            </div>
                            <span style={{ fontSize: 15, fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>Dam<span style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chat</span></span>
                        </Link>
                    </div>

                    {/* Bot switcher pills */}
                    <div style={{ padding: '12px 8px 8px' }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(200,200,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px 8px' }}>Assistants</p>
                        {Object.values(BOTS).map((b) => {
                            const BIcon = b.icon;
                            const isActive = selectedBotId === b.id;
                            return (
                                <motion.button
                                    key={b.id}
                                    whileHover={{ background: isActive ? b.accentSoft : 'rgba(255,255,255,0.05)' }}
                                    onClick={() => handleSelectBot(b.id)}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '9px 10px', borderRadius: 10, border: 'none',
                                        background: isActive ? b.accentSoft : 'transparent',
                                        cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s',
                                        outline: isActive ? `1px solid ${b.accentBorder}` : 'none',
                                        marginBottom: 4,
                                    }}
                                >
                                    <div style={{ width: 26, height: 26, borderRadius: 8, background: isActive ? b.gradient : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <BIcon size={13} color={isActive ? 'white' : 'rgba(200,200,240,0.5)'} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#f0f0ff' : 'rgba(200,200,240,0.7)' }}>{b.name}</div>
                                        <div style={{ fontSize: 11, color: isActive ? b.accent : 'rgba(200,200,240,0.4)' }}>{b.tagline}</div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* New chat */}
                    <div style={{ padding: '4px 8px 8px' }}>
                        <motion.button
                            onClick={newChat} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '9px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.12))', border: '1px solid rgba(139,92,246,0.3)', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                            <Plus size={14} /> New Chat
                        </motion.button>
                    </div>

                    {/* History */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(200,200,240,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 8px 6px' }}>Recent</p>
                        {history.map((chat) => {
                            const chatBot = BOTS[chat.bot];
                            const CIcon = chatBot?.icon || MessageSquare;
                            return (
                                <motion.button
                                    key={chat.id}
                                    onClick={() => { setActiveChat(chat.id); if (chat.bot) setSelectedBotId(chat.bot); }}
                                    whileHover={{ background: 'rgba(255,255,255,0.05)' }}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 10, border: 'none', background: activeChat === chat.id ? 'rgba(139,92,246,0.1)' : 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'background 0.15s' }}
                                >
                                    <CIcon size={13} color={chatBot?.accent || 'rgba(200,200,240,0.4)'} style={{ flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 12.5, fontWeight: 500, color: activeChat === chat.id ? 'white' : 'rgba(220,220,255,0.75)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.title}</div>
                                        <div style={{ fontSize: 10.5, color: 'rgba(200,200,240,0.4)' }}>{chat.date}</div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', borderRadius: 10, background: 'none', border: 'none', color: 'rgba(200,200,240,0.65)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(200,200,240,0.65)'}
                        ><Settings size={15} /> Settings</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>U</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>User</div>
                                <div style={{ fontSize: 11, color: 'rgba(200,200,240,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>user@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* ── MAIN AREA ─────────────────────────────────────────────────────── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }} className="chat-bg">

                {/* Top bar */}
                <header style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px 0 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,5,10,0.6)', backdropFilter: 'blur(20px)', flexShrink: 0, gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                            {sidebarOpen ? <ChevronLeft size={15} /> : <Menu size={15} />}
                        </button>
                        {bot && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 10px', borderRadius: 9, background: bot.accentSoft, border: `1px solid ${bot.accentBorder}`, minWidth: 0, overflow: 'hidden' }}>
                                <div style={{ width: 7, height: 7, borderRadius: '50%', background: bot.accent, boxShadow: `0 0 5px ${bot.accent}`, flexShrink: 0 }} />
                                <span style={{ fontSize: 13, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>{bot.name}</span>
                                {!isMobile && <span style={{ fontSize: 11, color: bot.accent, whiteSpace: 'nowrap' }}>{bot.tagline}</span>}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        {bot && (
                            <button onClick={switchBot} title="Switch assistant"
                                style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 5, padding: isMobile ? '6px 8px' : '6px 10px', borderRadius: 9, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                <ChevronDown size={13} />
                                {!isMobile && ' Switch Bot'}
                            </button>
                        )}
                        <button onClick={newChat} title="Clear chat"
                            style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 5, padding: isMobile ? '6px 8px' : '6px 10px', borderRadius: 9, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                            <Trash2 size={13} />
                            {!isMobile && ' Clear'}
                        </button>
                        {!isMobile && <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer' }}>U</div>}
                    </div>
                </header>

                {/* Content: bot selector or chat */}
                <AnimatePresence mode="wait">
                    {!selectedBotId ? (
                        <BotSelector key="selector" onSelect={handleSelectBot} />
                    ) : (
                        <motion.div key={`chat-${selectedBotId}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                            {/* Messages area */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                                {messages.length === 0 ? (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: isMobile ? '20px 14px' : '40px 24px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
                                        <div style={{ width: isMobile ? 52 : 68, height: isMobile ? 52 : 68, borderRadius: isMobile ? 16 : 22, background: bot.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 14 : 24, boxShadow: `0 0 40px ${bot.glow}` }}>
                                            <bot.icon size={isMobile ? 22 : 30} color="white" />
                                        </div>
                                        <h2 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, color: 'white', marginBottom: isMobile ? 8 : 10, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px' }}>
                                            {bot.welcomeTitle}
                                        </h2>
                                        <p style={{ color: 'rgba(200,200,240,0.65)', fontSize: isMobile ? 13 : 14.5, marginBottom: isMobile ? 20 : 36, lineHeight: 1.65, maxWidth: 480 }}>
                                            {bot.welcomeSub}
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 8 : 12, width: '100%' }}>
                                            {bot.starters.map((starter) => {
                                                const SIcon = starter.icon;
                                                return (
                                                    <motion.button
                                                        key={starter.label}
                                                        onClick={() => sendMessage(starter.prompt)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: isMobile ? 6 : 8, padding: isMobile ? '10px 12px' : '14px 16px', borderRadius: isMobile ? 12 : 14, background: bot.accentSoft, border: `1px solid ${bot.accentBorder}`, color: 'white', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.2s' }}
                                                    >
                                                        <SIcon size={isMobile ? 13 : 16} color={bot.accent} />
                                                        <div>
                                                            <div style={{ fontSize: isMobile ? 11.5 : 13, fontWeight: 600, marginBottom: isMobile ? 0 : 3, color: '#f0f0ff', lineHeight: 1.3 }}>{starter.label}</div>
                                                            {!isMobile && <div style={{ fontSize: 12, color: 'rgba(200,200,240,0.6)', lineHeight: 1.4 }}>{starter.prompt.slice(0, 55)}…</div>}
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760, margin: '0 auto', width: '100%' }}>
                                        {messages.map((msg) => (
                                            <MessageBubble key={msg.id} message={msg} bot={bot} />
                                        ))}
                                        <AnimatePresence>
                                            {isTyping && <TypingIndicator bot={bot} />}
                                        </AnimatePresence>
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div style={{ padding: '16px 24px 24px', background: 'rgba(5,5,10,0.5)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                                <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '12px 12px 12px 16px', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                                        onFocusCapture={(e) => { e.currentTarget.style.borderColor = bot.accentBorder; e.currentTarget.style.boxShadow = `0 0 0 3px ${bot.accentSoft}`; }}
                                        onBlurCapture={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <button onClick={() => fileInputRef.current?.click()} title="Attach file"
                                            style={{ flexShrink: 0, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', alignSelf: 'flex-end', marginBottom: 2 }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                                        ><Paperclip size={18} /></button>
                                        <input ref={fileInputRef} type="file" style={{ display: 'none' }} accept="image/*,.pdf,.txt" />

                                        <textarea
                                            ref={textareaRef}
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder={bot.placeholder}
                                            rows={1}
                                            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: 15, fontFamily: 'inherit', resize: 'none', padding: '4px 12px', lineHeight: 1.6, maxHeight: 160, overflowY: 'auto' }}
                                        />

                                        <motion.button
                                            onClick={() => sendMessage()}
                                            disabled={!input.trim() || isTyping}
                                            whileHover={input.trim() && !isTyping ? { scale: 1.08 } : {}}
                                            whileTap={input.trim() && !isTyping ? { scale: 0.92 } : {}}
                                            style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: input.trim() && !isTyping ? bot.gradient : 'rgba(255,255,255,0.06)', border: 'none', color: input.trim() && !isTyping ? 'white' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', transition: 'all 0.2s', alignSelf: 'flex-end', boxShadow: input.trim() && !isTyping ? `0 0 16px ${bot.glow}` : 'none' }}
                                        ><Send size={15} /></motion.button>
                                    </div>
                                    {!isMobile && (
                                        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(200,200,240,0.45)', marginTop: 10 }}>
                                            Press <kbd style={{ padding: '1px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }}>Enter</kbd> to send ·{' '}
                                            <kbd style={{ padding: '1px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }}>Shift+Enter</kbd> for new line
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
        .message-actions { opacity: 0 !important; transition: opacity 0.2s; }
        div:hover > div > .message-actions { opacity: 1 !important; }
        textarea::placeholder { color: rgba(160,160,200,0.45) !important; }
        textarea { color: #f0f0ff !important; }
      `}</style>
        </div>
    );
}
