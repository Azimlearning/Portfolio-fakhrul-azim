import {
  siPython,
  siTypescript,
  siJavascript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siFirebase,
  siGithub,
  siThreedotjs,
  siR,
  siCplusplus,
  siFlutter,
  siLangchain,
  siVercel,
  siGooglegemini,
  siFigma,
  siNotion,
  siOpenjdk,
  siGit,
  siFramer,
  type SimpleIcon,
} from 'simple-icons';

export interface Tool {
  name: string;
  icon: SimpleIcon;
}

/** Tools & platforms shown in the auto-scrolling strip. Add/remove freely —
    import the icon from 'simple-icons' and append here. */
export const tools: Tool[] = [
  { name: 'Python', icon: siPython },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Three.js', icon: siThreedotjs },
  { name: 'Framer Motion', icon: siFramer },
  { name: 'Firebase', icon: siFirebase },
  { name: 'Gemini', icon: siGooglegemini },
  { name: 'LangChain', icon: siLangchain },
  { name: 'Flutter', icon: siFlutter },
  { name: 'Java', icon: siOpenjdk },
  { name: 'C++', icon: siCplusplus },
  { name: 'R', icon: siR },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
  { name: 'Vercel', icon: siVercel },
  { name: 'Figma', icon: siFigma },
  { name: 'Notion', icon: siNotion },
];
