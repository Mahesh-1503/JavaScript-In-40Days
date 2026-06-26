# Module 06: Styling React Applications (Netflix Theme Switcher)

Applying styles to a React application requires balancing performance, scope encapsulation, and maintainability. Professional engineers must master the core styling methodologies—Inline Styles, CSS Modules, CSS Custom Properties (Variables), and CSS-in-JS—while matching each tool to the appropriate architectural requirement.

---

## 1. Mental Model (The Netflix Theme Switcher)

Think of **Netflix's User Interface**:
- **Theme Variables:** Netflix uses a unified palette: deep black backgrounds, brand red accents, and high-contrast white text. When a user switches profiles (e.g. from standard mode to Kids Mode), the entire color scheme transitions to bright, friendly colors.
- **Component Scope:** A `MovieCard` on the dashboard has specific dimensions, padding, and animations. If another developer builds a `NotificationCard` in a separate directory, their styles must not leak and alter the layout of the `MovieCard`.
- **Dynamic Adaptations:** When you hover over a hero banner, the background details fade, and overlay text slides up. The styles must adapt dynamically in response to user actions and hover states.

To support this, we split styling into:
- **CSS Custom Properties (Variables):** For application-wide tokens (colors, margins, font sizing).
- **CSS Modules:** For component-scoped, collision-free layout definitions.
- **Inline Styles:** Reserved exclusively for dynamic, script-calculated values (like progress bars or drag offsets).

---

## 2. Visual Thinking (Styling Compilation & Scope Resolution)

How styling models are processed by React and browser engines:

```
[ INLINE STYLES ]
JSX: <div style={{ color: 'red' }}>
Result: Directly injected into HTML style attributes at runtime.
Con: No pseudo-selectors (:hover) or media queries.

[ CSS MODULES ]
JSX: import styles from './Card.module.css';
     <div className={styles.card}>

                  │
                  ▼ (Build compilation - CSS Hashing)
                  
HTML DOM: <div class="Card_card__a8d2c">
Result: Automatically generates unique hashed classes to prevent global leaks.

[ CSS CUSTOM PROPERTIES (Variables) ]
CSS: :root { --netflix-red: #E50914; }
     .hero { color: var(--netflix-red); }
Result: Native browser variables, editable via JS on the fly for system-wide themes.
```

---

## 3. Beginner Explanation

- **Inline Styles:** Applying styles directly to JSX tags using JavaScript objects (e.g., `style={{ fontSize: '14px' }}`).
- **CSS Modules:** A system where CSS class names are scoped locally to a specific component, avoiding naming conflicts with other files.
- **CSS Variables (Custom Properties):** Native CSS variables (`--name: value`) defined in stylesheet roots that can be dynamically read and updated by JavaScript.
- **Cumulative Layout Shift (CLS):** An core web metric measuring visual stability. Poorly loaded styles that cause layout elements to jump around during render hurt the user experience.

---

## 3.5. Syntax & Basic Code Mechanics

Before structuring complex themes like Netflix, let's look at the absolute simplest way to apply styles in React using both **Inline Styles** (for dynamic values) and **CSS Modules** (for structured layouts).

### The CSS Module File (Scoped Styling)
CSS Modules end with `.module.css`. They compile automatically into unique, hashed classes.
```css
/* Card.module.css */

.cardBox {
  border: 1px solid #dddddd;
  padding: 16px;
  border-radius: 8px;
  font-family: sans-serif;
  background-color: #fafafa;
}

.title {
  margin: 0 0 10px 0;
  font-size: 20px;
}
```

### The Component Code
```jsx
// Card.jsx
import React from 'react';
import styles from './Card.module.css';

export function Card({ title, description, colorAccent }) {
  // Inline styles must be written as a JavaScript object
  const titleStyle = {
    color: colorAccent || '#333333',
    borderBottom: `2px solid ${colorAccent || '#333333'}`
  };

  return (
    // 1. We apply scoped class selectors from our imported styles object
    <div className={styles.cardBox}>
      {/* 2. We apply dynamic, custom styles directly to the style prop */}
      <h3 className={styles.title} style={titleStyle}>
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
}
```

