import React, { useEffect, useState, useRef } from 'react';

/**
 * SAFORA High-End Tech / Futuristic Interface Cursor
 *
 * Visual Direction:
 * - Minimal futuristic geometric pointer with thin technical outline & emerald/violet core
 * - Secondary lag-interpolated HUD arc with tech tick marks & idle micro-rotation
 * - Signature targeting reticle [corner brackets] on interactive hover
 * - Precision technical crosshair state on inputs
 * - Micro energy pulse & thin ripple on click
 * - 0ms immediate pointer tracking with velocity tilt
 * - Ephemeral emerald + violet stardust trail
 * - Global suppression of the native Windows/browser cursor on desktop
 * - Automatic disable on touch/mobile devices
 * - Full prefers-reduced-motion support
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Interaction State: 'default' | 'button' | 'link' | 'card' | 'image' | 'input'
  const [hoverState, setHoverState] = useState('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // DOM Refs
  const pointerWrapperRef = useRef(null);
  const pointerBodyRef = useRef(null);
  const hudRingRef = useRef(null);
  const targetBracketsRef = useRef(null);
  const trailPoint1 = useRef(null);
  const trailPoint2 = useRef(null);
  const trailPoint3 = useRef(null);
  const rippleLayerRef = useRef(null);

  // Motion & Physics Refs
  const mousePos = useRef({ x: -100, y: -100 });
  const hudPos = useRef({ x: -100, y: -100 });
  const trail1 = useRef({ x: -100, y: -100 });
  const trail2 = useRef({ x: -100, y: -100 });
  const trail3 = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const tiltAngle = useRef(0);
  const hudIdleRotation = useRef(0);
  const magneticPull = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // Monitor Dark Mode
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Main Cursor Initialization & Event Listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect fine pointer & hover (desktop only)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!hasFinePointer || isTouch || window.innerWidth < 1024) {
      return;
    }

    setIsReducedMotion(reducedMotionQuery.matches);
    setEnabled(true);

    // Suppress native Windows cursor everywhere on desktop
    document.documentElement.classList.add('custom-cursor-active');

    let prevX = -100;
    let prevY = -100;

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      mousePos.current = { x, y };
      setIsVisible(true);

      // Instant 1:1 hardware tracking for the main pointer (0ms latency)
      if (pointerWrapperRef.current) {
        pointerWrapperRef.current.style.transform = `translate3d(${x + magneticPull.current.x}px, ${y + magneticPull.current.y}px, 0)`;
      }

      // Compute velocity for dynamic directional tilt
      if (prevX !== -100) {
        const vx = x - prevX;
        const vy = y - prevY;
        velocity.current = { x: vx, y: vy };

        if (!reducedMotionQuery.matches) {
          // Dynamic tilt into velocity direction (max ±10deg)
          tiltAngle.current = Math.max(-10, Math.min(10, vx * 0.4));
        }
      }
      prevX = x;
      prevY = y;

      // Detect interactive element types
      const target = e.target;
      if (!target) return;

      if (target.closest('input, textarea, [contenteditable="true"]')) {
        setHoverState('input');
        magneticPull.current = { x: 0, y: 0 };
      } else if (target.closest('button, [role="button"], input[type="submit"], input[type="button"], .interactive-button')) {
        setHoverState('button');

        // Subtle micro-magnetic attraction to button center (under 2.5px)
        const btn = target.closest('button, [role="button"]');
        if (btn) {
          const rect = btn.getBoundingClientRect();
          if (rect.width <= 260 && rect.height <= 80) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            magneticPull.current = {
              x: (cx - x) * 0.04,
              y: (cy - y) * 0.04
            };
          } else {
            magneticPull.current = { x: 0, y: 0 };
          }
        }
      } else if (target.closest('a, .cursor-pointer')) {
        setHoverState('link');
        magneticPull.current = { x: 0, y: 0 };
      } else if (target.closest('img, picture, figure, [data-cursor="image"]')) {
        setHoverState('image');
        magneticPull.current = { x: 0, y: 0 };
      } else if (target.closest('.rounded-3xl, .rounded-2xl, [data-cursor="card"]')) {
        setHoverState('card');
        magneticPull.current = { x: 0, y: 0 };
      } else {
        setHoverState('default');
        magneticPull.current = { x: 0, y: 0 };
      }
    };

    const onMouseDown = (e) => {
      setIsClicking(true);

      // Trigger high-tech energy pulse ripple
      if (!reducedMotionQuery.matches && rippleLayerRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'tech-click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        rippleLayerRef.current.appendChild(ripple);

        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 360);
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High-Performance Physics & HUD Render Loop
    const render = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      if (!reducedMotionQuery.matches) {
        // Idle micro-rotation of the secondary HUD element (slow, elegant 18s orbit)
        hudIdleRotation.current = (hudIdleRotation.current + 0.35) % 360;

        // Smooth tilt decay toward 0 or hover angle
        let baseHoverRot = 0;
        if (hoverState === 'button') baseHoverRot = -4;
        else if (hoverState === 'card') baseHoverRot = 2;
        else if (hoverState === 'link') baseHoverRot = -2;

        tiltAngle.current *= 0.88; // decay inertial tilt
        const currentTilt = (tiltAngle.current + baseHoverRot);

        if (pointerBodyRef.current && hoverState !== 'input') {
          pointerBodyRef.current.style.transform = `rotate(${currentTilt.toFixed(2)}deg)`;
        }

        // Secondary HUD ring lag-interpolation (lerp factor 0.22 creates depth)
        hudPos.current.x += (mx - hudPos.current.x) * 0.22;
        hudPos.current.y += (my - hudPos.current.y) * 0.22;

        if (hudRingRef.current) {
          hudRingRef.current.style.transform = `translate3d(${hudPos.current.x}px, ${hudPos.current.y}px, 0) rotate(${hudIdleRotation.current.toFixed(1)}deg)`;
        }

        // Lerp 3 short technical trail points
        trail1.current.x += (mx - trail1.current.x) * 0.44;
        trail1.current.y += (my - trail1.current.y) * 0.44;

        trail2.current.x += (trail1.current.x - trail2.current.x) * 0.34;
        trail2.current.y += (trail1.current.y - trail2.current.y) * 0.34;

        trail3.current.x += (trail2.current.x - trail3.current.x) * 0.24;
        trail3.current.y += (trail2.current.y - trail3.current.y) * 0.24;

        const speed = Math.hypot(velocity.current.x, velocity.current.y);
        const trailAlpha = Math.min(1, speed * 0.12);

        if (trailPoint1.current) {
          trailPoint1.current.style.transform = `translate3d(${trail1.current.x}px, ${trail1.current.y}px, 0)`;
          trailPoint1.current.style.opacity = (trailAlpha * 0.35).toString();
        }
        if (trailPoint2.current) {
          trailPoint2.current.style.transform = `translate3d(${trail2.current.x}px, ${trail2.current.y}px, 0)`;
          trailPoint2.current.style.opacity = (trailAlpha * 0.22).toString();
        }
        if (trailPoint3.current) {
          trailPoint3.current.style.transform = `translate3d(${trail3.current.x}px, ${trail3.current.y}px, 0)`;
          trailPoint3.current.style.opacity = (trailAlpha * 0.12).toString();
        }
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [hoverState]);

  if (!enabled) return null;

  // Scale computation based on hover state and click compression
  let mainScale = 1;
  if (isClicking) {
    mainScale = 0.86;
  } else if (hoverState === 'button') {
    mainScale = 1.16;
  } else if (hoverState === 'image') {
    mainScale = 1.12;
  } else if (hoverState === 'link') {
    mainScale = 1.10;
  } else if (hoverState === 'card') {
    mainScale = 1.06;
  }

  // Tech Color Tokens
  const emeraldStroke = isDark ? '#00A878' : '#087A5B';
  const violetAccent = isDark ? '#A78BFA' : '#6D28D9';
  const pointerBodyFill = isDark ? '#F3F2EC' : '#171B18';
  const pointerShellStroke = isDark ? '#070908' : '#FAF8F2';

  const isInteractive = hoverState !== 'default' && hoverState !== 'input';

  return (
    <>
      {/* Ripple Container for click effects */}
      <div
        ref={rippleLayerRef}
        className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden"
        aria-hidden="true"
      />

      {/* Secondary Lag-Interpolated HUD Ring & Tech Markings (Desktop Only) */}
      {!isReducedMotion && hoverState !== 'input' && (
        <div
          ref={hudRingRef}
          className={`fixed top-0 left-0 pointer-events-none z-[99997] -ml-3 -mt-3 w-6 h-6 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
            {/* Primary Orbit Arc (90 deg arc) */}
            <path
              d="M 12 2 A 10 10 0 0 1 22 12"
              stroke={emeraldStroke}
              strokeWidth="0.8"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
            {/* Opposing Subtle Arc (45 deg) */}
            <path
              d="M 12 22 A 10 10 0 0 1 5 19"
              stroke={violetAccent}
              strokeWidth="0.75"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            {/* Micro Tech Tick Marks */}
            <line x1="12" y1="1" x2="12" y2="3" stroke={emeraldStroke} strokeWidth="0.9" strokeOpacity="0.6" />
            <line x1="22" y1="12" x2="20" y2="12" stroke={emeraldStroke} strokeWidth="0.9" strokeOpacity="0.6" />
            <circle cx="21" cy="7" r="0.75" fill={violetAccent} fillOpacity="0.7" />
          </svg>
        </div>
      )}

      {/* Trailing Tech Particles (Emerald + Violet) */}
      {!isReducedMotion && hoverState !== 'input' && (
        <div
          className={`fixed inset-0 pointer-events-none z-[99998] transition-opacity duration-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          {/* Particle 1: Emerald */}
          <div
            ref={trailPoint1}
            className="fixed top-0 left-0 -ml-[1px] -mt-[1px] w-[2.5px] h-[2.5px] rounded-full pointer-events-none"
            style={{
              backgroundColor: emeraldStroke,
              boxShadow: `0 0 6px ${emeraldStroke}`,
              willChange: 'transform, opacity'
            }}
          />
          {/* Particle 2: Violet */}
          <div
            ref={trailPoint2}
            className="fixed top-0 left-0 -ml-[1px] -mt-[1px] w-[2px] h-[2px] rounded-full pointer-events-none"
            style={{
              backgroundColor: violetAccent,
              boxShadow: `0 0 5px ${violetAccent}`,
              willChange: 'transform, opacity'
            }}
          />
          {/* Particle 3: Emerald */}
          <div
            ref={trailPoint3}
            className="fixed top-0 left-0 -ml-[0.75px] -mt-[0.75px] w-[1.5px] h-[1.5px] rounded-full pointer-events-none"
            style={{
              backgroundColor: emeraldStroke,
              boxShadow: `0 0 4px ${emeraldStroke}`,
              willChange: 'transform, opacity'
            }}
          />
        </div>
      )}

      {/* Main Cursor Master Container */}
      <div
        ref={pointerWrapperRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] select-none transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
          transformOrigin: '0px 0px'
        }}
        aria-hidden="true"
      >
        <div
          ref={pointerBodyRef}
          className="transition-transform duration-150 ease-out origin-top-left relative"
          style={{
            transform: `scale(${mainScale})`,
            transformOrigin: '1px 1px'
          }}
        >
          {/* Controlled Tech Ambient Glow on Interactive Hover */}
          <div
            className={`absolute -top-3 -left-3 w-8 h-8 rounded-full pointer-events-none transition-opacity duration-300 ${
              isInteractive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle, ${
                hoverState === 'button'
                  ? isDark
                    ? 'rgba(0, 168, 120, 0.4)'
                    : 'rgba(8, 122, 91, 0.3)'
                  : isDark
                  ? 'rgba(167, 139, 250, 0.35)'
                  : 'rgba(124, 58, 237, 0.25)'
              } 0%, transparent 70%)`
            }}
          />

          {/* ================================================================
              Special Signature Tech Interaction: HUD Targeting Brackets
              Appears cleanly when hovering interactive buttons/links/cards
              ================================================================ */}
          <div
            ref={targetBracketsRef}
            className={`absolute -top-3 -left-3 w-8 h-8 pointer-events-none transition-all duration-250 ease-out ${
              isInteractive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            {/* Top-Left Bracket */}
            <span
              className="absolute top-0 left-0 w-2 h-2 border-t-[1.2px] border-l-[1.2px] transition-colors duration-200"
              style={{ borderColor: emeraldStroke }}
            />
            {/* Top-Right Bracket */}
            <span
              className="absolute top-0 right-0 w-2 h-2 border-t-[1.2px] border-r-[1.2px] transition-colors duration-200"
              style={{ borderColor: emeraldStroke }}
            />
            {/* Bottom-Left Bracket */}
            <span
              className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.2px] border-l-[1.2px] transition-colors duration-200"
              style={{ borderColor: violetAccent }}
            />
            {/* Bottom-Right Bracket */}
            <span
              className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.2px] border-r-[1.2px] transition-colors duration-200"
              style={{ borderColor: violetAccent }}
            />
            {/* Subtle Scanning Line across target reticle */}
            {hoverState === 'button' && (
              <span
                className="absolute inset-x-1 top-1/2 h-[0.8px] opacity-40 animate-pulse pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${emeraldStroke}, transparent)`
                }}
              />
            )}
          </div>

          {hoverState === 'input' ? (
            /* ==============================================================
               Refined Technical Crosshair Reticle for URL Inputs
               ============================================================== */
            <div className="-ml-[9px] -mt-[9px] w-[18px] h-[18px] relative flex items-center justify-center">
              {/* Outer Micro Crosshair Frame */}
              <div
                className="absolute inset-0 rounded-full border border-dashed animate-[spin_12s_linear_infinite]"
                style={{
                  borderColor: isDark ? 'rgba(0, 168, 120, 0.45)' : 'rgba(8, 122, 91, 0.4)'
                }}
              />
              {/* Vertical Tick */}
              <div
                className="w-[1.2px] h-[14px] rounded-full"
                style={{ backgroundColor: emeraldStroke }}
              />
              {/* Horizontal Tick */}
              <div
                className="absolute h-[1.2px] w-[14px] rounded-full"
                style={{ backgroundColor: emeraldStroke }}
              />
              {/* Center Precision Target Dot */}
              <div
                className="absolute w-1.5 h-1.5 rounded-full shadow-xs animate-ping"
                style={{ backgroundColor: violetAccent, opacity: 0.6 }}
              />
              <div
                className="absolute w-1 h-1 rounded-full shadow-xs"
                style={{ backgroundColor: isDark ? '#FFFFFF' : '#111512' }}
              />
            </div>
          ) : (
            /* ==============================================================
               Main Tech Pointer: Geometric Stealth Arrowhead with Energy Core
               ============================================================== */
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none"
              style={{
                filter: isDark
                  ? 'drop-shadow(0 2px 6px rgba(0, 168, 120, 0.35)) drop-shadow(0 1.5px 3px rgba(0, 0, 0, 0.75))'
                  : 'drop-shadow(0 2px 5px rgba(8, 122, 91, 0.28)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25))'
              }}
            >
              <defs>
                {/* Tech Energy Core Gradient */}
                <linearGradient id="techCoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={emeraldStroke} />
                  <stop offset="65%" stopColor={violetAccent} />
                  <stop offset="100%" stopColor={emeraldStroke} />
                </linearGradient>
              </defs>

              {/* Geometric Stealth Shell */}
              <path
                d="M 1 1 L 1 16.5 L 4.8 13 L 8.2 19.8 L 10.4 18.7 L 7.2 12.2 L 12.8 12.2 Z"
                fill={pointerBodyFill}
                stroke={pointerShellStroke}
                strokeWidth="1.15"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Internal Tech Energy Spine / Channel */}
              <path
                d="M 2.2 3.5 L 2.2 13.5 L 4.4 11.5 L 6.8 16.5 L 8.2 15.8 L 5.8 11 L 10 11 Z"
                fill="url(#techCoreGradient)"
                fillOpacity={isDark ? '0.9' : '0.85'}
              />

              {/* Precision Tip Laser Dot */}
              <circle
                cx="1"
                cy="1"
                r="1.4"
                fill={emeraldStroke}
                stroke="#FFFFFF"
                strokeWidth="0.5"
              />

              {/* Small Violet Wing Accent Dot */}
              <circle
                cx="9.4"
                cy="17.2"
                r="0.75"
                fill={violetAccent}
                opacity="0.9"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}


