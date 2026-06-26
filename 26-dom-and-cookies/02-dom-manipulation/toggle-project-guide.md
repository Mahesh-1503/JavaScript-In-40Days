# Toggle project — step-by-step student guide

Clear steps. Short sentences. Practical notes on choices. Follow them to build a robust toggle.

---

## Goal

- Show or hide a paragraph when the button is clicked.
- Keep code simple, accessible, and maintainable.

---

## Files you need

- `index.html` — page markup.
- `ui.css` — styles.
- `logic.js` — JavaScript behavior.

You already have these. Below are improved versions and instructions.

---

## 1. HTML: structure and accessibility

Why change things

- Avoid inline handlers like `onclick`. They mix markup and logic.
- Use a proper script loading strategy so DOM is ready.
- Add `aria` to communicate state to assistive tech.

Improved `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Toggle</title>
    <link rel="stylesheet" href="./ui.css" />
    <script defer src="./logic.js"></script>
  </head>
  <body>
    <h2>Toggle Paragraph Example</h2>

    <button
      id="toggleBtn"
      class="action"
      aria-expanded="true"
      aria-controls="myParagraph"
    >
      Show/Hide Paragraph
    </button>

    <p class="info" id="myParagraph">
      This is a paragraph that can be shown or hidden by clicking the button
      above.
    </p>
  </body>
</html>
```

Key points

- `defer` ensures `logic.js` runs after HTML loads.
- `aria-expanded` shows current state to screen readers.
- `aria-controls` links button to the paragraph.

---

## 2. CSS: styling and smooth hide

Why change things

- Use a class to control visibility.
- Add a transition for smooth effect.

Improved `ui.css`

```css
.info {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  transition: opacity 200ms ease, visibility 200ms ease;
  opacity: 1;
  visibility: visible;
  max-height: 1000px;
  overflow: hidden;
}

.action {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.hidden {
  display: none;
  /* alternative fade:
  opacity: 0;
  visibility: hidden;
  max-height: 0;
  */
}
```

Notes

- `display: none` removes element from layout instantly. Good and simple.
- For animation use `opacity` and `visibility` instead of `display`.

---

## 3. JavaScript: behavior and best practice

Why change things

- Use `addEventListener` instead of inline `onclick`.
- Use `classList.toggle` to change classes.
- Update `aria-expanded` so assistive tech knows the state.
- Avoid direct style changes unless needed.

Improved `logic.js`

```javascript
console.log("Project: Toggle");

function toggleInfo() {
  console.log("Toggling");
  const para = document.getElementById("myParagraph");
  const btn = document.getElementById("toggleBtn");

  // toggle class
  const isHidden = para.classList.toggle("hidden");

  // update aria
  btn.setAttribute("aria-expanded", String(!isHidden));
}

// attach handler using DOM-ready script (defer used in HTML)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleBtn");
  btn.addEventListener("click", toggleInfo);

  // optional: support keyboard toggle via Enter/Space is automatic for button
});
```

Key points

- `classList.toggle('hidden')` returns boolean. Use it to sync aria.
- `DOMContentLoaded` wrapper is safe even with `defer` but okay to keep.

---

## 4. Why use this approach

- Separation: HTML for structure, CSS for style, JS for behavior.
- Accessibility: `aria-expanded` informs assistive tech.
- Maintainability: event listeners are easier to refactor.
- Readability: `classList` is explicit.

---

## 5. Why not use these alternatives

- Inline `onclick`

  - Problem: mixes markup with logic. Harder to manage.
  - Use: only for tiny throwaway demos.

- `element.style.display = 'none'` in JS

  - Problem: inline style overrides CSS. Hard to manage styles.
  - Use: quick hacks or when you must override computed style.

- `innerHTML` or `outerHTML` to hide content

  - Problem: replaces DOM. Risk of removing event listeners. Security issues for user content.
  - Use: only for safe, intentional markup replacement.

- `visibility: hidden` only

  - Problem: element keeps its layout space. Visual gap remains. Use when layout must stay.

- Heavy libraries (jQuery, frameworks) for this task

  - Problem: extra weight and complexity.
  - Use: only if the project already uses them or you need their ecosystem.

---

## 6. Accessibility checklist

- Use `<button>` not `<div>` for clickable elements.
- Keep default keyboard behavior for buttons.
- Update `aria-expanded` after each toggle.
- Use `aria-controls` to link button to the element.
- Ensure visible focus styles for keyboard users.

---

## 7. Debugging tips

- If button does nothing, open console. Look for errors.
- Confirm `logic.js` is loaded. Check Network tab or console logs.
- Confirm `document.getElementById('myParagraph')` returns an element. Log it.
- If class toggle works but no visual change, check CSS selector names.
- Remember `display: none` bypasses transitions.

---

## 8. Small improvements and extensions (student tasks)

- Add a small icon that changes from plus to minus on toggle.
- Animate show/hide using opacity and max-height.
- Persist visibility in `localStorage` so state survives reload.
- Add multiple paragraphs and delegate toggle with `data-target` attributes.
- Announce state with a live region for screen readers.

Example: persist state

```javascript
// on toggle
localStorage.setItem("para-hidden", String(isHidden));

// on load
const saved = localStorage.getItem("para-hidden") === "true";
if (saved) document.getElementById("myParagraph").classList.add("hidden");
```

---

## 9. Minimal tests to run

- Click button. Paragraph hides and shows.
- Use keyboard Tab then Enter or Space. It toggles.
- Inspect button `aria-expanded` value. It reflects visible state.
- Reload page. If you added persistence, state restores.

---

## 10. Final recommended file set

- `index.html` with `defer` and `aria` attributes.
- `ui.css` with `.hidden` as the switch.
- `logic.js` with `addEventListener`, `classList.toggle`, aria sync.
