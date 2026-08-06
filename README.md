<div align="center">

  # 📝 Notes 101

  **An open-source note-taking application designed with Photoshop, Illustrator & Figma, combining digital canvas drawing, typography tools, and cloud synchronization.**

  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![Photoshop](https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white)](https://www.adobe.com/products/photoshop.html)
  [![Illustrator](https://img.shields.io/badge/Adobe%20Illustrator-FF9A00?style=for-the-badge&logo=adobeillustrator&logoColor=white)](https://www.adobe.com/products/illustrator.html)
  [![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

  <br />

  [🚀 Launch Web App](index.html) · [📰 View Landing Page](landing.html)

</div>

---

## 🎨 Design Philosophy & Origin

Notes 101 was custom-crafted using **Adobe Photoshop**, **Adobe Illustrator**, and **Figma**. The design merges the dark studio workspace aesthetics of **Photoshop** and **VS Code** with the typography of editorial print publication.

Unlike traditional corporate note apps, Notes 101 prioritizes visual elegance, custom canvas control, and freehand creativity while staying **100% free with NO ads and NO subscriptions**.

---

## ⚡ Complete Feature Breakdown

### 🗞️ 1. Editorial Landing Page & Motion System
- **Hermes Curtain Reveal**: Fixed footer layout revealed as the newspaper page scrolls away.
- **Lenis Smooth Scroll Engine**: Inertial wheel scrolling paired with GSAP ticker synchronization.
- **ScrollTrigger Motion FX**: Interactive typewriter text reveals, blur-to-sharp image unveils, and screenshot zoom-out animations.
- **Responsive 1920px Canvas Scaling**: Responsive canvas wrapper maintaining proportions on all displays.

### 📚 2. Workspace & Document Engine
- **A4 Document Page Stack**: Multi-page layout engine supporting dynamic text reflow and automatic auto-page creation.
- **Multi-Book Sidebar Tree**: Nested workspace folder system allowing creation, renaming, and switching between books and pages.
- **Real-Time Document Search**: Search bar engine scanning all text nodes with match counters, `<mark>` highlights, and match navigation.

### 🖋️ 3. Studio Formatting & 100+ Fonts
- **Formatting Tools**: Bold, Italic, Underline, Left/Center/Right text alignment, and line-spacing controls.
- **Structured Lists**: Bullet lists (`ul`), Numbered lists (`ol`), and interactive Checklists.
- **100+ Google Fonts Library**: Instant typography selection (Sumana, Inter, Caveat, Playfair Display, Fira Code, Outfit, Homemade Apple, etc.).
- **Font Scaling**: Preset small (13px), medium (18px), and large (26px) font sizing controls.

### 🎨 4. Custom HSL & HEX Spectrum Color Pickers
- **Text Color Spectrum**: Interactive HSL canvas picker with dynamic hue slider, HEX badge display, and native input fallback.
- **Text Highlight Swatches**: 12 curated pastel highlight tones (Yellow, Mint, Lavender, Coral, Soft Red, Lime, etc.).
- **Page Canvas Background Shading**: Custom canvas background picker for warm ivory, dark mode, or custom tints.
- **Ink Spectrum Selector**: Dedicated color palette for freehand drawing tools.

### 🖌️ 5. Freehand Sketch & Drawing Layer
- **Layered Drawing Canvas**: Freehand sketching layer embedded directly on top of every page.
- **Tool Modes**: Text Mode, Fountain Pen, Pencil, Art Brush, and Eraser.
- **Stroke Weights**: Fine (2px), Medium (6px), and Thick (14px) stroke thickness selection.

### 📄 6. Media Insertion & Exporting
- **Image Insertion**: Upload and place local image assets directly into notes.
- **Table Insertion**: Dynamic HTML data table embedding.
- **PDF Export Suite**: One-click high-definition PDF export generated via `html2canvas`, `html2pdf.js`, and `jsPDF`.
- **Note Link Sharing**: Instant shareable link generator for specific pages.

### ☁️ 7. Firebase Auth & Cloud Sync
- **Google Sign-In**: Firebase Authentication support with popup and fallback redirect modes.
- **Firestore Cloud Sync**: Automatic background saving of notes scoped per user ID.
- **Offline Persistence**: LocalStorage caching and offline fallback handling.

---

## 🛠️ Architecture & Tech Stack

```
AI Note Architecture
├── Design & UI Specs  : Adobe Photoshop, Adobe Illustrator, Figma
├── Frontend Framework : HTML5, Vanilla CSS3 (Design Tokens), JavaScript ES6+
├── Motion & Scroll    : GSAP 3, ScrollTrigger, Lenis Smooth Scroll
├── Auth & Storage     : Firebase Web SDK v10 (Google Auth, Cloud Firestore)
├── PDF & Canvas Engine: html2pdf.js, html2canvas, jsPDF
└── Icons & Fonts      : FontAwesome 6 Free, Google Fonts API
```

---

## 📁 Repository Structure

```
ai-note/
├── assets/                  # UI textures, icons, GIFs, and app screenshots
├── firebase/
│   ├── auth.js              # Google Auth popup & redirect handler
│   ├── firebase-config.js   # Firebase Web SDK initialization
│   └── firestore.js         # Cloud Firestore note persistence
├── app.js                   # Session state observer & app bootstrapper
├── index.html               # Main Note Editor desk workspace
├── landing.html             # Hermes editorial marketing landing page
├── landing.css              # Landing page styles & animation keyframes
├── landing.js               # Lenis scroll controller & GSAP triggers
├── right_sidebar.js         # Studio inspector tool controls & color spectrum pickers
├── script.js                # Document pagination & editor engine
└── style.css                # Desk workspace design system, typography & themes
```

---

## 💻 Local Setup Instructions

1. Clone or download the project files.
2. Serve the directory using any HTTP server (required for Firebase Auth ES Modules):

```bash
# Using Python 3
python3 -m http.server 8000
```

3. Open `http://localhost:8000/landing.html` in your browser.

---

<div align="center">
  <sub>Notes 101 — Designed with Photoshop, Illustrator & Figma · 100% Free & Open Source</sub>
</div>
