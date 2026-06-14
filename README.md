# ShopLite - Mini E-Commerce Client Website

> **Live Demo:** [https://meocute5104.github.io/fef-shoplite-khoand119/](https://meocute5104.github.io/fef-shoplite-khoand119/)

Welcome to **ShopLite** — a lightweight, client-side, multi-page shopping platform. This application interacts with the public **Fake Store API** to dynamically display collections, item specifications, and manage shopping carts directly on the browser.

Designed as part of the **FEF (Front-End Foundation) Long Assignment**.

---

## 1. Design & Layout Philosophy

- **Extreme Simplicity (Beginner-Friendly):** The website's interface is kept clean, elementary, and minimalist. There are no heavy animations, complex gradients, or glowing shadows.
- **Light Theme:** Features a pure light-mode color theme (`white` and `#f8f9fa` backgrounds) with dark grey text (`#333333`) and standard borders (`1px solid #ccc`).
- **Standard Typography:** Arial / Helvetica / sans-serif (basic system fonts).
- **Responsive Layout:** Pure, hand-written CSS layout rules utilizing CSS Grid and Flexbox to adjust configurations for mobile viewports cleanly.

---

## 2. Directory Structures

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

## 3. How to Run Locally

Since the application runs entirely in the client-side browser, you do not need active compilers or complex servers:

1. Clone or download the repository folder: `fef-shoplite-khoand119/`.
2. Locate the main file: `index.html`.
3. Open `index.html` using any modern browser (Chrome, Firefox, Safari, Edge) by double-clicking it.
4. (Optional) Run a simple local server to avoid browser localStorage/CORS checks in older setups:
   - Python 3: Run `python -m http.server 8000` inside the folder and visit `http://localhost:8000`.
   - VS Code extension: Install **Live Server**, right-click `index.html` and click **Open with Live Server**.
