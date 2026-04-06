# ZGE - Zero-Gravity Editor (Implementation Plan)

## 🎯 Vision
A beginner-friendly, AI-powered web editor for the Arabic-speaking world, built on Google technologies. ZGE is the first editor built on the **Flow Coding (برمجة التدفق) 🌊** methodology.

### 🌊 Flow Coding Concept
- **Motive**: Derived from the "Flow State" (absolute focus).
- **Core Principle**: ZGE removes all technical "friction" (Gravity) to ensure the developer stays in a continuous mental flow from idea to live deployment.
- **Goal**: Instant visualization of logic without the weight of traditional IDE complexity.

## 👥 Target Audience: The "Productive Beginner"
Specialized for the beginner developer who wants to move from concept to product instantly, without technical overhead.

## 🛠️ Technology Stack
- **UI Framework**: [Material Web Components (MWC 3)](file:///vendor/material-web/)
- **Logic**: Vanilla JavaScript (ES Module)
- **Styling**: Vanilla CSS with [ZGE Theme Tokens](file:///vendor/material-web/theming/zge-theme.css)
- **AI**: Google Gemini API (Mocked integration for UI phase)
- **Fonts**: [Tajawal (Google Font)](https://fonts.google.com/specimen/Tajawal)

## 📂 Phase 1: UI & Aesthetics (Current)
- [x] Initial Project Structure
- [x] Brand Logo Generation
- [ ] **Next**: Redesigning `index.html` for "WOW" factor & Beginners.
    - Large, friendly interactive elements.
    - Full Arabic RTL support (Right-to-Left).
    - Integrating the "AI Buddy" (Gemini) as a fixed sidebar/bottom drawer.

## 📂 Phase 2: Logic & Features
- [ ] **Live Preview System**: Instant rendering of HTML/CSS within an iframe.
- [ ] **Simple Syntax Highlighting**: A custom, lightweight highlighter for HTML/CSS.
- [ ] **AI Snippet Generator**: Connecting a text area to a "Gemini" prompt.

## 📂 Phase 3: Assets & Polishing
- [ ] Beginner tutorials (Arabic tooltips).
- [ ] Dark Mode / Light Mode toggle.
- [ ] Project Export (ZIP/HTML).

---
> [!TIP]
> Use **Tajawal** for Arabic text to ensure a modern, premium look that aligns with Google's design system.
