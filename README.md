<div align="center">
  <br />
  <img src="public/readme/hero.png" alt="Literead — AI Reading Coach for Kids" />
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Vapi-black?style=for-the-badge&logoColor=white&color=1a1a1a" alt="Vapi" />
    <img src="https://img.shields.io/badge/-Supabase-black?style=for-the-badge&logo=supabase&logoColor=white&color=3ECF8E" alt="Supabase" />
    <img src="https://img.shields.io/badge/-Tailwind-black?style=for-the-badge&logo=tailwind-css&logoColor=white&color=06B6D4" alt="Tailwind CSS" />
  </div>

  <br />

  <h2>Literead</h2>
  <p><strong>AI reading comprehension coach for students from Pre-K through Grade 12.</strong></p>
  <p>
    Students read a passage, then have a real voice conversation with an AI coach that guides them through
    Barrett's Taxonomy — from literal recall through to critical evaluation and personal reflection.
    Built to help struggling readers build real comprehension, one conversation at a time.
  </p>

  <br />

  <a href="https://literead.com" target="_blank">
    <img src="https://img.shields.io/badge/Visit%20Literead-fe5933?style=for-the-badge" alt="Visit Literead" />
  </a>

<br /><br />

</div>

---

## How It Works

1. **Student reads a passage** — chosen from a library filtered by grade level, subject, and lesson type
2. **Student taps "Start Discussion"** — a voice session begins immediately in the browser
3. **AI coach asks questions** — following Barrett's Taxonomy, starting at literal recall and working up to inference, evaluation, and appreciation, calibrated to the student's grade level
4. **Session is saved** — the full transcript is stored and visible on the student's journey page
5. **Progress is tracked** — completed passages, session history, and remaining sessions are surfaced on the dashboard

---

## Tech Stack

**[Next.js](https://nextjs.org/)** — App Router, server components, API routes, full-stack React

**[Vapi](https://vapi.ai/)** — Voice AI orchestration. Manages the WebRTC pipeline, STT → LLM → TTS loop, and real-time event streaming

**[Deepgram](https://deepgram.com/)** — Speech-to-text (nova-2) for student speech transcription; text-to-speech (Aura-2) for the AI coach voice

**[OpenAI](https://openai.com/)** — GPT-4o-mini powers the reading coach. Structured instruction-following for Barrett's Taxonomy Q&A on provided passage content

**[Clerk](https://clerk.com/)** — Authentication, user management, and session handling

**[Supabase](https://supabase.com/)** — PostgreSQL database for passages, transcripts, bookmarks, subscriptions, and user progress

**[Paddle](https://paddle.com/)** — Subscription billing and checkout. Manages plan tiers, monthly session resets, and payment events via webhook

**[Sentry](https://sentry.io/)** — Error tracking and performance monitoring in production

**[shadcn/ui](https://ui.shadcn.com/)** + **[Tailwind CSS](https://tailwindcss.com/)** — Component library and utility-first styling

**[TypeScript](https://www.typescriptlang.org/)** — End-to-end type safety

---

## Features

**AI Voice Reading Coach** — A patient, encouraging AI coach that speaks to students, waits for their answers, scaffolds when they struggle, and adapts its language to their grade level.

**Barrett's Taxonomy Framework** — Five levels of reading comprehension built into every session:

- Level 1: Literal recall — what did the passage say?
- Level 2: Reorganisation — summarise, sequence, classify
- Level 3: Inference — read between the lines
- Level 4: Evaluation — was the character right? Do you agree?
- Level 5: Appreciation — how did it make you feel?

**Grade-Calibrated Sessions** — Pre-K–2 targets levels 1–2. Grades 3–5 push to level 3. Grades 6–8 reach evaluation. Grades 9–12 go all five levels.

**Passage Library** — Filterable by grade level, lesson type (Phonics, Comprehension, Sight Words, Story, Mixed), and subject. Public library available to all subscribers.

**Session Transcripts** — Every conversation is saved. Students and parents can replay the full exchange on the My Journey page.

**Progress Dashboard** — Completed passages, minutes read, sessions remaining, and plan status in one place.

**Bookmarks** — Students can save passages for later.

**Subscription Gating** — Sessions are metered per plan. A paywall modal surfaces inline when a student runs out, with direct upgrade flow.

**Responsive** — Full mobile and desktop support.

---

## Subscription Plans

| Plan  | Price    | Sessions / month |
| ----- | -------- | ---------------- |
| Basic | $20 / mo | 12               |
| Core  | $30 / mo | 20               |
| Pro   | $50 / mo | 30               |

Sessions reset monthly on the subscription anniversary date. Unused sessions do not roll over. All plans include access to the full passage library across every grade level.

---

## Voice AI Architecture

Vapi acts as an orchestration layer — it does not run the AI itself. Each session chains four services:

```
Browser (WebRTC)
    ↓
Vapi orchestration     $0.0500 / min
    ↓
Deepgram nova-2 (STT)  $0.0059 / min
    ↓
OpenAI GPT-4o-mini     $0.006–0.012 / min
    ↓
Deepgram Aura-2 (TTS)  $0.0108 / min
```

Total cost per session (5 min avg): **~$0.37–$0.40**

Vapi credits cover the orchestration fee only. OpenAI and Deepgram are billed separately to those providers.

---

## Environment Variables

```env
# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Paddle
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_PRICE_ID_BASIC=
NEXT_PUBLIC_PADDLE_PRICE_ID_CORE=
NEXT_PUBLIC_PADDLE_PRICE_ID_PRO=

# Sentry
SENTRY_AUTH_TOKEN=
```

---

<div align="center">
  <p>Built for kids who deserve better than a worksheet.</p>
  <a href="https://literead.com" target="_blank"><strong>literead.com</strong></a>
</div>
