# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Young adults (students and early-career people) who generally have friends and family around them but still hit moments of feeling alone, often late, often mid-feeling, and want somewhere to put it into words right now. Their job in that moment is to be heard without judgment and come away a little steadier. A second, slower job: later, looking back to see how far they've come.

## Product Purpose

Relifio is an AI conversation space for emotional support that also keeps what was said. A person talks through what's on their mind; when they end the session, Relifio summarizes it into a "chapter" they can reflect on. It exists because venting to a general-purpose AI helps in the moment but leaves nothing behind. Success means someone leaves a session feeling heard, and over time has a record of their own growth they would otherwise never notice.

## Positioning

Not a journaling app (you don't have to write alone) and not a generic chatbot (the conversation doesn't evaporate). Relifio turns isolated moments of expression into "life chapters": challenges, breakthroughs, milestones. It was started by a founder who used AI this way themselves and found nothing built to hold those moments.

## Operating Context

- Entry: landing page (`/`) with "Learn More" and "Begin a chapter".
- `/Learnmore`: explains what Relifio is and why it exists, ending in an email waitlist signup (early access).
- `/Mainpage`: the chat. Empty state offers starter prompts ("I've been feeling stressed lately", "I want to talk about my day", "I need someone to listen"). The user sends messages, gets AI replies, then uses "End & Summarize" to produce the session's chapter summary.
- Sessions are anonymous, identified by a session id in the browser's localStorage; there are no accounts.

## Capabilities and Constraints

- Stack: React 19 (Create React App, react-router) frontend in `frontend/`; Express 5 + MongoDB/Mongoose backend in `backend/`; OpenAI API (`gpt-3.5-turbo` for replies, `gpt-4o-mini` for summaries). Frontend deployed on Vercel.
- Shipped: AI chat, per-session stored conversation, on-demand session summary ("chapter"), waitlist email signup.
- Not shipped and **not to be claimed** anywhere: accounts/authentication, encryption, "100% private & secure", data export, cross-chapter pattern tracking, a browsable timeline of past chapters. The README and current Learn More copy overstate these; that copy needs correcting, not echoing.
- Terminology: "chapter" / "life chapter" = a summarized session. "Begin a chapter" = start a conversation.
- Safety (required): Relifio is not therapy, a therapist, or a medical service, and must say so plainly. When someone may be at risk, the product must surface crisis resources (e.g. 988 in the US). **Open:** this crisis path is not yet implemented, and region coverage for resources is undecided.

## Brand Commitments

- Name: Relifio. (The repository folder is "Relief.io"; the product name is Relifio.)
- Lines in use: "Where technology meets empathy." / "Your thoughts become chapters, your chapters become the story of you."
- Voice: warm, first-person founder honesty ("I've experienced that firsthand"), non-clinical, judgment-free.
- Existing image assets: `frontend/public/relief.png`, `stress-relief.png`, `therapist.png` (used as the AI avatar). Their status as binding brand marks is unconfirmed.

## Evidence on Hand

- The founder's own story of turning to AI in lonely moments (in `Learnmore.jsx`), real and usable.
- A product screenshot: `frontend/screenshots/screenshot.jpg`.
- No users, testimonials, metrics, press, or clinical backing exist. Do not fabricate any. The "24/7 / 100% / AI" stat row is not evidence.

## Product Principles

1. **Heard first.** In the moment of reaching out, listening beats features; nothing should stand between a person and saying what they feel.
2. **Nothing evaporates.** Every conversation should be able to become something the person can return to.
3. **Honest about what it is.** Never overclaim privacy, security, or therapeutic power. Say what is real; say it's not therapy.
4. **Safety over engagement.** When someone may be at risk, pointing them to human help matters more than keeping them in the app.
5. **Growth is visible over time.** The long-term value is seeing how far you've come, not any single session.

## Accessibility & Inclusion

Users may arrive distressed, tired, or on a phone late at night. Keep reading load low, keep the input always reachable, and avoid motion that delays or blocks reading. No formal standard has been set; WCAG 2.2 AA is the working floor.
