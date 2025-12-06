```javascript
import React, { useState } from "react";

function UserInputTracker() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <p>You typed: {inputText}</p>
    </div>
  );
}

export default UserInputTracker;
```

```javascript
import React, { useState } from "react";

function UserInputTracker() {
  const [inputText, setInputText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {inputText}</p>
    </div>
  );
}

export default UserInputTracker;
```

```javascript
import React, { useState } from "react";

function UserInputTracker() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    // 1. Get the raw value the user typed
    const rawValue = event.target.value;

    // 2. Convert it to Uppercase immediately
    const upperCaseValue = rawValue.toUpperCase();

    // 3. Update the state with the modified value
    setInputText(upperCaseValue);
  };

  return (
    <div>
      <h3>Uppercase Only Input</h3>
      <input
        type="text"
        value={inputText} // The input is forced to display what is in state
        onChange={handleInputChange}
        placeholder="Type lowercase here..."
      />
      <p>Stored in State: {inputText}</p>
    </div>
  );
}

export default UserInputTracker;
```

```javascript
import React, { useState } from "react";

function UserInputTracker() {
  const [inputText, setInputText] = useState("");

  return (
    <div>
      <h3>Uppercase Only Input</h3>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value.toUpperCase())}
        placeholder="Type lowercase here..."
      />
      <p>Stored in State: {inputText}</p>
    </div>
  );
}

export default UserInputTracker;
```

### CONDITIONAL RENDERING CODE

```javascript
import { useState } from "react";

function Counter() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>Current Score: {score}</h1>

      {/* Conditional text */}
      <p>{score > 0 ? "You have started scoring" : "No score yet"}</p>

      <button onClick={() => setScore(score + 1)}>Add 1</button>
      <button onClick={() => setScore(0)}>Reset</button>
    </div>
  );
}
```

```javascript
// Show Reset button only if score > 0
{
  score > 0 ? <button onClick={() => setScore(0)}>Reset</button> : null;
}
```

```javascript
//Change button label based on score
<button onClick={() => setScore(score + 1)}>
  {score > 10 ? "High Score" : "Add 1"}
</button>
```
