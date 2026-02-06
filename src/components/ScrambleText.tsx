'use client';

import { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  delay?: number;
}

export default function ScrambleText({
  text,
  className,
  scrambleDuration = 1500,
  delay = 800,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text.replace(/[^ ]/g, ' '));

  useEffect(() => {
    const intervalTime = 30;
    const totalTicks = scrambleDuration / intervalTime;
    let tick = 0;

    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        tick++;
        const progress = tick / totalTicks;

        if (progress >= 1) {
          setDisplayed(text);
          clearInterval(interval);
          return;
        }

        const result = text
          .split('')
          .map((char) => {
            if (char === ' ') return ' ';
            // Each tick, each character has a chance to resolve based on progress
            if (Math.random() < progress) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        setDisplayed(result);
      }, intervalTime);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, scrambleDuration, delay]);

  return <span className={className}>{displayed}</span>;
}
