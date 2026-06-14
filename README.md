# ShopLite - Mini E-Commerce Client Website

Welcome to **ShopLite** — a lightweight, client-side, multi-page shopping platform. This application interacts with the public **Fake Store API** to dynamically display collections, item specifications, and manage shopping carts directly on the browser.

Designed as part of the **FEF (Front-End Foundation) Long Assignment**.

---

## 1. Design & Layout Philosophy

- **Extreme Simplicity (Beginner-Friendly):** The website's interface is kept clean, elementary, and minimalist. There are no heavy animations, complex gradients, or glowing shadows.
- **Light Theme:** Features a pure light-mode color theme (`white` and `#f8f9fa` backgrounds) with dark grey text (`#333333`) and standard borders (`1px solid #ccc`).
- **Standard Typography:** Arial / Helvetica / sans-serif (basic system fonts).
- **Responsive Layout:** Pure, hand-written CSS layout rules utilizing CSS Grid and Flexbox to adjust configurations for mobile viewports cleanly.

---

## 2. Completed Feature Checklists

### Tier 1: Pass Tier (Foundation - 6.0 Points)
- [x] **All 4 Pages Integrated:** Clean navbar routing linking index page, detail pages, shopping cart, and registrations.
- [x] **Semantic HTML:** Constructed with `header`, `nav`, `main`, `section`, and `footer` elements.
- [x] **Dynamic Catalog Load:** Home page fetches the array list from Fake Store API and appends cards via JavaScript DOM nodes.
- [x] **Detail Viewer:** Product details page pulls the parameters ID from `window.location.search`, loads product details from the API, and renders them.
- [x] **Register Form Validator:** Custom client-side validation logic that validates formats (email formats, name length, phone numbers, selects) and blocks invalid forms.
- [x] **Standard Responsiveness:** Breakpoints styled to prevent container overflow.

### Tier 2: Good Tier (Intermediate - 2.0 Points)
- [x] **Full Shopping Cart:** LocalStorage-backed cart updates quantities, updates subtotals/totals, deletes items, and preserves items between pages.
- [x] **Interactive Filter:** Displays product categories dynamically, allowing single-click categories filtering.
- [x] **Spinner & Error Indicators:** Standard animations for loading states and warning banners for network failures.
- [x] **Clean Layout Rules:** Pure CSS with standard, hand-written media queries.

### Tier 3: Excellent Tier (Advanced - 2.0 Points)
- [x] **Event Delegation:** Click handlers bound to parent grid nodes (`productsGrid` and `cartItemsList`) to manage events efficiently.
- [x] **Combined Search + Filter + Sort:** Evaluates active search key, category tabs, and sort selections (price high-low/low-high, alphabetical names) simultaneously.
- [x] **Cart Count Badge:** Header icons display dynamic item count counts synced on load.
- [x] **Structured Codebase:** Extracted shared client methods inside `js/api.js` and clean page modular handlers.

---

## 3. Directory Structures

```
fef-shoplite-khoand119/
├── index.html              # Home page store template
├── product.html            # Individual product detail template
├── cart.html               # Cart manager list template
├── register.html           # Account creator form template
├── README.md               # User guide (This file)
├── .gitignore              # Dependency ignores
├── css/
│   └── style.css           # Simple CSS resets, variables and responsive grids
├── js/
│   ├── api.js              # Fake Store API request client
│   ├── cart.js             # Cart storage operations and rendering logic
│   ├── home.js             # Store catalog filtering and sorting logic
│   ├── product.js          # Detail page data binders
│   └── register.js         # Input validations checking scripts
└── plan/                   # Daily logs and plans folder
    ├── day1_plan.md
    ├── day2_plan.md
    ├── day3_plan.md
    ├── day4_plan.md
    ├── day5_plan.md
    ├── day6_plan.md
    └── day7_plan.md
```

---

## 4. How to Run Locally

Since the application runs entirely in the client-side browser, you do not need active compilers or complex servers:

1. Clone or download the repository folder: `fef-shoplite-khoand119/`.
2. Locate the main file: `index.html`.
3. Open `index.html` using any modern browser (Chrome, Firefox, Safari, Edge) by double-clicking it.
4. (Optional) Run a simple local server to avoid browser localStorage/CORS checks in older setups:
   - Python 3: Run `python -m http.server 8000` inside the folder and visit `http://localhost:8000`.
   - VS Code extension: Install **Live Server**, right-click `index.html` and click **Open with Live Server**.
