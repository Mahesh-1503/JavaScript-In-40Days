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
