# Module 05: Dynamic Data Flow with Props (Amazon Product Grid)

React applications rely on a clean, structured mechanism for passing data from parent components to child components. This system is called **Props** (short for properties). Understanding how props enable data reuse, enforce read-only immutability, and drive unidirectional data flow is critical for building scalable frontend applications.

---

## 1. Mental Model (The Amazon Product Card)

Think of an **Amazon Product Grid**:
- The screen shows hundreds of different items: a $120 Kindle, a $25 water bottle, a $2,000 laptop.
- Amazon does not write a separate React component for every single product in their store. That would result in millions of files.
- Instead, they design a single reusable template: the `ProductCard` component.
- The `ProductCard` defines the layout: where the image goes, the rating stars, the price, and the "Add to Cart" button.
- When rendering the grid, the parent component feeds the specific product details into each template card. These custom inputs are **Props**. Props allow the exact same component layout to display completely different contents.

---

## 2. Visual Thinking (Unidirectional Data Flow & Props)

Data in React flows in one direction: **Top-Down (Unidirectional)**. Parents pass parameters to children. Children cannot directly alter the props they receive.

```
       [ ProductGrid ] (Parent Component: Holds Database State)
              │
              ├─────────── Props: { name: "Kindle", price: 99.99 } ───────────► [ ProductCard ]
              ├─────────── Props: { name: "Echo Dot", price: 49.99 } ─────────► [ ProductCard ]
              └─────────── Props: { name: "Fire TV", price: 39.99 } ──────────► [ ProductCard ]
              
  [ IMPORTANT RULE: IMMUTABILITY ]
  Parent State (Source of Truth) ──► Passes Props ──► Child (Displays Read-Only Data)
  ❌ Child component cannot modify the data.
  ✅ Child component notifies parent via callbacks if modifications are needed (e.g., clicking "Add to Cart").
```

---

## 3. Beginner Explanation

- **Props:** Configuration parameters passed to a component by its parent, similar to function arguments.
- **Unidirectional Data Flow:** The design pattern where data is passed down from parent components to child components. It makes bugs easier to trace.
- **Read-Only (Immutability):** A core rule in React that a component must never modify the props it receives.
- **Children Prop (`props.children`):** A special built-in prop that allows you to pass JSX layout fragments directly between the opening and closing tags of a custom component.

---

## 4. Deep Explanation (React Prop Internals)

### 1. The Immutability Rule
When React updates the UI, it does shallow reference equality checks on props. If a child component mutated its own props:
```javascript
// ILLEGAL: This will throw errors or cause React's diffing engine to fail!
props.price = 10.99;
```
React would not detect changes because the object reference remains the same, leading to broken UI updates. Components must treat their props as read-only snapshots.

### 2. Destructuring Props
For clean code, we destructure props directly inside the function parameters rather than parsing the entire `props` object:
```javascript
// Clean & Explicit
export function ProductCard({ title, price }) {
  return <div>{title}: ${price}</div>;
}
```

### 3. Prop Validation and Types
In JavaScript, there is no compile-time type checking. To prevent components from crashing due to unexpected data types, production apps use **PropTypes** or **TypeScript**:
- Defines expected prop types (e.g. `price` must be a `number`, `title` must be a `string`).
- Sets whether a prop is mandatory.
- Emits console warnings if incorrect structures are detected in development.

---

## 5. Real Production Examples (Amazon Components)

### 1. Amazon Star Rating Component (Default & Math Props)
```jsx
// StarRating.jsx
import PropTypes from 'prop-types';

export function StarRating({ rating = 0, reviewCount = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <div className="star-rating">
      {stars.map((filled, idx) => (
        <span key={idx} className={filled ? 'star-filled' : 'star-empty'}>
          {filled ? '★' : '☆'}
        </span>
      ))}
      <span className="review-count">({reviewCount.toLocaleString()})</span>
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  reviewCount: PropTypes.number
};
```

