# Barber Shop Website Implementation Plan

The objective is to build a modern, high-conversion robust web application for a local barbershop using Angular 21 and Tailwind CSS. The app will feature two main pages: a premium marketing landing page and a dedicated AI assistant chat interface that mimics ChatGPT, accessible via a floating button.

## Proposed Changes

### Global Configuration & Assets

Add a premium font (e.g., 'Inter' or 'Outfit') layout definition, and core styles.
Update the main entry points to establish routing and general layout (if needed).

#### [MODIFY] `src/styles.css`
- Integrate custom `@import` for Google Fonts (e.g., "Outfit").
- Add root-level Tailwind extensions if necessary or specific smooth scrolling behaviors and CSS custom properties for gradients and color palette (dark mode leaning for a premium look with gold/amber accents).

#### [MODIFY] `src/app/app.routes.ts`
- Register `HomeComponent` on path `''`
- Register `ChatComponent` on path `'chat'`

#### [MODIFY] `src/app/app.ts` (App Component)
- Change it from currently holding default angular placeholder elements (if any) to a primary layout wrapper utilizing `<router-outlet></router-outlet>`.

---

### Home / Landing Page

Create a visually striking landing page module to host all the requested sections, prioritizing dynamic and sleek modern UI principles.

#### [NEW] `src/app/home/home.component.ts` (And optionally sub-components)
- **Hero Section:** Full-screen or large viewport intro, vibrant dark gradient or a generated premium image background, compelling call to action.
- **Services (Popular Haircuts):** Animated cards showing trending cuts.
- **Pricing:** A clear, tabular or list-based view representing service costs.
- **Team Area:** Profile cards of barbers, using pseudo-3D effects or hover interactions.
- **Reviews/Testimonials:** Scrollable horizontally or grid based layout featuring user feedback.
- **Location/Contact & Map:** A bottom section with an embedded map (placeholder layout) and typical contact info (hours, address, phone).
- **Floating Chat Button:** Fixed position (e.g., bottom right) button pointing to `/chat` utilizing a lively pulse animation to attract interaction.

---

### AI Assistant Chat Page

A dedicated page that acts exclusively as a chat screen mimicking modern conversational interfaces (like ChatGPT).

#### [NEW] `src/app/chat/chat.component.ts`
- **Layout:** Sidebar (optional history placeholder) and a main chat window.
- **Messages Display:** Distinct styling for user messages versus assistant messages.
- **Input Area:** Bottom sticky prompt input with a send button.
- **Logic:** Basic mock conversation logic where the user can send texts and the system responds with artificial delays to simulate thinking.

## Open Questions

> [!IMPORTANT]
> **Design Vibe Check:** I plan to use a dark theme featuring deep blacks, slate grays, and metallic gold accents, which often conveys a premium barbershop feel. Does this color scheme align with your expectations?

> [!WARNING]
> **Images/Assets:** Since this is a new project, I will use placeholder images (from services like Unsplash) or generate images using an AI tool for the barbershop's hero image and haircuts. Let me know if you have specific assets you want to use.

> [!NOTE]
> **Floating Chat Button Behavior:** The button will be present on the main landing page. A click will navigate entirely to the second page (Chat). This aligns with your instruction to have the second page exclusively as the chat, allowing it to occupy the full screen like ChatGPT.

## Verification Plan

### Manual Verification
- Start the server (`npm start`).
- Navigate to the `localhost` URL.
- Verify the Home page visually: checking animations, layout flow across devices.
- Click the floating chat button and guarantee correct navigation to the `/chat` route.
- Interactively test the Chat window to verify inputs and mock assistant responses.