### Line-by-Line Breakdown for Beginners

1. **`import styles from './Card.module.css';`**
   - We import our CSS file as a JavaScript object named `styles`. 
   - The build tool compiles CSS classes like `.cardBox` into unique identifiers (e.g. `Card_cardBox__h3g8a`) so they never conflict with other components.
2. **`const titleStyle = { color: ... };`**
   - Inline styles in React are written as key-value pairs inside standard JavaScript objects.
   - Property names must use **camelCase** instead of standard CSS kebab-case (e.g., `border-bottom` becomes `borderBottom`).
3. **`className={styles.cardBox}`**
   - To apply a CSS module class in JSX, we use `className` instead of the standard HTML `class`. We pass it the variable path from the imported `styles` object.
4. **`style={titleStyle}`**
   - We pass our styling object directly to the built-in React `style` prop. 
   - You can also write this inline using "double curlies" syntax: `style={{ color: colorAccent }}`. The first set of curlies creates the JSX portal, and the second set creates the JavaScript object.

---

## 4. Deep Explanation (React Specifics, Speficity, & Runtimes)

### 1. Specificity Escalation in React
Inline styles in React are injected as inline HTML attributes, giving them the highest specificity ranking (`1000` in the CSS cascade). They will override external stylesheets and CSS module definitions. Overusing inline styles makes overriding layouts via responsive class systems or print stylesheets nearly impossible.

### 2. Runtime CSS-in-JS vs. Zero-Runtime CSS Modules
Libraries like `styled-components` operate a **runtime engine**:
- They watch component props, compute new styles, create a unique class name, and inject it into a `<style>` tag in the HTML head at runtime.
- **The Tradeoff:** While extremely flexible, runtime generation incurs a CPU overhead during component mounts and updates.
- **The Alternative:** **CSS Modules** compile down to simple static CSS stylesheets during the build step, resulting in zero Javascript execution overhead when the browser renders pages.

### 3. Dynamic Styling via CSS Custom Properties
Instead of re-creating styling objects in JavaScript on every state transition, you can define global CSS custom properties and modify them dynamically in JS. The browser handles the CSS tree re-paints natively:
```javascript
// Dynamic theme updates using CSS Variables
document.documentElement.style.setProperty('--primary-color', '#E50914');
```

---

## 5. Real Production Examples (Netflix Components)

### 1. Dynamic Video Playback Progress Bar (Inline Styles)
Inline styles are perfect for values calculated by active scripting, such as playback percentages.
```jsx
// PlaybackProgress.jsx
export function PlaybackProgress({ percentage }) {
  return (
    <div className="progress-track" style={{ height: '4px', backgroundColor: '#333' }}>
      <div 
        className="progress-fill" 
        style={{ 
          width: `${percentage}%`, 
          backgroundColor: '#E50914', 
          transition: 'width 0.1s linear' 
        }} 
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}
```

### 2. Scoped Billboard Hero Component (CSS Modules)
```css
/* Hero.module.css */
.billboard {
  position: relative;
  height: 56.25vw;
  background-color: var(--theme-bg);
}
.title {
  font-size: 3rem;
  color: var(--theme-text);
}
.playButton {
  background-color: #ffffff;
  color: #000000;
  padding: 0.5rem 1.5rem;
}
.playButton:hover {
  background-color: rgba(255, 255, 255, 0.75);
}
```
```jsx
// Hero.jsx
import styles from './Hero.module.css';

export function Hero({ title, description }) {
  return (
    <div className={styles.billboard}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <button className={styles.playButton}>Play</button>
    </div>
  );
}
```

