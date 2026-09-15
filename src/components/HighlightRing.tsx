import React from 'react';

interface HighlightRingProps {
  targetId: string | null;
  label?: string;
  isCompleted?: boolean;
  onTargetClick?: () => void;
}

export const HighlightRing: React.FC<HighlightRingProps> = () => null;
