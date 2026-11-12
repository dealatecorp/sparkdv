import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface MercuryLoginProps {
    onLoginSuccess?: (userData: { name: string; email: string; clinic: string }) => void;
}

const MercuryLogin: React.FC<MercuryLoginProps> = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('DR-CHAITANYA-500081');
    const [pass, setPass] = useState('••••••••');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setTimeout(() => {
            const user = {
                name: 'Dr. Chaitanya V.',
                email: 'chaitu4766@gmail.com',
                clinic: 'SPARK Clinical Research & Pediatric Dental Center',
                councilId: 'DCI-TS-2018-84920'
            };
            localStorage.setItem('sparkdv_user', JSON.stringify(user));
            if (onLoginSuccess) {
                onLoginSuccess(user);
            }
            navigate('/account');
        }, 800);
    };

    return (
        <div className="mercury-wrapper">
            <style>{`
                :root {
                    --bg: #050505;
                    --mercury: #e0e0e0;
                    --mercury-dark: #666666;
                    --accent: #ffffff;
                    --text-dim: rgba(255, 255, 255, 0.5);
                    --filter-goo: url('#gooey');
                }

                .mercury-wrapper {
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

                .stage {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    filter: var(--filter-goo);
                    opacity: 0.6;
                }

                .blob {
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

                .header {
                    margin-bottom: 40px;
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

                .header h1 {
                    font-weight: 800;
                    font-size: 2.5rem;
                    line-height: 0.95;
                    letter-spacing: -1.5px;
                    margin-left: -2px;
                    margin-top: 0;
                    color: #fff;
                }

                .form-group {
                    position: relative;
                    margin-bottom: 24px;
                    transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
                }

                .form-group:focus-within {
                    transform: translateX(6px);
                }

                .form-group label {
                    display: block;
                    font-family: monospace;
                    font-size: 11px;
                    color: var(--text-dim);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .form-group input {
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

                .form-group input:focus + .input-glow {
                    width: 100%;
                }

                .submit-wrap {
                    margin-top: 36px;
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

                .footer-nav {
                    margin-top: 32px;
                    display: flex;
                    justify-content: space-between;
                    font-family: monospace;
                    font-size: 11px;
                }

                .footer-nav a {
                    color: var(--text-dim);
                    text-decoration: none;
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
            `}</style>

            <svg className="svg-filter-hidden">
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

            <div className="stage" id="stage">
                {blobsData.map((data, index) => (
                    <div
                        key={index}
                        ref={(el) => (blobRefs.current[index] = el)}
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

            <main className="auth-container">
                <header className="header">
                    <span className="brand-id">SPARK-DV CLINICAL NETWORK · 0x992</span>
                    <h1>DOCTOR<br/>ACCESS</h1>
                </header>

                <form autoComplete="off" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Doctor / Practitioner ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="DR-CHAITANYA-500081"
                            required
                        />
                        <div className="input-glow"></div>
                    </div>

                    <div className="form-group">
                        <label>Security Key</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <div className="input-glow"></div>
                    </div>

                    <div className="submit-wrap">
                        <button type="submit" className="btn-base" disabled={isLoggingIn}>
                            {isLoggingIn ? "Authenticating..." : "Initialize Portal Access"}
                        </button>
                    </div>
                </form>

                <footer className="footer-nav">
                    <button
                        type="button"
                        onClick={() => navigate('/account')}
                        style={{background:'none', border:0, color:'var(--text-dim)', cursor:'pointer', font:'inherit'}}
                    >
                        VIEW DEMO PROFILE →
                    </button>
                    <a href="#register" onClick={(e) => { e.preventDefault(); handleFormSubmit(e); }}>
                        NEW REGISTRATION
                    </a>
                </footer>
            </main>
        </div>
    );
};

export default MercuryLogin;
