import type { Skill } from '@/types/portfolio';

export const skills: Skill[] = [
  // Languages
  { id: 'lang-python', name: 'Python', category: 'language', level: 90, yearsActive: 3 },
  { id: 'lang-js', name: 'JavaScript', category: 'language', level: 80, yearsActive: 2 },
  { id: 'lang-r', name: 'R', category: 'language', level: 75, yearsActive: 2 },
  { id: 'lang-java', name: 'Java', category: 'language', level: 70, yearsActive: 2 },
  { id: 'lang-cpp', name: 'C++', category: 'language', level: 65, yearsActive: 1 },
  { id: 'lang-sql', name: 'SQL', category: 'language', level: 70, yearsActive: 2 },
  { id: 'lang-dart', name: 'Dart', category: 'language', level: 60, yearsActive: 1 },

  // Tools & Frameworks
  { id: 'tool-git', name: 'Git', category: 'dev', level: 85 },
  { id: 'tool-firebase', name: 'Firebase', category: 'backend', level: 80 },
  { id: 'tool-powerbi', name: 'Power BI', category: 'data-viz', level: 85 },
  { id: 'tool-sharepoint', name: 'SharePoint', category: 'enterprise', level: 80 },
  { id: 'tool-powerautomate', name: 'Power Automate', category: 'automation', level: 85 },
  { id: 'tool-figma', name: 'Figma', category: 'design', level: 80 },
  { id: 'tool-illustrator', name: 'Adobe Illustrator', category: 'design', level: 75 },
  { id: 'tool-mysql', name: 'MySQL', category: 'database', level: 75 },
  { id: 'tool-nextjs', name: 'Next.js', category: 'frontend', level: 80 },
  { id: 'tool-react', name: 'React', category: 'frontend', level: 80 },
  { id: 'tool-flutter', name: 'Flutter', category: 'mobile', level: 70 },
  { id: 'tool-langchain', name: 'LangChain', category: 'ai', level: 80 },
  { id: 'tool-yolo', name: 'YOLO', category: 'ai-cv', level: 75 },
  { id: 'tool-gemini', name: 'Google Gemini API', category: 'ai', level: 85 },
];
