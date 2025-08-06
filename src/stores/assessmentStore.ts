import { create } from 'zustand';

export interface AssessmentAnswer {
  questionId: string;
  value: any;
  timestamp: Date;
}

export interface AssessmentScores {
  psychometric: number;
  technical: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  };
  overall: number;
  confidence: number;
}

export interface AssessmentState {
  answers: Record<string, any>;
  scores: AssessmentScores | null;
  startTime: Date | null;
  completionTime: Date | null;
  
  // Actions
  updateAnswer: (questionId: string, value: any) => void;
  calculateScores: () => void;
  resetAssessment: () => void;
  setStartTime: () => void;
  setCompletionTime: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  answers: {},
  scores: null,
  startTime: null,
  completionTime: null,

  updateAnswer: (questionId: string, value: any) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: value
      }
    }));
  },

  calculateScores: () => {
    const { answers } = get();
    
    // Psychometric scoring (0-100)
    const psychometricQuestions = Object.keys(answers).filter(q => q.startsWith('psych_'));
    const psychometricScore = psychometricQuestions.length > 0 
      ? (psychometricQuestions.reduce((sum, q) => sum + (answers[q] || 0), 0) / psychometricQuestions.length) * 20
      : 0;

    // Technical scoring (0-100)  
    const technicalQuestions = Object.keys(answers).filter(q => q.startsWith('tech_'));
    const technicalScore = technicalQuestions.length > 0
      ? (technicalQuestions.reduce((sum, q) => sum + (answers[q] || 0), 0) / technicalQuestions.length) * 20
      : 0;

    // WISCAR scoring (0-100 each dimension)
    const wiscarDimensions = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
    const wiscarScores: Record<string, number> = {};
    
    wiscarDimensions.forEach(dimension => {
      const dimensionQuestions = Object.keys(answers).filter(q => q.startsWith(`wiscar_${dimension}`));
      wiscarScores[dimension] = dimensionQuestions.length > 0
        ? (dimensionQuestions.reduce((sum, q) => sum + (answers[q] || 0), 0) / dimensionQuestions.length) * 20
        : 0;
    });

    const wiscarOverall = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / wiscarDimensions.length;

    // Overall scoring
    const overall = (psychometricScore + technicalScore + wiscarOverall) / 3;
    
    // Confidence calculation based on consistency and completeness
    const totalQuestions = Object.keys(answers).length;
    const completeness = Math.min(totalQuestions / 30, 1); // Assume 30 total questions
    const confidence = Math.round(overall * completeness);

    const scores: AssessmentScores = {
      psychometric: Math.round(psychometricScore),
      technical: Math.round(technicalScore),
      wiscar: {
        ...wiscarScores,
        will: Math.round(wiscarScores.will),
        interest: Math.round(wiscarScores.interest), 
        skill: Math.round(wiscarScores.skill),
        cognitive: Math.round(wiscarScores.cognitive),
        ability: Math.round(wiscarScores.ability),
        realWorld: Math.round(wiscarScores.realWorld),
        overall: Math.round(wiscarOverall)
      },
      overall: Math.round(overall),
      confidence
    };

    set({ scores });
  },

  resetAssessment: () => {
    set({
      answers: {},
      scores: null,
      startTime: null,
      completionTime: null
    });
  },

  setStartTime: () => {
    set({ startTime: new Date() });
  },

  setCompletionTime: () => {
    set({ completionTime: new Date() });
  }
}));