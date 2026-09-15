import React from 'react';
import { LessonStep } from '../types';

interface LessonPanelProps {
  currentLesson: LessonStep;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClose: () => void;
  onCompleteStep: (stepNumber: number) => void;
  onOpenBuildInspect: () => void;
  onOpenGithubModal: () => void;
  onOpenVercelModal: () => void;
  onToggleMobilePreview: () => void;
  isMobilePreviewActive: boolean;
  onOpenFiveSecTest: () => void;
  onOpenFinalQA: () => void;
  onScrollToLanding: () => void;
  threeClickPhase?: 'season' | 'gender_age' | 'outfit' | 'done';
}

export const LessonPanel: React.FC<LessonPanelProps> = () => null;
