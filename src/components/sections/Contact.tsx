'use client';

import React, { useState } from 'react';
import { Send, Check, Mail, ArrowUpRight } from 'lucide-react';
import { playClickSound, playTickSound } from '@/lib/sound';
import { externalLinks } from '@/data/links';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Card from '../ui/Card';
import LinkIcon from '../ui/LinkIcon';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sendingForm, setSendingForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  return (
    <section id="contact" className="w-full py-20 md:py-28">
      <div className="section-shell">
        <SectionHeader
          kicker="08 — Contact"
          sub="Reach me directly on any channel, or drop a message straight to my inbox."
        >
          Let&apos;s talk.
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Direct channels */}
          <Reveal className="h-full">
            <Card className="flex flex-col p-6 md:p-7 h-full">
              <div className="pb-4 mb-4 border-b border-[var(--border)]">
                <div className="font-display font-medium text-[15px] text-[var(--text)]">
                  Direct channels
                </div>
                <div className="text-[12px] text-[var(--text-faint)]">
                  Fastest ways to reach me
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                {externalLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="group flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02] px-4 py-3 transition-colors hover:border-[var(--accent-line)] hover:bg-white/[0.04]"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[var(--accent-dim)] border border-[var(--accent-line)] text-[var(--accent)] flex items-center justify-center shrink-0">
                      <LinkIcon icon={link.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] text-[var(--text)]">{link.label}</span>
                      <span className="block text-[12.5px] text-[var(--text-faint)] truncate">
                        {link.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--text-faint)] shrink-0 transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
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
