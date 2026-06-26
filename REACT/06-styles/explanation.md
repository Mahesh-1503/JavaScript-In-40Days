## 1. Inline Styles

This method involves passing a style object directly to an element's `style` attribute.

| Feature               | Description                                                                                                                                 |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **Format**            | Style must be passed as a **JavaScript object**.                                                                                            |
| **Property Naming**   | CSS property names use **camelCase** (e.g., `font-size` becomes `fontSize`, `background-color` becomes `backgroundColor`).                  |
| **Values**            | Values must be **strings** (for values with units, e.g., `'20px'`). Numbers without units (like `20` for `zIndex`) are interpreted as `px`. |
| **Real-Life Example** | `<div style={{ fontSize: '16px', backgroundColor: 'lightblue' }}>Content</div>`                                                             |

### Pros 👍

- **Scoped by Default:** Styles are applied only to the specific element, preventing interference with other elements.
- **Dynamic Styling:** Easily use JavaScript variables and logic to compute and apply styles dynamically.
- **High Specificity:** Overrides almost all other styling methods (though less preferred than class-based overrides).

### Cons 👎

- **Limited CSS Features:** Cannot use pseudo-classes (`:hover`, `:focus`), pseudo-elements (`::before`, `::after`), or media queries.
- **Poor Maintainability:** Clutters component markup, especially for complex styles.
- **No Code Reuse:** Styles cannot be easily shared or reused across multiple elements or components.

---

## 2. External CSS (Global Stylesheet)

This method involves creating a separate `.css` file and importing it, which typically applies styles globally.

| Feature            | Description                                                                              |
| :----------------- | :--------------------------------------------------------------------------------------- |
| **File Structure** | A **separate CSS file** is imported into your component (e.g., `import './style.css';`). |
| **Usage**          | Useful for defining **global styles**, layouts, and utility classes.                     |
| **Benefit**        | Keeps your **component code clean** and organized by separating concerns.                |

### Pros 👍

- **Full CSS Feature Set:** Supports all standard CSS features (pseudo-classes, pseudo-elements, media queries, keyframes).
- **Code Reuse:** Styles can be easily **reused** across multiple components via standard CSS class names.
- **Clean Component Code:** Separates structure (HTML/JSX) from presentation (CSS).

### Cons 👎

- **Global Scope:** Class names are **global**, which can lead to style collisions or unintended overrides if not carefully named (e.g., using **BEM**).
- **Maintenance Overhead:** Finding and overriding styles can become difficult in large applications due to the global nature of the cascade.

---

## 3. CSS Modules

This method is an extension of External CSS that automatically scopes class names to prevent global conflicts.

| Feature         | Description                                                                                                      |
| :-------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Scoping**     | **Scopes CSS** to a specific component by creating unique, automatically generated class names.                  |
| **File Naming** | Typically uses the convention **`[name].module.css`** (e.g., `Button.module.css`).                               |
| **Import**      | Styles are **imported as an object** (e.g., `import styles from './Button.module.css';`).                        |
| **Usage**       | Used by applying the imported object's properties as class names (e.g., `<button className={styles.myButton}>`). |

### Pros 👍

- **No Global Conflicts:** Class names are locally scoped and unique, completely eliminating the worry of style collisions from the global cascade.
- **Full CSS Feature Set:** Retains support for all standard CSS features (media queries, pseudo-selectors, etc.).
- **Explicit Dependencies:** It's clear exactly which styles are being used in a component, improving code clarity.

### Cons 👎

- **Naming Convention:** Requires a specific file naming convention (e.g., `.module.css`).
- **Learning Curve:** Slightly different syntax for importing and applying styles compared to standard CSS imports.
- **Manual Global Classes:** Defining _truly_ global styles (like resets) requires an explicit `:global()` wrapper or a separate, non-module stylesheet.

## 4. Styled Components (CSS-in-JS)

This method involves using a library like `styled-components` (a popular **CSS-in-JS** solution) to create **composable, reusable, and encapsulated styles** directly within your JavaScript component files.

| Feature             | Description                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| **Library**         | Uses a **JavaScript library** (e.g., `styled-components`, Emotion) to write CSS.                                        |
| **Syntax**          | Styles are written using **template literals (tagged templates)**, applying standard CSS syntax directly within JS/JSX. |
| **Creation**        | Styles create **new React components** (e.g., `const Button = styled.button`...).                                       |
| **Encapsulation**   | Styles are automatically **scoped** via unique class names generated at runtime, preventing global conflicts.           |
| **Dynamic Styling** | Easy integration with component **props and state** for dynamic styling.                                                |

### Pros 👍

- **True Encapsulation:** Styles are **scoped** to the generated component (similar to CSS Modules but built into the component itself), entirely eliminating global conflicts.
- **Dynamic Styling:** Seamlessly use component **props and state** within the CSS for highly dynamic and context-aware styling.
- **Co-location:** Styles are defined **alongside the component logic**, making it easy to know where styles are defined and what they apply to.
- **Composability:** Easy to **extend and reuse** styles by composing one styled component from another.
- **Standard CSS:** Uses **familiar CSS syntax**, leveraging the full power of CSS features (pseudo-selectors, media queries, keyframes).

### Cons 👎

- **Increased Bundle Size:** Requires including the **runtime library** in the final application bundle, which slightly increases the initial download size.
- **Performance Overhead (Runtime):** Styles are parsed and injected at runtime, which can introduce a **minor performance hit** compared to purely static compiled CSS.
- **Tooling/Setup:** Requires **initial setup** and may need editor/DevTools extensions for the best debugging experience.
- **Debugging:** The automatically generated class names in the DOM can make quick debugging in the browser's DevTools slightly less straightforward than traditional class names, though libraries often provide a way to include component names.
