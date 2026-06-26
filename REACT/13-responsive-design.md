# Module 13: Responsive Web Design in React (Airbnb Grid System)

Modern web applications must deliver seamless user experiences across a wide range of devices—from small mobile screens and tablets to ultra-wide desktop monitors. Mastering Responsive Web Design (RWD) in React involves writing mobile-first styles, leveraging CSS Grid and Flexbox, tracking breakpoints using React hooks, and optimizing layouts to prevent Cumulative Layout Shift (CLS).

---

## 1. Mental Model (The Airbnb Search Dashboard)

Think of **Airbnb's Search & Exploration Grid**:
- **Mobile Viewport (Smartphone):** The layout is clean and focused. The screen displays a single, vertical column of property images, with details stacked below. The filter controls are hidden behind a sliding bottom drawer to maximize image space.
- **Tablet Viewport:** As the screen widens, the layout morphs into a two-column grid. The header expands to show navigation links instead of a search icon.
- **Desktop Viewport:** The screen displays a four-column grid. A split-pane layout appears, displaying a real-time interactive Google Map side-by-side with the property cards.

Instead of writing separate websites for each device, we build a single, responsive React codebase. The application dynamically adjusts layouts, responsive grids, image source sets, and sidebar drawers based on screen dimensions.

---

## 2. Visual Thinking (Responsive Breakpoints Grid System)

How layouts adapt dynamically across mobile, tablet, and desktop breakpoints:

```
[ MOBILE BREAKPOINT: < 768px ]
┌─────────────────────────┐
│       [ Search ]       │
├─────────────────────────┤
│  ┌───────────────────┐  │
│  │   Property Card   │  │
│  │     (1 Column)    │  │
│  └───────────────────┘  │
└─────────────────────────┘

[ TABLET BREAKPOINT: 768px - 1024px ]
┌───────────────────────────────────────┐
│     [ Search ]         [ Filters ]    │
├───────────────────────────────────────┤
│  ┌────────────────│ ┌────────────────┐ │
│  │  Property Card │ │  Property Card │ │
│  │   (2 Columns)  │ │   (2 Columns)  │ │
│  └────────────────┘ └────────────────┘ │
└───────────────────────────────────────┘

[ DESKTOP BREAKPOINT: > 1024px ]
┌─────────────────────────────────────────────────────────────────────┐
│ Logo    [      Search Bar      ]     Host   Settings                │
├──────────────────────────────────────────────────┬──────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│                  │
│  │  Prop Card   │ │  Prop Card   │ │  Prop Card   ││  Interactive     │
│  │  (3 Columns) │ │  (3 Columns) │ │  (3 Columns) ││  Google Map      │
│  └──────────────┘ └──────────────┘ └──────────────┘│  Pane            │
└──────────────────────────────────────────────────┴──────────────────┘
```

---

## 3. Beginner Explanation

- **Responsive Web Design (RWD):** The practice of designing websites that adapt fluidly to different screen sizes, resolutions, and orientations.
- **Mobile-First Design:** The strategy of styling layouts for small screen sizes first, then adding media queries to enhance the layout as the screen grows.
- **Media Queries:** CSS rules that apply styles only if screen conditions (like a minimum width) are met.
- **CSS Grid:** A two-dimensional layout system that manages both columns and rows.
- **Flexbox:** A one-dimensional layout system that aligns elements in a single row or column.
- **Cumulative Layout Shift (CLS):** A Google Web Vitals metric that measures how much elements shift around on screen during page load.

---

## 3.5. Syntax & Basic Code Mechanics

Before building complex dynamic dashboards like Airbnb, let's look at the absolute simplest, bare-minimum way to handle responsiveness in React using both **CSS media queries** and a **JavaScript matchMedia listener**.

### The CSS File (CSS Modules)
```css
/* Box.module.css */

/* 1. Mobile-First Default: applies to screens smaller than 768px */
.box {
  background-color: #ffe6e6; /* Soft red */
  color: #800000;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s ease;
}

/* 2. Breakpoint Enhancement: applies to screens 768px or wider */
@media (min-width: 768px) {
  .box {
    background-color: #e6f7ff; /* Soft blue */
    color: #0050b3;
  }
}
```

