'use client';

import type { ReactNode } from 'react';

interface MagneticTargetProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticTarget({ children, className }: MagneticTargetProps) {
  return (
    <div data-magnetic-target className={className}>
      {children}
    </div>
  );
}
