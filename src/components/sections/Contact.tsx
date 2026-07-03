'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Mail, Check } from 'lucide-react';
import { playClickSound, playTickSound } from '@/lib/sound';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Card from '../ui/Card';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sendingForm, setSendingForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      text: "Hi — I'm Fakhrul's AI assistant, trained on his projects and experience. Ask me about his stack, his internship work, or his availability.",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatMessages, chatLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClickSound();
    setSendingForm(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('send failed');
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      playTickSound();
    } catch {
      setFormError("The message couldn't be sent. Email me directly at fakhrulazim.am@gmail.com.");
    } finally {
      setSendingForm(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    playClickSound();
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, chatHistory: chatMessages }),
      });
      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
      playTickSound();
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: 'bot', text: "Connection failed. Please try again in a moment." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-28 md:py-36">
      <div className="section-shell">
        <SectionHeader
          kicker="07 — Contact"
          sub="Ask the AI assistant anything about my work, or send a message straight to my inbox."
        >
          Let&apos;s talk.
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* AI assistant */}
          <Reveal className="h-full">
            <Card className="flex flex-col p-6 md:p-7 h-full min-h-[520px]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-[var(--accent-dim)] border border-[var(--accent-line)] text-[var(--accent)] flex items-center justify-center">
                    <Sparkles size={15} />
                  </span>
                  <div>
                    <div className="font-display font-medium text-[15px] text-[var(--text)]">AI assistant</div>
                    <div className="text-[12px] text-[var(--text-faint)]">Trained on this portfolio</div>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-[12px] text-[var(--good)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] pulse-dot" />
                  Online
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-[var(--accent)] text-[#171106] rounded-br-md'
                          : 'bg-white/[0.05] border border-[var(--border)] text-[var(--text-soft)] rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/[0.05] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3.5 flex gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--text-faint)] animate-bounce"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} className="flex gap-2.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g. What did you build at PETRONAS?"
                  disabled={chatLoading}
                  className="field"
                  aria-label="Message the AI assistant"
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  aria-label="Send"
                  className="btn btn-primary !px-4 shrink-0 disabled:opacity-50"
                >
                  <Send size={15} />
                </button>
              </form>
            </Card>
          </Reveal>

          {/* Direct message form */}
          <Reveal delay={0.12} className="h-full">
            <Card className="flex flex-col p-6 md:p-7 h-full min-h-[520px]">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[var(--border)]">
                <span className="w-9 h-9 rounded-xl bg-white/[0.04] border border-[var(--border)] text-[var(--text-soft)] flex items-center justify-center">
                  <Mail size={15} />
                </span>
                <div>
                  <div className="font-display font-medium text-[15px] text-[var(--text)]">Direct message</div>
                  <div className="text-[12px] text-[var(--text-faint)]">Goes straight to my inbox</div>
                </div>
              </div>

              {submitSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
                  <div className="w-14 h-14 rounded-full bg-[var(--good)]/15 border border-[var(--good)]/40 text-[var(--good)] flex items-center justify-center">
                    <Check size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-lg text-[var(--text)] mb-1.5">
                      Message sent
                    </h4>
                    <p className="text-[14px] text-[var(--text-soft)] max-w-[36ch]">
                      Thanks for reaching out. I usually reply within a day or two.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      playClickSound();
                      setSubmitSuccess(false);
                    }}
                    className="btn btn-ghost text-[13.5px]"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ct-name" className="block text-[12.5px] text-[var(--text-faint)] mb-1.5">
                        Name
                      </label>
                      <input
                        id="ct-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="ct-email" className="block text-[12.5px] text-[var(--text-faint)] mb-1.5">
                        Email
                      </label>
                      <input
                        id="ct-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ct-subject" className="block text-[12.5px] text-[var(--text-faint)] mb-1.5">
                      Subject <span className="opacity-60">(optional)</span>
                    </label>
                    <input
                      id="ct-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="field"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label htmlFor="ct-message" className="block text-[12.5px] text-[var(--text-faint)] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="ct-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="field resize-none flex-1"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-[13px] text-[#e08585]">
                      {formError}
                    </p>
                  )}

                  <button type="submit" disabled={sendingForm} className="btn btn-primary w-full disabled:opacity-60">
                    {sendingForm ? 'Sending…' : 'Send message'}
                    {!sendingForm && <Send size={15} />}
                  </button>
                </form>
              )}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
