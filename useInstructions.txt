======================================
YWCA FOOD PANTRY INVENTORY WEBSITE
======================================

QUICK START
-----------
1. Make sure Node.js is installed on your computer.
2. Open a terminal and go to the API folder:
   cd API
3. Start the server by typing:
   node server.js
4. Open your web browser and go to:
   http://localhost:3000
5. You should see the Food Pantry Inventory homepage.


HOW TO USE THE WEBSITE
----------------------

HOME PAGE (index.html)
- Shows instructions on how to use the inventory system.
- Has links to "Update Inventory" and "Current Inventory."

UPDATE INVENTORY PAGE (updateInventory.html)
- Use this page to ADD or REMOVE items from the pantry.
- Fill in:
  * Date: When you are updating the inventory
  * Item Name: What item you're adding/removing (e.g., "Canned Beans", "Rice")
  * Quantity: How many items you're adding or removing
- Click the ADD button to increase stock of an item.
- Click the SUBTRACT button to decrease stock of an item.
- The page stays on the Update page so you can quickly add multiple items.
- To see your changes, go to "Current Inventory."

CURRENT INVENTORY PAGE (currentInventory.html)
- Shows a table with ALL items currently in stock.
- The table displays:
  * Date Added: When the item was last updated
  * Item Name: Name of the food item
  * Quantity: How many units are in stock
- Use this to check what food is available.
- Items with 0 quantity are automatically removed from the list.


MODIFYING THE WEBSITE (Non-Coder Guide)
----------------------------------------

CHANGING COLORS
- Open the file: style.css
- Look for sections that say "color:" or "background-color:"
- Common color codes:
  * Red: #ff0000
  * Blue: #0000ff
  * Green: #00aa00
  * Orange: #ff7a1a (current button color)
  * White: #ffffff
  * Black: #000000
  * Light gray: #f9f9f9
- Change any color code to a different one.
- Save the file and refresh the browser to see changes.

CHANGING TEXT
- Open the HTML files (index.html, updateInventory.html, currentInventory.html)
- Look for text between < > symbols. The plain text you want to change is usually easy to spot.
- Example: <button>Click Me</button> — change "Click Me" to whatever you want.
- Common places to change text:
  * <h1> tags are headings/titles
  * <p> tags are paragraphs
  * <a href="...">Link Text</a> — change "Link Text"
- Save and refresh the browser.

CHANGING BUTTON TEXT
- In updateInventory.html, find:
  <button id="addButton">Add</button>
  <button id="subtractButton">Subtract</button>
- Change "Add" or "Subtract" to anything you want (e.g., "Increase Stock", "Remove Stock").

CHANGING THE MAIN TITLE
- In index.html, find:
  <h1>YWCA Food Pantry Inventory</h1>
- Change to whatever you want (e.g., "Community Food Bank System").
- This title appears on the home page.

ADDING MORE INPUT FIELDS
- In updateInventory.html, before the buttons, you can add:
  <label for="fieldName">Label Text</label>
  <input type="text" id="fieldName" name="fieldName" placeholder="Help text here" required>
- Note: To make this work with the server, you'll need to modify the JavaScript file
  (updateInventory.js), which requires coding knowledge.

FONT SIZE AND SPACING
- In style.css, look for:
  * font-size: (controls text size)
  * padding: (controls space inside elements)
  * margin: (controls space around elements)
- Example: font-size: 1rem; — change 1 to a larger number (1.5rem) or smaller (0.8rem).


FILES EXPLAINED
---------------

index.html
- The home/landing page. Shows the title and instructions.

updateInventory.html
- The form page for adding/removing items.
- Contains the input fields and buttons.

currentInventory.html
- Displays the table of all items in stock.
- Gets data from the server automatically.

style.css
- Controls all colors, fonts, spacing, and layout.
- This is where you change the visual appearance.

inventory.json
- A data file that stores all the inventory information.
- It's automatically created and updated by the server.
- You can open it with a text editor to see the data (but don't edit it directly).

API/server.js
- The backend server that handles saving/loading inventory data.
- This is advanced — you don't need to modify it for basic changes.

updateInventory.js & currentInventory.js
- JavaScript files that handle the interactive behavior.
- These are advanced — they require coding knowledge to modify.


TROUBLESHOOTING
---------------

Q: The page won't load / I see "Cannot connect to server"
A: Make sure the server is running:
   1. Open a terminal
   2. Go to the API folder: cd API
   3. Run: node server.js
   4. You should see "Listening at http://localhost:3000/"

Q: Changes to colors/text don't show up
A: You need to refresh the browser:
   - Press Ctrl+R (Windows/Linux) or Cmd+R (Mac)
   - Or press Ctrl+Shift+R for a hard refresh (clears cached files)

Q: The table is empty
A: The inventory is empty because nothing has been added yet.
   1. Go to "Update Inventory"
   2. Add some items
   3. Go to "Current Inventory" to see them

Q: I can add items but they don't show up in Current Inventory
A: Try refreshing the Current Inventory page (Ctrl+R).
   If that doesn't work, the server may have stopped. Restart it (see above).


NEED MORE HELP?
---------------
If you need to add features or make complex changes, you'll likely need help from someone
who knows JavaScript and web development. Common advanced tasks:
- Adding new input fields that actually save to the database
- Sending emails or notifications when items run low
- Adding user login/authentication
- Searching or filtering items in the table
- Generating reports or charts

For questions or issues, refer to the code comments in JavaScript files or ask
a web developer for assistance.