### 2. Action Callback Props (Add to Cart Action)
Passing a function as a prop to handle button actions in the parent.
```jsx
// ActionButton.jsx
export function ActionButton({ label, onClickAction, isOutOfStock }) {
  return (
    <button 
      className={`action-btn ${isOutOfStock ? 'disabled' : ''}`}
      onClick={onClickAction}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? "Temporarily Out of Stock" : label}
    </button>
  );
}
```

### 3. Promotional Layout Badge (Children Composition)
Using `children` to inject dynamic HTML tags or sub-badges into a card.
```jsx
// PromoBadge.jsx
export function PromoBadge({ children, bannerColor }) {
  return (
    <div 
      className="promo-badge" 
      style={{ backgroundColor: bannerColor || '#ff9900' }}
    >
      {children}
    </div>
  );
}
```

### 4. Amazon Product Price Formatter
```jsx
// PriceTag.jsx
export function PriceTag({ amount, currencySymbol = '$' }) {
  // Split price into whole and fractional parts for styling (Amazon style)
  const wholePart = Math.floor(amount);
  const fractionalPart = (amount % 1).toFixed(2).substring(2);

  return (
    <span className="price-tag">
      <span className="currency">{currencySymbol}</span>
      <span className="whole">{wholePart}</span>
      <span className="fractional">{fractionalPart}</span>
    </span>
  );
}
```

### 5. Amazon Product Grid Wrapper (Unidirectional Mapping)
```jsx
// ProductGrid.jsx
import { ProductCard } from './ProductCard';

export function ProductGrid({ items, onAddToCart }) {
  return (
    <main className="amazon-grid">
      {items.map((product) => (
        <ProductCard 
          key={product.asin}
          id={product.asin}
          title={product.title}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          image={product.imageUrl}
          onAdd={() => onAddToCart(product.asin)}
        />
      ))}
    </main>
  );
}
```

---

## 6. Progressive Coding (Amazon Product Card Props)

### Level 1: Beginner (Raw Props Object - No Destructuring, No Safety)
```jsx
// BAD: Accessing props.x repeatedly makes the code long, cluttered, and hard to read.
export function BeginnerCard(props) {
  return (
    <div className="card">
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.price}</p>
    </div>
  );
}
```

### Level 2: Better (Destructuring Props & Providing Default Values)
```jsx
// BETTER: Destructured parameter signatures and fallback image/price configurations.
export function BetterCard({ title, price = 0.00, image }) {
  const fallbackImg = "https://images.amazon.com/fallback.jpg";

  return (
    <div className="card">
      <img src={image || fallbackImg} alt={title} />
      <h3>{title}</h3>
      <p>${price.toFixed(2)}</p>
    </div>
  );
}
```

### Level 3: Production (Prop-Types Validation & Interactive Callbacks)
```jsx
// PRODUCTION: Safe type validations, callback triggers, clean and structured layout.
import React from 'react';
import PropTypes from 'prop-types';

export function ProductionProductCard({ id, title, price, isPrime, onAdd }) {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <div className="price-row">
        <span>${price.toFixed(2)}</span>
        {isPrime && <span className="prime-badge">⚡ Prime</span>}
      </div>
      <button onClick={() => onAdd(id)}>Add to Cart</button>
    </div>
  );
}

ProductionProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isPrime: PropTypes.bool,
  onAdd: PropTypes.func.isRequired
};
```

