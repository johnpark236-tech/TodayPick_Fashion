import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface HighlightRingProps {
  targetId: string | null;
  label?: string;
  isCompleted?: boolean;
  onTargetClick?: () => void;
}

interface RectBounds {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: string;
}

export const HighlightRing: React.FC<HighlightRingProps> = ({
  targetId,
  label = '여기를 확인해보세요',
  isCompleted = false,
  onTargetClick,
}) => {
  const [bounds, setBounds] = useState<RectBounds | null>(null);

  const updateBounds = useCallback(() => {
    if (!targetId) {
      setBounds(null);
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) {
      setBounds(null);
      return;
    }

    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    setBounds({
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      width: rect.width,
      height: rect.height,
      borderRadius: style.borderRadius || '16px',
    });
  }, [targetId]);

  useEffect(() => {
    updateBounds();

    const handleScroll = () => updateBounds();
    const handleResize = () => updateBounds();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Poll briefly for layout shifts
    const timer = setInterval(updateBounds, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, [updateBounds]);

  if (!targetId || !bounds) return null;

  // Add padding around target
  const padding = 8;
  const ringTop = bounds.top - padding;
  const ringLeft = bounds.left - padding;
  const ringWidth = bounds.width + padding * 2;
  const ringHeight = bounds.height + padding * 2;

  return (
    <div className="absolute pointer-events-none z-40" style={{ top: 0, left: 0, width: '100%' }}>
      {/* Pulsing Guide Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: [1, 1.025, 1],
          boxShadow: isCompleted
            ? '0 0 0 4px rgba(16, 185, 129, 0.4), 0 0 25px rgba(16, 185, 129, 0.25)'
            : '0 0 0 4px rgba(139, 92, 246, 0.45), 0 0 28px rgba(139, 92, 246, 0.35)',
        }}
        transition={{
          scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.3 },
        }}
        style={{
          position: 'absolute',
          top: ringTop,
          left: ringLeft,
          width: ringWidth,
          height: ringHeight,
          borderRadius: `calc(${bounds.borderRadius} + ${padding}px)`,
          border: isCompleted ? '2.5px solid #10B981' : '2.5px solid #8B5CF6',
        }}
      >
        {/* Floating Instruction Pill */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap backdrop-blur-md transition-colors ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-purple-600 text-white shadow-purple-200'
            }`}
            onClick={onTargetClick}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                <span>확인 완료</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-spin" style={{ animationDuration: '4s' }} />
                <span>{label}</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