### 3. Design Tokens Context Provider (CSS Custom Properties Injection)
```jsx
// ThemeProvider.jsx
import React, { useLayoutEffect } from 'react';

const THEMES = {
  standard: {
    bg: '#141414',
    text: '#ffffff',
    accent: '#E50914'
  },
  kids: {
    bg: '#f3f3f3',
    text: '#141414',
    accent: '#0080ff'
  }
};

export function ThemeProvider({ mode = 'standard', children }) {
  // useLayoutEffect prevents visual flash before browser paint
  useLayoutEffect(() => {
    const theme = THEMES[mode] || THEMES.standard;
    const root = document.documentElement;

    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-accent', theme.accent);
  }, [mode]);

  return <div className="theme-wrapper">{children}</div>;
}
```

### 4. Utility-Based Dynamic Classname Builder
Combining CSS Modules with dynamic conditional helper attributes.
```jsx
// MovieCard.jsx
import styles from './MovieCard.module.css';

export function MovieCard({ title, isTrending, isMuted }) {
  // Build classnames dynamically based on boolean states
  const cardClassName = [
    styles.card,
    isTrending && styles.trendingHighlight,
    isMuted && styles.mutedOverlay
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClassName}>
      <h4>{title}</h4>
    </div>
  );
}
```

### 5. Accessibility Color Contrast Override
Providing manual overrides for readability.
```jsx
// AccessibleText.jsx
export function AccessibleText({ content, highContrast }) {
  return (
    <span 
      style={highContrast ? { color: '#ffff00', letterSpacing: '0.05rem' } : null}
      className="caption-text"
    >
      {content}
    </span>
  );
}
```

---

## 6. Progressive Coding (Monolithic Style to Scoped Tokens)

### Level 1: Beginner (Monolithic Inline Styles)
```jsx
// BAD: Inefficient style object recreation on every render, clutters JSX, lacks CSS features.
export function BeginnerHeroCard({ title }) {
  return (
    <div style={{ backgroundColor: '#141414', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#fff', fontSize: '24px' }}>{title}</h2>
      <button style={{ backgroundColor: 'red', border: 'none', color: '#white' }}>Play</button>
    </div>
  );
}
```

### Level 2: Better (External Stylesheet Classnames)
```css
/* global.css */
/* BETTER: Clean separation. However, classes are global and risk collisions elsewhere */
.hero-card {
  background-color: #141414;
  padding: 20px;
}
.hero-title {
  color: #fff;
  font-size: 24px;
}
```
```jsx
import './global.css';

export function BetterHeroCard({ title }) {
  return (
    <div className="hero-card">
      <h2 className="hero-title">{title}</h2>
      <button className="hero-btn">Play</button>
    </div>
  );
}
```

### Level 3: Production (Scoped CSS Modules Setup)
```css
/* HeroCard.module.css */
.card {
  background-color: #141414;
  padding: 20px;
  border-radius: 8px;
}
.title {
  color: #ffffff;
}
```
```jsx
// PRODUCTION: Styles are local to HeroCard. Bundler compiles classes into unique local tokens.
import styles from './HeroCard.module.css';

export function ProductionHeroCard({ title }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
```

### Level 4: Enterprise (High-Aesthetic Scoped Tokens & Theme Switcher)
```css
/* EnterpriseBillboard.module.css */
.billboardContainer {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  padding: 4rem 2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.billboardTitle {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.accentLine {
  height: 4px;
  width: 80px;
  background-color: var(--theme-accent);
  margin-bottom: 2rem;
}

/* Responsive Grid Adaptability */
@media (max-width: 768px) {
  .billboardContainer {
    padding: 2rem 1rem;
  }
}
```
```jsx
// ENTERPRISE: A fully interactive billboard system wrapped inside design system tokens.
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './EnterpriseBillboard.module.css';

export function EnterpriseBillboard({ 
  title, 
  synopsis, 
  ratingScore, 
  customAccentColor 
}) {
  // Override localized accent values inline while utilizing CSS variables for core themes
  const customAccentStyle = useMemo(() => {
    return customAccentColor ? { '--theme-accent': customAccentColor } : null;
  }, [customAccentColor]);

  return (
    <section 
      className={styles.billboardContainer} 
      style={customAccentStyle}
      aria-label={`Featured Spotlight: ${title}`}
    >
      <div className={styles.accentLine} />
      <h2 className={styles.billboardTitle}>{title}</h2>
      <p className="synopsis-paragraph">{synopsis}</p>
      
      <div className="meta-stats-row">
        <span className="rating-pill">Score: {ratingScore}/10</span>
      </div>
    </section>
  );
}

EnterpriseBillboard.propTypes = {
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  ratingScore: PropTypes.number.isRequired,
  customAccentColor: PropTypes.string
};
```

