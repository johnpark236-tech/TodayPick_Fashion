export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type Gender = 'female' | 'male' | 'unisex';
export type AgeGroup = '10s' | '20s' | '30s' | '40s' | '50s' | '60s';

export interface OutfitPiece {
  top: string;
  bottom: string;
  shoes: string;
  outer?: string;
  accessory?: string;
}

export interface OutfitItem {
  id: string;
  title: string;
  description: string;
  season: Season;
  gender: Gender;
  age: AgeGroup;
  imageUrl: string;
  setId: string;
  sheetUrl?: string;
  cutIndex: number; // 1..10
  styleCategory: string;
  tags: string[];
  colorPalette: string[];
  tempRange: string;
  pieces: OutfitPiece;
  likes: number;
  rank?: number;
}

export interface LessonStep {
  step: number;
  title: string;
  summary: string;
  concept: string;
  application: string[];
  targetId: string;
  instruction: string;
  actionType?: 'highlight' | 'three_click' | 'landing_scroll' | 'build_inspect' | 'github_flow' | 'vercel_flow' | 'mobile_qa' | 'five_sec_test' | 'final_qa';
}
