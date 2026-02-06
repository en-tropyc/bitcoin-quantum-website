'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticCursorProps {
  defaultSize?: number;
  snapRadius?: number;
  padding?: number;
}

export default function MagneticCursor({
  defaultSize = 38,
  snapRadius = 80,
  padding = 6,
}: MagneticCursorProps) {
  const springConfig = { stiffness: 200, damping: 22 };

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const w = useMotionValue(defaultSize);
  const h = useMotionValue(defaultSize);
  const rotation = useMotionValue(0);
  const dotOpacity = useMotionValue(1);

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const springW = useSpring(w, springConfig);
  const springH = useSpring(h, springConfig);
  const springRotation = useSpring(rotation, { stiffness: 120, damping: 20 });
  const springDotOpacity = useSpring(dotOpacity, { stiffness: 300, damping: 30 });

  const cornerLen = useTransform(
    [springW, springH],
    ([cw, ch]: number[]) => Math.min(Math.min(cw, ch) * 0.25, 20)
  );

  const [visible, setVisible] = useState(false);
  const snappedRef = useRef(false);
  const snappedElRef = useRef<Element | null>(null);
  const lastMouseRef = useRef({ x: -200, y: -200 });
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  // Continuous rotation loop — only advances angle when not snapped
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!snappedRef.current) {
        // Rotate at 120°/s (full rotation in 3s, clockwise)
        angleRef.current += 120 * dt;
        rotation.set(angleRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rotation]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      lastMouseRef.current = { x: e.clientX, y: e.clientY };

      const targets = document.querySelectorAll('[data-magnetic-target]');
      let closestDist = Infinity;
      let snapX = e.clientX;
      let snapY = e.clientY;
      let snapW = defaultSize;
      let snapH = defaultSize;
      let isSnapped = false;
      let snappedEl: Element | null = null;

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < snapRadius && dist < closestDist) {
          closestDist = dist;
          snapX = centerX;
          snapY = centerY;
          snapW = rect.width + padding * 2;
          snapH = rect.height + padding * 2;
          isSnapped = true;
          snappedEl = target;
        }
      });

      // Toggle highlight class on snapped target
      targets.forEach((t) => t.classList.remove('magnetic-highlight'));
      if (snappedEl) {
        (snappedEl as Element).classList.add('magnetic-highlight');
      }

      if (isSnapped && !snappedRef.current) {
        // Snap rotation to nearest 0°
        const nearest = Math.round(angleRef.current / 360) * 360;
        rotation.set(nearest);
        angleRef.current = nearest;
      }

      snappedRef.current = isSnapped;
      snappedElRef.current = snappedEl;
      dotOpacity.set(isSnapped ? 0 : 1);
      cursorX.set(snapX);
      cursorY.set(snapY);
      w.set(snapW);
      h.set(snapH);
    };

    const handleMouseLeave = () => {
      setVisible(false);
      document.querySelectorAll('.magnetic-highlight').forEach((el) =>
        el.classList.remove('magnetic-highlight')
      );
    };
    const handleMouseEnter = () => setVisible(true);

    const handleScroll = () => {
      if (snappedRef.current) {
        snappedRef.current = false;
        snappedElRef.current = null;
        dotOpacity.set(1);
        document.querySelectorAll('.magnetic-highlight').forEach((el) =>
          el.classList.remove('magnetic-highlight')
        );
        const { x, y } = lastMouseRef.current;
        cursorX.set(x);
        cursorY.set(y);
        w.set(defaultSize);
        h.set(defaultSize);
      }
    };

    const handleClick = () => {
      const el = snappedElRef.current;
      if (!el) return;
      // Find the nearest link inside (or the element itself)
      const link = el.querySelector('a') || (el.tagName === 'A' ? el : el.closest('a'));
      if (link) {
        (link as HTMLElement).click();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, w, h, rotation, dotOpacity, snapRadius, padding, defaultSize, visible]);

  const thickness = 2;

  const cornersLeft = useTransform(springW, (v: number) => -v / 2);
  const cornersTop = useTransform(springH, (v: number) => -v / 2);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {/* Center dot — hidden when snapped */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: 'absolute',
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: springDotOpacity,
        }}
      />

      {/* Corner brackets */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotate: springRotation,
          marginLeft: cornersLeft,
          marginTop: cornersTop,
          width: springW,
          height: springH,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: cornerLen,
            height: cornerLen,
            borderTop: `${thickness}px solid white`,
            borderLeft: `${thickness}px solid white`,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: cornerLen,
            height: cornerLen,
            borderTop: `${thickness}px solid white`,
            borderRight: `${thickness}px solid white`,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: cornerLen,
            height: cornerLen,
            borderBottom: `${thickness}px solid white`,
            borderLeft: `${thickness}px solid white`,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: cornerLen,
            height: cornerLen,
            borderBottom: `${thickness}px solid white`,
            borderRight: `${thickness}px solid white`,
          }}
        />
      </motion.div>
    </div>
  );
}
