import { NextResponse } from 'next/server';

const AZIM_CONTEXT = `
You are the AI double (digital representation) of Fakhrul Azim Bin Ahmed Mardzukie.
Answer questions in the first person (as Azim's AI double). Keep your responses concise, professional, and slightly retro-futuristic.

About Fakhrul Azim:
- Student: Final-year Computer Science student at Universiti Teknologi PETRONAS (UTP) majoring in Data Analytics, minoring in Financial Management.
- Current Role: Intern at PETRONAS Upstream, building AI-driven automation systems, Python pipelines, and Power BI dashboards.
- Technical Stack: Python, RAG/LLM integration, Power BI, Next.js, Firebase, YOLO (computer vision), Gemini.
- Key Accomplishments:
  - Built process-automation tools replacing manual reporting at PETRONAS.
  - President of a 100+ member esports organization at UTP.
  - Coordinated a 10-day student exchange program in Osaka, Japan.
  - Directed a sponsored nationwide MLBB tournament.
- Contact: Email at fakhrulazim.am@gmail.com, or use the form on the website.
- Nationality: Malaysian. Languages: Malay (native), English (fluent).
`;

function getLocalResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('welcome')) {
    return "Hello! I am Azim's digital double. Ask me anything about my projects, stack, experience, or leadership roles.";
  }
  if (msg.includes('stack') || msg.includes('tech') || msg.includes('skill') || msg.includes('python') || msg.includes('power bi')) {
    return "My primary stack includes Python, RAG/LLMs, Power BI, Next.js, Firebase, YOLO, and Gemini. I focus on building automation tools and data pipelines.";
  }
  if (msg.includes('project') || msg.includes('work') || msg.includes('build')) {
    return "I build systems that make operations clear. Some highlights include Vera AI (automated tools) and advanced Power BI dashboards for PETRONAS leadership. Check out my Inventory grid above!";
  }
  if (msg.includes('leadership') || msg.includes('esports') || msg.includes('club') || msg.includes('osaka')) {
    return "I lead teams as easily as I build code. I was President of UTP's esports organization (100+ members), coordinated a 10-day exchange in Osaka, and managed nationwide gaming events.";
  }
  if (msg.includes('contact') || msg.includes('email') || msg.includes('hire') || msg.includes('reach')) {
    return "You can dispatch a transmission to me using the form on the right panel, or email me directly at fakhrulazim.am@gmail.com.";
  }
  if (msg.includes('education') || msg.includes('utp') || msg.includes('university')) {
    return "I am completing my final year in Computer Science (Data Analytics) at Universiti Teknologi PETRONAS (UTP).";
  }
  if (msg.includes('job') || msg.includes('intern') || msg.includes('petronas')) {
    return "I am currently an intern at PETRONAS Upstream, implementing automation workflows, Python tooling, and analytical dashboard pipelines.";
  }
  
  return "I can tell you about Azim's technical stack, projects, leadership experiences, or contact info. What would you like to know?";
}

interface ChatHistoryMessage {
  role: 'user' | 'bot';
  text: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, chatHistory } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Build conversation contents for Gemini API
      const history = chatHistory || [];
      const contents = [
        {
          role: 'user',
          parts: [{ text: `${AZIM_CONTEXT}\n\nInitialize conversation. Answer this user request: ${message}` }]
        }
      ];

      // Format history entries if any
      history.forEach((msg: ChatHistoryMessage) => {
        if (msg.role === 'user') {
          contents.push({
            role: 'user',
            parts: [{ text: msg.text }]
          });
        } else {
          contents.push({
            role: 'model',
            parts: [{ text: msg.text }]
          });
        }
      });

      // Add the final user message if not already added
      if (contents[contents.length - 1].parts[0].text !== message) {
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: AZIM_CONTEXT }]
            },
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.7,
            }
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return NextResponse.json({ reply });
        }
      }
    }

    // Offline / Fallback response
    const reply = getLocalResponse(message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { reply: 'CRT terminal offline. Local query compile failed.' },
      { status: 500 }
    );
  }
}
