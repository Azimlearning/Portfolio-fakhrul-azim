import type { Strength } from '@/types/portfolio';

export const strengths: Strength[] = [
  {
    name: 'AI Integration & RAG',
    score: 90,
    keywords: ['llm', 'rag', 'vector', 'embedding', 'langchain', 'ai chatbot', 'gemini'],
    evidence: 'projects',
  },
  {
    name: 'Process Automation',
    score: 85,
    keywords: ['automation', 'pipeline', 'workflow', 'script'],
    evidence: 'projects',
  },
  {
    name: 'Data Analysis & Visualization',
    score: 85,
    keywords: ['data', 'analytics', 'recommendation', 'r'],
    evidence: 'projects',
  },
  {
    name: 'Project Leadership',
    score: 95,
    evidence: 'leadership',
  },
  {
    name: 'Full-Stack Development',
    score: 70,
    keywords: ['next.js', 'firebase', 'javascript', 'java', 'c++', 'react', 'web'],
    evidence: 'projects',
  },
  {
    name: 'Computer Vision Systems',
    score: 70,
    keywords: ['yolo', 'vision', 'opencv'],
    evidence: 'projects',
  },
];