---

## 7. Common Mistakes

1. **Re-declaring static styles inside Inline style objects:**
   ```jsx
   // BUG: Re-creates the style object on every single render pass, stressing GC.
   // Static styles belong in stylesheets or CSS Modules!
   <div style={{ display: 'flex', color: 'blue', zIndex: 100 }} />
   ```
2. **Global class leaks via standard CSS imports:**
   Importing `import './Card.css'` inside component file A does NOT restrict its classes to card component A. The classes are global and can leak to component B.
3. **Invalid CSS module class identifiers:**
   ```jsx
   // BUG: Writing dots or dashes directly as JS properties will break compilation.
   // Wrong: className={styles.btn-primary}
   // Right: className={styles.btnPrimary} or className={styles['btn-primary']}
   ```

---

## 8. Best Practices

1. **Use CSS Variables for Theming:** Never hardcode HEX values. Store colors as variables in a global stylesheet and reference them in CSS Modules.
2. **Co-locate Style Files:** Place your CSS modules in the same directory as the component they style (e.g. `MovieCard.jsx` and `MovieCard.module.css`).
3. **Pre-render Container Space:** Add skeleton loaders with pre-defined heights to prevent visual layout shifts (CLS) when remote images load.

---

## 9. Interview Preparation

### Q1: What are the primary differences between CSS Modules and inline styles?
**Answer:** 
- **CSS Modules** compile at build time into standard CSS stylesheets. They support the full suite of CSS features (pseudo-classes, animations, media queries), prevent naming collisions via hashing, and compile to static assets that browsers cache efficiently.
- **Inline Styles** are injected as HTML style attributes at runtime. They do not support pseudo-classes or media queries, override all stylesheet declarations, and can degrade rendering performance when large objects are recreated during updates.

### Q2: How does a bundler like Vite resolve CSS Module imports?
**Answer:** When Vite encounters a `.module.css` file:
1. It parses the class names inside the file and hashes them into unique string combinations (e.g. `btn` becomes `Button_btn__1a3b5`).
2. It compiles these hashes into a stylesheet and injects it into the DOM.
3. It returns a JavaScript object mapping the original class names (keys) to the hashed class names (values) so React can output the correct class string in JSX.

### Q3: What is Cumulative Layout Shift (CLS), and how does CSS styling impact it?
**Answer:** CLS is a metric that tracks how much elements shift around on screen during page load. It is often caused by dynamically loaded components or images that lack pre-defined dimensions. To optimize CLS:
- Ensure heavy components have placeholder loader wrappers.
- Specify height/width ratios on static images.
- Avoid updating layouts inside runtime JS styling blocks after elements render.

---

## 10. Homework

1. **Implement Kids Profile Theme Switcher:** Build a theme switcher that switches between standard dark mode and kids light mode using CSS Custom Properties.
2. **Create Scoped Card Component:** Write a component wrapped inside a CSS Module. Add layout properties, hover selectors, and media queries.
3. **Progress Loader Slider Component:** Build a dynamic bar using inline styles to apply calculated widths, and styles to design the structural tracks.
4. **Conditional Button Module Styles:** Construct a button component. Apply multiple CSS modules classes dynamically using conditional arrays.
5. **Aesthetics Redesign Report:** Convert an older global CSS checklist layout to utilize scoped CSS Modules, and write a summary explaining your structural improvements.
