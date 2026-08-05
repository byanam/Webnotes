// landing.js - Landing Page Scaling, Animations, and Firebase Google Authentication

import { signInWithGoogle, listenToAuthState } from './firebase/auth.js';

// =========================================================================
// 1. RESPONSIVE CANVAS SCALING
// =========================================================================
(function () {
    var wrapper = document.getElementById('pageScaleWrapper');
    var canvas = document.getElementById('pageCanvas');
    var DESIGN_WIDTH = 1920;
    var DESIGN_HEIGHT = 5000;

    function updateScale() {
        if (!wrapper || !canvas) return;
        var scale = window.innerWidth / DESIGN_WIDTH;
        canvas.style.transform = 'scale(' + scale + ')';
        wrapper.style.height = (DESIGN_HEIGHT * scale) + 'px';
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }

    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    updateScale();
})();

// =========================================================================
// 2. SMOOTH SCROLL (Lenis) & GSAP ANIMATIONS
// =========================================================================
(function () {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis({
        duration: 1.8,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('.js-scroll-scale').forEach(function (el) {
        gsap.fromTo(el,
            { scale: 0.7, transformOrigin: '50% 50%' },
            {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    end: 'top 35%',
                    scrub: 1
                }
            }
        );
    });

    document.querySelectorAll('.js-typewriter').forEach(function (el) {
        var text = el.textContent;
        el.setAttribute('aria-label', text);
        el.textContent = '';

        var inner = document.createElement('span');
        inner.setAttribute('aria-hidden', 'true');

        var chars = [];
        for (var i = 0; i < text.length; i++) {
            var span = document.createElement('span');
            span.className = 'promo__heading-char';
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            inner.appendChild(span);
            chars.push(span);
        }

        el.appendChild(inner);

        gsap.fromTo(chars,
            { opacity: 0, y: 12, filter: 'blur(4px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.45,
                stagger: 0.035,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
})();

// =========================================================================
// =========================================================================
// 3. FIREBASE GOOGLE AUTHENTICATION FLOW
// =========================================================================
window.firebaseAuthInitialized = true;

function initAuthUI() {
    const loginBtn = document.getElementById('loginBtn') || document.querySelector('.hero__button');
    const loginBtnText = document.getElementById('loginBtnText') || document.querySelector('.hero__button-text');
    let isRedirecting = false;

    // Toast Notification for Error/Success Messages
    function showAuthToast(message, isSuccess = false) {
        const existing = document.querySelector('.auth-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `auth-toast ${isSuccess ? 'auth-toast--success' : ''}`;
        toast.innerHTML = `
            <span style="font-size: 1.2rem;">${isSuccess ? '✓' : '⚠️'}</span>
            <div>${message}</div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }

    // Set Button Loading State
    function setLoading(isLoading, customText = 'Signing in...') {
        if (!loginBtn) return;
        if (isLoading) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            if (loginBtnText) {
                loginBtnText.innerHTML = `<span class="hero__cta-spinner"></span>${customText}`;
            }
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            if (loginBtnText) {
                loginBtnText.textContent = 'Get Started';
            }
        }
    }

    // Auto-detect existing logged-in session (Requirement #3)
    const justLoggedOut = window.location.search.includes('logout=true') || sessionStorage.getItem('justLoggedOut') === 'true';
    try {
        listenToAuthState((user) => {
            if (user && !isRedirecting && !justLoggedOut) {
                isRedirecting = true;
                console.log("[Landing] Active session detected for:", user.email);
                setLoading(true, 'Redirecting...');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            }
        });
    } catch (err) {
        console.warn("[Landing] Auth state listener warning:", err);
    }

    // Login Action Handler
    let isAuthenticating = false;
    async function handleLoginAction(e) {
        if (e) e.preventDefault();
        if (isRedirecting || isAuthenticating) return;

        sessionStorage.removeItem('justLoggedOut');
        isAuthenticating = true;
        setLoading(true, 'Signing in...');

        const response = await signInWithGoogle();
        isAuthenticating = false;

        if (response.success) {
            isRedirecting = true;
            setLoading(true, 'Redirecting...');
            window.location.href = 'index.html';
        } else if (response.redirecting) {
            setLoading(true, 'Redirecting...');
        } else if (response.isUnconfigured) {
            showAuthToast("Firebase credentials required! Add your Firebase details in firebase/firebase-config.js. Entering Preview Mode...", false);
            setLoading(true, 'Preview Mode...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1800);
        } else {
            setLoading(false);
            showAuthToast(response.error, false);
        }
    }

    // --- Motion Primitives TextScramble Effect ---
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            this.update = this.update.bind(this);
            this.isScrambling = false;
        }

        setText(newText) {
            if (!this.el) return Promise.resolve();
            const oldText = this.el.innerText || '';
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 12);
                const end = start + Math.floor(Math.random() * 12);
                this.queue.push({ from, to, start, end, char: '' });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.isScrambling = true;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0; i < this.queue.length; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.isScrambling = false;
                if (this.resolve) this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    if (loginBtn && loginBtnText) {
        loginBtn.addEventListener('click', handleLoginAction);

        const scrambler = new TextScramble(loginBtnText);

        // Scramble on load
        setTimeout(() => {
            scrambler.setText('Get Started');
        }, 400);

        // Scramble on hover
        loginBtn.addEventListener('mouseenter', () => {
            if (!isAuthenticating && !isRedirecting && !scrambler.isScrambling) {
                scrambler.setText('Get Started');
            }
        });
    }

    // Expose globally for inline onclick fallback
    window.triggerGoogleLogin = handleLoginAction;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
} else {
    initAuthUI();
}