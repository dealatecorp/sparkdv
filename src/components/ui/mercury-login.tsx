import { BrandWordmark } from '@/components/ui/brand-wordmark';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth-provider';

const headings = {
    login: 'Sign in',
    register: 'Create an account',
    change: 'Change your password',
};

export default function MercuryLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [search] = useSearchParams();
    const requestedMode = search.get('mode');
    const mode = requestedMode === 'register' || requestedMode === 'change'
        ? requestedMode : 'login';
    const { status, user, changeSession, refresh } = useAuth();
    const returnTo = location.state?.from === '/profile' ? '/profile' : '/account';
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    // Generate static random values once per mount to prevent hydration errors
    const blobsData = useMemo(() => {
        return Array.from({ length: 6 }).map(() => ({
            size: Math.random() * 200 + 150,
            left: Math.random() * 80 + 10,
            top: Math.random() * 80 + 10,
            animationDelay: Math.random() * -20,
            animationDuration: Math.random() * 15 + 15,
        }));
    }, []);

    // Keep track of the blob DOM elements for high-performance updates
    const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Apply subtle parallax effect to each blob
            blobRefs.current.forEach((blob, index) => {
                if (blob) {
                    const speed = (index + 1) * 20;
                    blob.style.marginLeft = `${x * speed}px`;
                    blob.style.marginTop = `${y * speed}px`;
                }
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        const fields = new FormData(event.currentTarget);
        const password = String(fields.get('password') ?? '');
        const name = String(fields.get('name') ?? '').trim();

        if (mode === 'register' && !name) {
            setError('Enter your name.');
            return;
        }

        setPending(true);
        setError('');
        try {
            if (mode === 'change') {
                await changeSession('change-password', { password, currentPassword: String(fields.get('currentPassword') ?? '') });
                navigate('/login', { replace: true, state: { passwordChanged: true } });
            } else if (mode === 'register') {
                await changeSession('sign-up', {
                    name,
                    email: String(fields.get('email') ?? ''),
                    mobile: String(fields.get('mobile') ?? ''),
                    password,
                });
            } else {
                await changeSession('sign-in', { identifier: String(fields.get('identifier') ?? ''), password });
            }
        } catch (failure) {
            setError(failure instanceof Error ? failure.message : 'We couldn’t complete the request. Try again.');
        } finally {
            setPending(false);
        }
    };

    if (user && mode !== 'change') return <Navigate to={returnTo} replace />;
    if (status === 'signed-out' && mode === 'change') return <Navigate to="/login" replace />;

    return (
        <div className="mercury-wrapper">
            <style>{`
                .mercury-wrapper {
                    --bg: #050505;
                    --mercury: #e0e0e0;
                    --accent: #ffffff;
                    --text-dim: rgba(255, 255, 255, 0.78);
                    --filter-goo: url('#gooey');
                    background-color: var(--bg);
                    color: var(--accent);
                    font-family: 'DM Sans', sans-serif;
                    min-height: calc(100vh - 88px);
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 40px 20px;
                }

                .mercury-wrapper * {
                    box-sizing: border-box;
                    -webkit-font-smoothing: antialiased;
                }

                .mercury-wrapper .stage {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    filter: var(--filter-goo);
                    opacity: 0.6;
                    pointer-events: none;
                }

                .mercury-wrapper .blob {
                    position: absolute;
                    background: linear-gradient(135deg, var(--mercury), #888);
                    border-radius: 50%;
                    filter: blur(20px);
                    animation: float 20s infinite alternate ease-in-out;
                    box-shadow: inset -10px -10px 20px rgba(0,0,0,0.5), 
                                10px 10px 30px rgba(255,255,255,0.2);
                    transition: margin 0.1s ease-out;
                }

                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(10vw, 20vh) scale(1.2); }
                    66% { transform: translate(-5vw, 10vh) scale(0.8); }
                    100% { transform: translate(5vw, -10vh) scale(1.1); }
                }

                .auth-container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 440px;
                    padding: 40px 32px;
                    background: rgba(15, 15, 20, 0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
                }

                .mercury-heading {
                    margin-bottom: 28px;
                    text-align: left;
                }

                .brand-id {
                    font-family: monospace;
                    font-size: 11px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: var(--text-dim);
                    margin-bottom: 8px;
                    display: block;
                }

                .mercury-heading h1 {
                    font-weight: 800;
                    font-size: 2.5rem;
                    line-height: 1.1;
                    letter-spacing: -1.5px;
                    margin-left: -2px;
                    margin-top: 0;
                    color: #fff;
                }

                .mercury-wrapper .form-group {
                    position: relative;
                    margin-bottom: 24px;
                    transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
                }

                .mercury-wrapper .form-group:focus-within {
                    transform: translateX(6px);
                }

                .mercury-wrapper .form-group label {
                    display: block;
                    font-family: monospace;
                    font-size: 11px;
                    color: var(--text-dim);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .mercury-wrapper .form-group input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    color: var(--accent);
                    padding: 10px 0;
                    font-size: 16px;
                    outline: none;
                    transition: border-color 0.4s;
                }

                .input-glow {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0%;
                    height: 2px;
                    background: var(--mercury);
                    transition: width 0.6s cubic-bezier(0.2, 1, 0.3, 1);
                    box-shadow: 0 0 15px var(--mercury);
                }

                .mercury-wrapper .form-group input:focus + .input-glow {
                    width: 100%;
                }

                .submit-wrap {
                    margin-top: 24px;
                    position: relative;
                }

                .btn-base {
                    background: var(--accent);
                    color: #000;
                    border: none;
                    padding: 16px 32px;
                    font-size: 13px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    cursor: pointer;
                    width: 100%;
                    position: relative;
                    z-index: 2;
                    border-radius: 8px;
                    transition: letter-spacing 0.3s, background-color 0.2s;
                }

                .btn-base:hover {
                    letter-spacing: 3px;
                    background: #f1f1f1;
                }

                .btn-base:disabled {
                    cursor: wait;
                    opacity: 0.75;
                }

                .auth-message {
                    margin-top: 16px;
                    color: var(--text-dim);
                    font-size: 0.9rem;
                }

                .auth-message[role="alert"] { color: #ffb4b4; }

                .footer-nav {
                    margin-top: 32px;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 12px 16px;
                    font-size: 0.875rem;
                }

                .footer-nav a {
                    color: var(--text-dim);
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    transition: color 0.3s;
                }

                .footer-nav a:hover {
                    color: var(--accent);
                }

                .svg-filter-hidden {
                    position: absolute;
                    width: 0;
                    height: 0;
                }

                @media (prefers-reduced-motion: reduce) {
                    .mercury-wrapper .blob { animation: none; }
                    .mercury-wrapper .form-group, .input-glow, .btn-base { transition: none; }
                }
            `}</style>

            <svg className="svg-filter-hidden" aria-hidden="true">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix 
                            in="blur" 
                            mode="matrix" 
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
                            result="goo" 
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                </defs>
            </svg>

            <div className="stage" aria-hidden="true">
                {blobsData.map((data, index) => (
                    <div
                        key={index}
                        ref={(el) => { blobRefs.current[index] = el; }}
                        className="blob"
                        style={{
                            width: `${data.size}px`,
                            height: `${data.size}px`,
                            left: `${data.left}%`,
                            top: `${data.top}%`,
                            animationDelay: `${data.animationDelay}s`,
                            animationDuration: `${data.animationDuration}s`,
                        }}
                    />
                ))}
            </div>

            <section className="auth-container" aria-labelledby="auth-heading">
                <header className="mercury-heading">
                    <span className="brand-id"><BrandWordmark /> account</span>
                    <h1 id="auth-heading">{headings[mode]}</h1>
                </header>

                {status === 'loading' && <p role="status" className="auth-message">Checking your session…</p>}
                {status === 'unavailable' && (
                    <>
                        <p role="alert" className="auth-message">The account service is unavailable.</p>
                        <div className="submit-wrap"><button type="button" className="btn-base" onClick={refresh}>Try again</button></div>
                    </>
                )}

                {(status === 'signed-out' || user) && (
                    <form onSubmit={handleFormSubmit} aria-busy={pending}>
                        {mode === 'register' && (
                            <div className="form-group">
                                <label htmlFor="auth-name">Full name</label>
                                <input id="auth-name" name="name" autoComplete="name" maxLength={100} required />
                                <div className="input-glow" />
                            </div>
                        )}
                        {mode === 'change' ? (
                            <>
                                <input type="hidden" name="email" value={user?.email ?? ''} autoComplete="username" />
                                <div className="form-group">
                                    <label htmlFor="auth-current-password">Current password</label>
                                    <input id="auth-current-password" name="currentPassword" type="password" autoComplete="current-password" required />
                                    <div className="input-glow" />
                                </div>
                            </>
                        ) : mode === 'register' ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="auth-email">Email</label>
                                    <input id="auth-email" type="email" name="email" autoComplete="username" maxLength={254} required />
                                    <div className="input-glow" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="auth-mobile">Mobile number</label>
                                    <input id="auth-mobile" type="tel" name="mobile" autoComplete="tel" maxLength={32} placeholder="+91 98765 43210" required />
                                    <div className="input-glow" />
                                </div>
                            </>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="auth-identifier">Email or mobile number</label>
                                <input id="auth-identifier" name="identifier" autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={254} required />
                                <div className="input-glow" />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="auth-password">{mode === 'change' ? 'New password' : 'Password'}</label>
                            <input
                                id="auth-password"
                                name="password"
                                type="password"
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                minLength={mode === 'login' ? undefined : 8}
                                aria-describedby={mode === 'login' ? undefined : 'auth-password-hint'}
                                required
                            />
                            <div className="input-glow" />
                        </div>
                        {mode !== 'login' && <p id="auth-password-hint" className="auth-message">Use at least 8 characters.</p>}
                        {error && <p role="alert" className="auth-message">{error}</p>}
                        {!error && location.state?.passwordChanged && <p role="status" className="auth-message">Password changed. Sign in with your new password.</p>}
                        <div className="submit-wrap">
                            <button type="submit" className="btn-base" disabled={pending}>
                                {pending ? 'Please wait…' : mode === 'change' ? 'Save password' : headings[mode]}
                            </button>
                        </div>
                    </form>
                )}

                {(status === 'signed-out' || user) && (
                    <div className="footer-nav">
                        {mode === 'login' ? (
                            <Link to="/login?mode=register" state={location.state}>Create an account</Link>
                        ) : mode === 'change' ? (
                            <Link to="/account">Back to account</Link>
                        ) : (
                            <Link to="/login" state={location.state}>Back to sign in</Link>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
