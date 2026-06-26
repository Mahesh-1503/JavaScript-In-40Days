Step 1: Understand the overall structure

1. The page has three main parts

   - Tabs container with headers and contents
   - Log box to show tab change messages
   - Script that wires everything using events

2. The tabs container has

   - A row of buttons inside .tab-headers
   - Three content panels inside .tab-contents
   - Matching data attributes:

     - Button data tab "1" matches content data tab "1"
     - Same for "2" and "3"

3. CSS handles

   - Layout and border of tabs
   - Which tab and content look active
   - .active class controls visibility and highlight

Step 2: Grabbing important DOM elements

In the script, the first lines select elements:

1. tabsRoot = document.getElementById("tabs")

   - Root element for the whole tab system

2. tabHeaders = tabsRoot.querySelector(".tab-headers")

   - Parent of all tab header buttons

3. tabButtons = tabHeaders.querySelectorAll(".tab")

   - NodeList of all tab buttons

4. tabContents = tabsRoot.querySelectorAll(".content")

   - NodeList of all content panels

5. log = document.getElementById("log")

   - Box where messages are printed

Think of this step as collecting all players before starting a game

Step 3: Helper function addLog

Function addLog(message):

1. Creates a new p element
2. Sets p.textContent to the message
3. Appends p inside the log div
4. Scrolls log to the bottom so the latest message stays visible

This function keeps logging logic in one place
Any part of the code that wants to show a message calls addLog

Step 4: Core function switchToTab

switchToTab(tabNumber) is the heart of the system

Its job

- Update active button
- Update active content
- Fire a custom event with tab information

Flow inside switchToTab:

1. Update tab button classes

   - Loop over every button in tabButtons
   - For each button

     - Check if button.dataset.tab equals tabNumber as string
     - If match, active is true
     - Call btn.classList.toggle("active", isActive)

   - Result

     - Only the button with matching data tab gets class active

2. Update content panel classes

   - Loop over every content in tabContents
   - For each content

     - Check if content.dataset.tab equals tabNumber
     - Toggle its active class in the same way

   - Result

     - Only the matching content panel becomes visible

3. Find active button text

   - activeButton = tabsRoot.querySelector(".tab-headers .tab.active")
   - tabName = activeButton.textContent
   - This gives human readable name like "Home" or "About"

4. Create and dispatch custom event

   - Create a new CustomEvent("tab-changed", with detail object)

     - detail has tabNumber and tabName

   - Call tabsRoot.dispatchEvent(tabChangedEvent)

Effect

- UI updates
- Other parts of code get notified through custom event

Step 5: Handling tab header clicks with event delegation

Code
tabHeaders.addEventListener("click", function (event) { ... })

Flow:

1. User clicks somewhere in the header area
2. Browser fires click event on the actual target button
3. Event bubbles up to tabHeaders
4. Inside handler

   - Check if event.target has class "tab"
   - If not, return
   - If yes, take event.target.dataset.tab as tabNumber
   - Call switchToTab(tabNumber)

This is event delegation
Only one listener on the parent
It works for all buttons inside it

Real life picture
You talk to the class monitor
Monitor checks which student raised hand and responds accordingly

Step 6: Listening for the custom tab changed event

Code
tabsRoot.addEventListener("tab-changed", function (event) { ... })

Flow:

1. switchToTab calls tabsRoot.dispatchEvent(tabChangedEvent)
2. This triggers the listener on tabsRoot

Inside the listener:

1. event.detail.tabName gives name like "Home"
2. event.detail.tabNumber gives 1, 2, or 3
3. addLog prints a message

   - Example
     Tab changed to Home (Tab 1)

This makes the tab behavior observable and reusable
Any other code block can listen to tab-changed and react

Step 7: Keyboard shortcuts for tab switching

Code
document.addEventListener("keydown", function (e) { ... })

Flow:

1. User presses any key
2. Browser generates keydown on document
3. Handler checks e.key

   - If "1", call switchToTab(1)
   - If "2", call switchToTab(2)
   - If "3", call switchToTab(3)

Effect

- Same central function switchToTab updates UI
- Keyboard interaction and mouse clicks share the same logic

Real life comparison
A student can open a classroom door using a key or by someone pressing the remote
Both trigger same door motor

Step 8: Handling inner button with stopPropagation

Inside the content of the Home tab there is a button with class inner-button

Code
tabsRoot.addEventListener("click", function (event) { ... })

Flow:

1. Any click inside tabsRoot bubbles to this listener
2. Handler checks if event.target has class inner-button

   - If not, returns
   - If yes, this is the special inner button

Inside handler:

1. event.stopPropagation()

   - Stops the click from bubbling further up
   - Prevents any outer click listener from treating it as a tab related click

2. addLog prints
   "Inner button clicked. Tab header click not triggered."

3. Shows an alert
   "Inner button in content clicked."

Why this matters

- You may later add more click listeners on parents
- stopPropagation lets you control which clicks trigger which behavior
- It separates inner actions from tab switching logic

Step 9: How everything works together in real time

Scenario 1
User clicks "About" tab

1. Click lands on About button
2. Event bubbles to tabHeaders listener
3. Listener sees target class tab
4. Reads data tab, which is "2"
5. Calls switchToTab(2)
6. switchToTab

   - Activates About button
   - Shows About content
   - Creates tab-changed custom event with name "About"
   - Dispatches it on tabsRoot

7. tabsRoot listener receives tab-changed

   - Logs message about the change in the log box

Scenario 2
User presses key 3

1. keydown fires on document with e.key equal "3"
2. Keyboard handler calls switchToTab(3)
3. Same sequence as above happens for Contact tab

   - Contact button active
   - Contact content visible
   - tab-changed event raised
   - Log updated

Scenario 3
User clicks inner button in Home tab

1. Click lands on inner button
2. Event bubbles to tabsRoot click listener for inner-button
3. Listener identifies inner-button by class
4. Calls stopPropagation so the click does not go to any other parent listener
5. Logs message and shows alert
6. Tab selection does not change

This shows control of event flow
You decide which handlers run and which ones stop

Step 10: Mental model for this project

1. switchToTab is the single source of truth for which tab is active

2. All user actions that should change tabs call switchToTab

   - Mouse click on headers
   - Keyboard shortcuts

3. Custom event tab-changed broadcasts state changes outward

   - Other parts of the app observe tab changes
   - They do not care how tabs got changed

4. Event delegation

   - One header listener handles all tab buttons
   - One root listener can handle special inner actions

5. Class management with classList

   - .active class decides visual state
   - Code only toggles classes based on data attributes

Once you understand this flow, you can

- Add more tabs
- Add more keyboard shortcuts
- Add more listeners for tab-changed
- Embed forms or widgets inside each tab while still keeping event flow under control
