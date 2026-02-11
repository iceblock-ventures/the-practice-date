"use client";

import { useState } from "react";

const scenarios = [
  {
    icon: "☕",
    title: "Coffee Shop",
    desc: "You noticed someone reading your favorite book.",
  },
  {
    icon: "🍸",
    title: "Bar Intro",
    desc: "Your friend just introduced you to someone in their group.",
  },
  {
    icon: "📱",
    title: "Dating App",
    desc: "You matched. Now make the conversation interesting.",
  },
  {
    icon: "🌙",
    title: "Second Date",
    desc: "The first one went well. Keep the spark going.",
  },
];

const sampleDebrief = {
  confidence: 7,
  playfulness: 5,
  interestSignals: 6,
  overall: "B-",
  verdict: "You'd probably get a second date. Probably.",
  highlights: [
    {
      type: "best" as const,
      text: "Great opener. Asking about the book was natural and showed genuine curiosity.",
    },
    {
      type: "cringe" as const,
      text: 'You said "that\'s cool" three times in 90 seconds. Mix up your reactions.',
    },
    {
      type: "tip" as const,
      text: "You ran out of steam at the 2-minute mark. Next time, ask a follow-up question instead of switching topics.",
    },
  ],
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-sm text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className="flex-1 h-2 bg-[var(--color-bg)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${score * 10}%`,
            background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
          }}
        />
      </div>
      <span className="w-8 text-right text-sm font-mono font-bold">
        {score}/10
      </span>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently fail for now
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] mb-6">
              Coming Soon
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight animate-fade-in-up animate-delay-100">
            Practice flirting.
            <br />
            <span className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Get real feedback.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto animate-fade-in-up animate-delay-200">
            An AI voice coach that simulates real scenarios and tells you
            exactly what you did right, what fell flat, and how to be better
            next time.
          </p>

          {/* Waitlist Form */}
          <div className="mt-10 animate-fade-in-up animate-delay-300">
            {submitted ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 text-green-300 font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                You&apos;re on the list. We&apos;ll be in touch.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-white/10 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Joining..." : "Join the Waitlist"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Pick a scenario",
                desc: "Coffee shop, bar, dating app, second date. Choose your arena.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Have a conversation",
                desc: "Talk naturally by voice with an AI character who stays in character. 3-5 minutes.",
                icon: "🎙️",
              },
              {
                step: "03",
                title: "Get your debrief",
                desc: "Confidence, playfulness, cringe moments, best moments. Honest coaching, not judgment.",
                icon: "📊",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-[var(--color-bg-card)] border border-white/5 hover:border-[var(--color-primary)]/30 transition group"
              >
                <span className="text-5xl mb-4 block">{item.icon}</span>
                <span className="text-xs font-mono text-[var(--color-primary-light)] tracking-wider">
                  STEP {item.step}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="px-6 py-20 md:py-28 bg-[var(--color-bg-card)]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Pick your arena
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12 max-w-lg mx-auto">
            Practice in the situations that actually make you nervous.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((s) => (
              <div
                key={s.title}
                className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-white/5 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-bg-card-hover)] transition cursor-default"
              >
                <span className="text-3xl block mb-3">{s.icon}</span>
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Debrief */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Your debrief looks like this
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            After every session, you get specific, actionable feedback.
          </p>

          <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-bg-card)] border border-white/10">
            {/* Scores */}
            <div className="space-y-4 mb-8">
              <ScoreBar label="Confidence" score={sampleDebrief.confidence} />
              <ScoreBar
                label="Playfulness"
                score={sampleDebrief.playfulness}
              />
              <ScoreBar
                label="Read the Room"
                score={sampleDebrief.interestSignals}
              />
            </div>

            {/* Overall */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg)]/60 mb-6">
              <span className="text-[var(--color-text-muted)]">Overall</span>
              <div className="text-right">
                <span className="text-2xl font-bold mr-3">
                  {sampleDebrief.overall}
                </span>
                <span className="text-[var(--color-text-muted)] italic">
                  {sampleDebrief.verdict}
                </span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {sampleDebrief.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex gap-3 text-sm p-3 rounded-lg bg-[var(--color-bg)]/40"
                >
                  <span className="shrink-0 mt-0.5">
                    {h.type === "best"
                      ? "✅"
                      : h.type === "cringe"
                        ? "😬"
                        : "💡"}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    {h.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get better at flirting.
            <br />
            <span className="text-[var(--color-text-muted)]">
              Without the awkwardness.
            </span>
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Join the waitlist. Be the first to practice when we launch.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 text-green-300 font-medium">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              You&apos;re on the list!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-white/10 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} The Practice Date. Built in Austin, TX.
        </div>
      </footer>
    </main>
  );
}
