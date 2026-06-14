/**
 * ShopLite - Home Page Controller
 * Handles loading catalog items, filtering, searching, and sorting
 */

let allProducts = [];      // Global copy of all products from API
let activeCategory = 'all'; // Current category filter
let searchQuery = '';      // Current search box query
let activeSort = 'default'; // Current sort option

document.addEventListener('DOMContentLoaded', () => {
    initHomePage();
});

/**
 * Initialize homepage components
 */
async function initHomePage() {
    const loader = document.getElementById('mainLoader');
    const grid = document.getElementById('productsGrid');
    const errorAlert = document.getElementById('errorMessage');

    // Show Loader, Hide Grid & Error
    loader.classList.remove('d-none');
    grid.innerHTML = '';
    errorAlert.classList.add('d-none');

    try {
        // Fetch all products from API (via shared api.js)
        allProducts = await fetchProducts();
        
        // Render category tabs dynamically if container is available
        await setupCategoryFilters();
        
        // Perform initial render
        filterAndSortProducts();
    } catch (error) {
        console.error('Home Page Initialization Error:', error);
        errorAlert.classList.remove('d-none');
    } finally {
        loader.classList.add('d-none');
    }

    // Set up search event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Basic debounce: wait slightly for user typing, or search on input
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndSortProducts();
        });
    }

    // Set up sort event listener
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            activeSort = e.target.value;
            filterAndSortProducts();
        });
    }

    // Event Delegation: Click listener on parent grid to handle "Add to Cart" clicks
    grid.addEventListener('click', (event) => {
        // Find if an add-to-cart button was clicked
        const btnAdd = event.target.closest('.btn-add-cart');
        if (!btnAdd) return;

        const productId = parseInt(btnAdd.dataset.id, 10);
        const product = allProducts.find(p => p.id === productId);
        
        if (product) {
            addToCart(product, 1);
            alert(`Added "${product.title}" to cart!`);
        }
    });
}

/**
 * Fetch and build category tabs dynamically
 */
async function setupCategoryFilters() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    try {
        const categories = await fetchCategories();
        
        // Re-generate tabs. Keep "All Products" as the default tab.
        let html = `<button class="category-tab active" data-category="all">All Products</button>`;
        categories.forEach(cat => {
            html += `<button class="category-tab" data-category="${cat}">${capitalizeString(cat)}</button>`;
        });
        container.innerHTML = html;

        // Add click listener on tabs container (using event delegation!)
        container.addEventListener('click', (event) => {
            const tab = event.target.closest('.category-tab');
            if (!tab) return;

            // Remove active status from other tabs
            const tabs = container.querySelectorAll('.category-tab');
            tabs.forEach(t => t.classList.remove('active'));
            
            // Activate selected tab
            tab.classList.add('active');
            activeCategory = tab.dataset.category;

            // Re-apply filter rules
            filterAndSortProducts();
        });
    } catch (error) {
        console.error('Failed to set up category filters, using default static tabs', error);
    }
}

/**
 * Filter and sort products simultaneously based on state variables
 */
function filterAndSortProducts() {
    let list = [...allProducts];

    // 1. Category Filter
    if (activeCategory !== 'all') {
        list = list.filter(p => p.category === activeCategory);
    }

    // 2. Search Filter
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        list = list.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
    }

    // 3. Sorting
    if (activeSort === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'title-asc') {
        list.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Render results
    renderProductGrid(list);
}

/**
 * Render items list array onto productsGrid DOM element
 */
function renderProductGrid(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No products found matching your search.</div>`;
        return;
    }

    grid.innerHTML = '';
    products.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="product-category">${item.category}</div>
            <h3 class="product-name">${item.title}</h3>
            <div class="product-meta">
                <span class="product-price">$${item.price.toFixed(2)}</span>
                <span class="product-rating">
                    <i class="bi bi-star-fill"></i> ${item.rating ? item.rating.rate : '0.0'}
                </span>
            </div>
            <div class="product-actions">
                <a href="product.html?id=${item.id}" class="btn-primary-custom"><i class="bi bi-eye"></i> View</a>
                <button class="btn-icon-link btn-add-cart" data-id="${item.id}" aria-label="Add to cart">
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Utility helper to capitalize category title strings
 */
function capitalizeString(str) {
    if (!str) return '';
    return str.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
}
