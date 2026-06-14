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

### Tier 1: Pass Tier (Foundation - 6.0 / 6.0 Points)
- [x] **All 4 Pages Integrated** (1.0 pt): Clean navbar routing linking index page, detail pages, shopping cart, and registrations.
- [x] **Semantic HTML** (1.0 pt): Constructed with `header`, `nav`, `main`, `section`, and `footer` elements.
- [x] **Dynamic Catalog Load** (1.5 pt): Home page fetches the array list from Fake Store API and appends cards via JavaScript DOM nodes.
- [x] **Detail Viewer** (1.0 pt): Product details page pulls the parameters ID from `window.location.search`, loads product details from the API, and renders them.
- [x] **Register Form Validator** (1.0 pt): Custom client-side validation logic that validates formats (email formats, name length, phone numbers, selects) and blocks invalid forms.
- [x] **Standard Responsiveness** (0.5 pt): Breakpoints styled to prevent container overflow.

### Tier 2: Good Tier (Intermediate - 2.0 / 2.0 Points)
- [x] **Full Shopping Cart** (1.0 pt): LocalStorage-backed cart updates quantities, updates subtotals/totals, deletes items, and preserves items between pages.
- [x] **Search or Filter by Category** (0.5 pt): Displays product categories dynamically, allowing search and single-click categories filtering, updating the grid immediately.
- [x] **Spinner & Error Indicators** (0.3 pt): Standard animations for loading states and warning banners/error states for network failures.
- [x] **Clean Layout Rules** (0.2 pt): Pure CSS with standard, hand-written media queries and smooth responsiveness across all three breakpoints.

### Tier 3: Excellent Tier (Advanced - 2.0 / 2.0 Points)
- [x] **Event Delegation** (0.5 pt): Click handlers bound to parent grid nodes (`productsGrid` and `cartItemsList`) to manage events efficiently.
- [x] **Combined Search + Filter + Sort** (0.5 pt): Evaluates active search key, category tabs, and sort selections (price high-low/low-high, alphabetical names) simultaneously.
- [x] **Cart Count Badge** (0.3 pt): Header icons display dynamic item count counts synced across all pages on load.
- [x] **Pagination / "Load More"** (0.3 pt): Shows 6 items per page initially and appends 6 more on clicking the "Load More" button under the catalog grid.
- [x] **Good Experience (Toast & Debounce)** (0.2 pt): Includes custom, elegant CSS/JS toast notifications replacing browser alert dialogs, and a 300ms debounce on the catalog search box input.
- [x] **High-quality Source Code** (0.2 pt): Extracted reusable modules/functions inside `js/api.js`, standard naming conventions, and custom CSS files split logically per page.

**Total Project Score: 10.0 / 10.0 Points**

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
│   ├── share_style.css     # Shared parameters, header/navbar, footer, loaders, buttons
│   ├── index_style.css     # Index page catalog components
│   ├── product_style.css   # Product details specifications
│   ├── cart_style.css      # Shopping cart rows lists and totals
│   ├── register_style.css  # Register form controls and validations
│   └── style.css           # Deprecated / legacy core style entry
└── js/
    ├── api.js              # Fake Store API request client
    ├── cart.js             # Cart storage operations and rendering logic
    ├── home.js             # Store catalog filtering and sorting logic
    ├── product.js          # Detail page data binders
    └── register.js         # Input validations checking scripts
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