### The Component Code
```jsx
// Box.jsx
import React, { useState, useEffect } from 'react';
import styles from './Box.module.css';

export function Box() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // 1. Establish a native browser media query match listener
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    // 2. Set the initial state on mount
    setIsMobile(mediaQuery.matches);

    // 3. Define the listener callback function
    const handleMatch = (e) => {
      setIsMobile(e.matches);
    };

    // 4. Register the match change event listener
    mediaQuery.addEventListener('change', handleMatch);

    // 5. Return the cleanup function to remove listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMatch);
    };
  }, []);

  return (
    <div className={styles.box}>
      <p>This box adjusts its color and text responsively!</p>
      
      {/* Conditionally render different text layouts in JavaScript */}
      {isMobile ? (
        <p>📱 Viewing on a **Mobile** device.</p>
      ) : (
        <p>💻 Viewing on a **Desktop / Tablet** device.</p>
      )}
    </div>
  );
}
```

### Line-by-Line Breakdown for Beginners

1. **`.box { ... }` (Mobile-First CSS)**
   - In our CSS module, we define the default styling for `.box` without any media query wrappers. This ensures mobile devices (which are smaller and often slower) process these baseline styles immediately.
2. **`@media (min-width: 768px) { ... }` (Progressive Media Query)**
   - We tell the browser: *"If the screen width is at least 768px (like tablets or laptops), override the background and text color."* The browser handles this styling transition automatically.
3. **`const mediaQuery = window.matchMedia('(max-width: 767px)');`**
   - Inside `useEffect`, we call `window.matchMedia`. This is a built-in browser API that checks if the viewport currently matches a CSS query (in this case, less than 768px).
4. **`setIsMobile(mediaQuery.matches);`**
   - We check the matches status on load (`true` if mobile, `false` if not) and save it to our `isMobile` state variable.
5. **`mediaQuery.addEventListener('change', handleMatch);`**
   - We listen for screen size changes. The browser will call `handleMatch` **only** when the screen crosses the 768px boundary (moving in or out of the media query match). This is extremely efficient and prevents performance lag.
6. **`return () => { mediaQuery.removeEventListener('change', handleMatch); };`**
   - The cleanup return function removes the listener. If the user navigates away, React releases the memory and stops listening.
7. **`{isMobile ? <p>📱 ...</p> : <p>💻 ...</p>}`**
   - A standard ternary expression. We conditionally switch what elements are rendered in our DOM depending on the viewport state.

---

## 4. Deep Explanation (Mobile-First, CSS Grid, & Viewport Hooks)

### 1. The Mobile-First Paradigm
Historically, developers styled layouts for desktop screens and squeezed them down for mobile. This required complex overrides and resulted in heavy mobile page weights. 
**Mobile-First styling is the industry standard:**
- Write baseline CSS for mobile screens *without* media queries.
- Add progressive layout enhancements using `@media (min-width: ...)` breakpoints.
- This ensures mobile browsers (which often have slower CPUs and networks) load minimal styling overrides.

### 2. Responsive Grids with CSS Modules
Using CSS Grid allows you to build highly fluid grid containers without hardcoding pixel values:
```css
/* CardGrid.module.css */
.grid {
  display: grid;
  /* Mobile-first: 1 column by default */
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

/* TabletBreakpoint */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* DesktopBreakpoint */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

### 3. React Viewport Breakpoint Hooks
Sometimes, CSS media queries are not enough. If you need to render completely different components on mobile versus desktop (e.g. rendering a sliding bottom drawer on mobile vs a side modal on desktop), you can use a **React Viewport Hook** that listens to window matches:
```javascript
const isMobile = useMediaQuery('(max-width: 767px)');
```

---

## 5. Real Production Examples (Airbnb Grid)

### 1. Dynamic Split-Pane Layout (Media Listener Hook)
Listening to screen matches to dynamically render the map pane.
```jsx
// useMediaQuery.js
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    // Check initial match on load
    return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);

    // Modern browsers support addEventListener on media query list objects
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