### Level 4: Enterprise (High-Aesthetic, Dynamic Grid Item Container)
```jsx
// ENTERPRISE: A production-grade card container with accessibility details, 
// complex children rendering, click analytics tracker pipelines, and layout variants.
import React from 'react';
import PropTypes from 'prop-types';
import { StarRating } from './StarRating';
import { PriceTag } from './PriceTag';

export function EnterpriseProductCard({ 
  asin, 
  title, 
  price, 
  rating, 
  reviews, 
  imageUrl, 
  badgeContent, 
  onActionTrigger, 
  isBestSeller = false 
}) {
  const handleCardClick = () => {
    // Send telemetry / analytics data for impressions
    console.log(`Analytics logged: Card clicked ${asin}`);
  };

  return (
    <article 
      className={`amazon-product-card ${isBestSeller ? 'best-seller-highlight' : ''}`}
      onClick={handleCardClick}
      aria-labelledby={`title-${asin}`}
    >
      {isBestSeller && <div className="bestseller-ribbon">Best Seller</div>}
      
      {badgeContent && (
        <div className="custom-card-badge">{badgeContent}</div>
      )}
      
      <div className="product-image-container">
        <img 
          src={imageUrl || 'https://images.amazon.com/fallback.jpg'} 
          alt={`Product photo of ${title}`}
          loading="lazy" 
        />
      </div>

      <div className="product-card-details">
        <h4 id={`title-${asin}`} className="product-card-title">
          {title}
        </h4>

        <div className="ratings-row">
          <StarRating rating={rating} reviewCount={reviews} />
        </div>

        <div className="price-row">
          <PriceTag amount={price} />
        </div>

        <div className="actions-row">
          <button 
            className="amazon-primary-btn"
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering container click telemetry twice
              onActionTrigger(asin);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

EnterpriseProductCard.propTypes = {
  asin: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  imageUrl: PropTypes.string,
  badgeContent: PropTypes.node,
  onActionTrigger: PropTypes.func.isRequired,
  isBestSeller: PropTypes.bool
};
```

---

## 7. Common Mistakes

1. **Attempting to mutate props directly inside a component:**
   ```jsx
   // BUG: Props are read-only! Mutating them breaks state sync.
   function Card({ item }) {
     item.price = item.price * 0.9; // WRONG!
     return <p>Discounted: {item.price}</p>;
   }
   ```
2. **Forgetting to destructure props:**
   Writing `function Component(title)` instead of `function Component({ title })`. The first parameter is always the entire `props` object, not individual fields.
3. **Passing strings instead of numbers to numeric props:**
   `<ProductCard price="99" />` passes a string. Dynamic calculations will end up concatenating values (e.g. `"99" + 1 === "991"`). Use `{}` expressions: `<ProductCard price={99} />`.

---

## 8. Best Practices

1. **Explicit Defaults:** Always specify default values for non-required props to prevent runtime errors (e.g. `rating = 0`).
2. **Use Children for Layout Components:** Use the `children` prop to create highly flexible card wrappers, modals, or modal borders.
3. **Document with PropTypes or TypeScript:** Make your code self-documenting. If a developer uses your component, the IDE will tell them exactly what variables to pass.

---

## 9. Interview Preparation

### Q1: What is unidirectional data flow, and why does React use it?
**Answer:** Unidirectional data flow is a architecture where data moves in a single, predictable direction: from parent components to child components via props. React uses it to make applications easier to debug. Because data cannot flow upwards, it is easy to find where a state bug originated—you only need to inspect the parent components that host the state.

### Q2: What is the difference between Props and State in React?
**Answer:**
- **Props** are configuration parameters passed down from a parent component. They are read-only (immutable) to the component receiving them.
- **State** is an internal, private data store managed entirely within the component itself. The component can modify its own state using updater functions.

### Q3: What is the role of `props.children`?
**Answer:** `props.children` is a special, built-in prop present in every React component. It contains whatever JSX tags or content are placed between the opening and closing tags of the component. It allows developers to implement composition (wrapping content inside layouts, wrappers, or modals).

---

## 10. Homework

1. **Build an Amazon Rating Indicator:** Create a component that receives a `rating` float prop. Draw stars dynamically, with default fallbacks for invalid values.
2. **Callback Action Test:** Construct a parent element and 3 separate `ProductCard` components. Write an addition callback in the parent that tracks and alerts which item ASIN was clicked.
3. **Flexible Promotions Badge Wrapper:** Implement a badge container using `props.children`. Pass custom elements (discount percentages, promotional icons) inside the badge.
4. **Prop Validator Schema Audit:** Take a React component without type checks, write a comprehensive `PropTypes` schema validation dictionary, and verify console warnings by passing incorrect variables.
5. **Multi-Currency Pricing Grid:** Build a layout that takes a price and a currency prop. Pass currency formatting patterns down to children, rendering localized outputs.