### 2. Split Dashboard Viewport
```jsx
// AirbnbDashboard.jsx
import React from 'react';
import { useMediaQuery } from './useMediaQuery';
import { PropertyGrid } from './PropertyGrid';
import { InteractiveMap } from './InteractiveMap';

export function AirbnbDashboard() {
  // Check if screen matches desktop view (min-width: 1024px)
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="airbnb-layout-root">
      <main className="listings-section">
        <PropertyGrid />
      </main>
      
      {/* Conditionally render heavy map component ONLY on desktop viewports */}
      {isDesktop && (
        <aside className="map-sidebar">
          <InteractiveMap />
        </aside>
      )}
    </div>
  );
}
```

### 3. Responsive Card Image with CLS Protection (Aspect Ratio CSS)
Setting aspect-ratios to prevent elements from jumping around as high-res images load.
```css
/* CardImage.module.css */
.imageWrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 20 / 19; /* Sets pre-render space to prevent Cumulative Layout Shift */
  background-color: #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
}

.cardImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
```jsx
// CardImage.jsx
import React from 'react';
import styles from './CardImage.module.css';

export function CardImage({ src, alt }) {
  return (
    <div className={styles.imageWrapper}>
      <img 
        className={styles.cardImg} 
        src={src} 
        alt={alt} 
        loading="lazy" // Native browser lazy loading
      />
    </div>
  );
}
```

### 4. Sliding Filters Drawer Panel (Mobile vs Desktop Layout)
```jsx
// FiltersControl.jsx
import React, { useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

export function FiltersControl() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filters-container">
      {isMobile ? (
        <>
          <button className="mobile-filter-bar" onClick={() => setIsOpen(true)}>
            🔍 Filters
          </button>
          {isOpen && (
            <div className="bottom-sheet-drawer" role="dialog">
              <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
              <div className="drawer-content">{/* Filter inputs */}</div>
            </div>
          )}
        </>
      ) : (
        <div className="desktop-filters-panel">
          {/* Static layout for desktop filter sidebar */}
        </div>
      )}
    </div>
  );
}
```

---

## 6. Progressive Coding (Grid Layouts Evolution)

### Level 1: Beginner (Hardcoded Widths - Horizontal Scroll Glitch)
```css
/* BAD: Hardcoded pixel dimensions break layout on smaller viewports. */
.card-container {
  width: 1200px;
  display: flex;
}
.card {
  width: 300px;
}
```

### Level 2: Better (Percent Layouts & Legacy Overrides)
```css
/* BETTER: Fluid percent widths. 
However, desktop-first overrides are hard to read and scale. */
.card {
  width: 100%;
}
@media (min-width: 768px) {
  .card {
    width: 50%;
    float: left;
  }
}
@media (min-width: 1024px) {
  .card {
    width: 25%;
  }
}
```

### Level 3: Production (Modern Mobile-First CSS Grid Setup)
```css
/* PRODUCTION: Mobile-first responsive grids, utilizing CSS Modules. */
.grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

### Level 4: Enterprise (High-Aesthetic Dynamic Airbnb Grid & Adaptive Drawer)
```css
/* EnterpriseContainer.module.css */
.container {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

.mainSection {
  padding: 1rem;
}

.responsiveList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Enhancing dashboard details for wider displays */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: 3fr 2fr; /* Splits screen into list (left) and map (right) */
  }
  .mainSection {
    padding: 2.5rem;
  }
}
```
```jsx
// EnterpriseDashboard.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './EnterpriseContainer.module.css';
import { useMediaQuery } from './useMediaQuery';
import { CardImage } from './CardImage';

export function EnterpriseDashboard({ properties }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const memoizedGrid = useMemo(() => {
    return (
      <div className={styles.responsiveList}>
        {properties.map(prop => (
          <article key={prop.id} className="prop-card">
            <CardImage src={prop.image} alt={prop.title} />
            <div className="card-info-row">
              <h5>{prop.title}</h5>
              <span>★ {prop.rating}</span>
            </div>
            <p className="price-line">${prop.price} night</p>
          </article>
        ))}
      </div>
    );
  }, [properties]);

  return (
    <div className={styles.container}>
      <section className={styles.mainSection}>
        {memoizedGrid}
      </section>
      
      {isDesktop && (
        <aside className="interactive-map-sidebar" aria-label="Geographic Search Map">
          {/* Real-time map loading container */}
        </aside>
      )}
    </div>
  );
}

EnterpriseDashboard.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string
    })
  ).isRequired
};
```

---

## 7. Common Mistakes

1. **Designing Desktop-First:**
   Writing style defaults for heavy desktop monitor layouts and overriding them down for mobile. This creates bloated stylesheets and degrades mobile performance. Always write mobile-first.
2. **Reading raw window size variables during paint passes:**
   ```jsx
   // BUG: Accessing window.innerWidth directly inside components triggers re-renders 
   // on every pixel shift, severely lagging the browser!
   const width = window.innerWidth; 
   
   // Fix: Use event debouncing or matchMedia listeners inside a custom hook.
   ```
3. **Omitting height and width aspect-ratios on images:**
   Failing to set dimensions on containers before lazy-loaded media loads. This causes the UI to jump around (layout shift), frustrating users and hurting search rankings.

---

## 8. Best Practices

1. **Use `auto-fill` and `minmax` for grids:**
   ```css
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   ```
   This creates responsive columns automatically without relying on hardcoded breakpoint media queries.
2. **Prioritize Aspect Ratios:** Always define an `aspect-ratio` on image parent boxes to secure layout space before the image resources download.
3. **Use matchMedia instead of resize listeners:** Use `window.matchMedia` listeners inside React hooks. Browsers evaluate media queries natively, making matchMedia much faster than polling screen resize coordinates.

---

## 9. Interview Preparation

### Q1: What is Mobile-First design, and why is it preferred over Desktop-First design?
**Answer:** Mobile-First design is a styling strategy where default CSS styles are written for mobile layouts first, and media queries (`min-width`) are added progressively to adjust the layout for larger viewports. It is preferred because:
- Mobile browsers load minimal CSS overrides, improving performance on slower mobile devices.
- It forces developers to design focused, clean layouts.
- It is easier to scale a simple design up for desktop than to shrink a complex desktop design down for mobile.

### Q2: What is Cumulative Layout Shift (CLS), and how do you prevent it when lazy loading images?
**Answer:** CLS measures how much layout elements jump around as resources (like images, ads, or fonts) load dynamically on the page. To prevent CLS when lazy loading images:
- Use the CSS `aspect-ratio` property or define a fixed height and width on the image's parent container.
- This tells the browser's layout engine to secure that space before the image file is downloaded, keeping the content below from shifting when the image renders.

### Q3: Why is `window.matchMedia` preferred over listening to window resize events in React?
**Answer:** Listening to `window.resize` triggers a callback function on every single pixel change as the user resizes their browser, which can cause significant UI lag. `window.matchMedia` allows you to listen to specific breakpoint matches. The browser handles the media checks natively and triggers the callback function *only* when the screen crosses the breakpoint threshold.

---

## 10. Homework

1. **Build a Mobile-First Property Grid:** Write a grid that renders cards in 1 column (mobile), 2 columns (tablet), and 4 columns (desktop) using CSS Modules.
2. **Responsive Sidebar Filters Panel:** Implement a viewport hook. Render a sliding bottom drawer on mobile and a fixed sidebar on desktop.
3. **Layout Shift Aspect-Ratio Fix:** Build a card layout with dynamic images. Simulate a slow 3-second download, verify that the text below does not jump, and report your solution.
4. **Adaptive Header Navigation Menu:** Build a header. Use a viewport hook to toggle between a hamburger dropdown menu on mobile and flat link strips on desktop.
5. **Autosave Screen Dimension Logger:** Create a component that logs window dimensions. Implement a custom debounce hook to ensure updates execute at most once every 300ms.
