/**
 * ShopLite - Cart Module (Beginner-Friendly State & LocalStorage)
 * Manages adding, removing, updating items in the cart
 */

const CART_STORAGE_KEY = 'shoplite_cart';

// -------------------------------------------------------------------------
// Shared Cart Functions (Reusable across all pages)
// -------------------------------------------------------------------------

/**
 * Get current cart array from localStorage
 */
function getCart() {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Save cart array to localStorage and update navbar count
 */
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

/**
 * Add a product to the cart or increment quantity if it exists
 */
function addToCart(product, quantity = 1) {
    const cart = getCart();
    // Find if item is already in cart
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart(cart);
}

/**
 * Update the navbar cart icon badge count
 */
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const cart = getCart();
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalCount;
    }
}

// Automatically sync the badge count when any page script loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    // Check if we are currently on the Cart Page (cart.html)
    if (document.getElementById('cartItemsList')) {
        initCartPage();
    }
});


// -------------------------------------------------------------------------
// Cart Page Initialization and DOM Rendering (Only for cart.html)
// -------------------------------------------------------------------------

function initCartPage() {
    renderCart();

    // Event Delegation: One event listener on parent container
    const itemsList = document.getElementById('cartItemsList');
    itemsList.addEventListener('click', (event) => {
        // Find if user clicked a button or icon inside button
        const button = event.target.closest('button');
        if (!button) return;

        const productId = parseInt(button.dataset.id, 10);
        if (isNaN(productId)) return;

        if (button.classList.contains('qty-minus')) {
            updateItemQuantity(productId, -1);
        } else if (button.classList.contains('qty-plus')) {
            updateItemQuantity(productId, 1);
        } else if (button.classList.contains('btn-remove-item')) {
            removeItemFromCart(productId);
        }
    });

    // Clear Cart button handler
    const btnClear = document.getElementById('btnClearCart');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your shopping cart?')) {
                saveCart([]);
                renderCart();
            }
        });
    }

    // Checkout button handler
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            alert('Thank you for your order! Checkout simulation successful.');
            saveCart([]);
            renderCart();
        });
    }
}

/**
 * Render the cart lists to the DOM and calculate totals
 */
function renderCart() {
    const cart = getCart();
    const emptyState = document.getElementById('cartEmptyState');
    const splitContent = document.getElementById('cartSplitContent');
    const itemsContainer = document.getElementById('cartItemsList');

    if (cart.length === 0) {
        // Show empty cart view
        emptyState.classList.remove('d-none');
        splitContent.classList.add('d-none');
        return;
    }

    // Show cart items view
    emptyState.classList.add('d-none');
    splitContent.classList.remove('d-none');

    // Generate html content
    itemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4><a href="product.html?id=${item.id}">${item.title}</a></h4>
                <p>Unit Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">$${itemSubtotal.toFixed(2)}</div>
            <button class="cart-item-remove btn-remove-item" data-id="${item.id}" aria-label="Remove item">
                <i class="bi bi-trash"></i>
            </button>
        `;
        itemsContainer.appendChild(row);
    });

    // Calculations
    const taxRate = 0.1; // 10% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Write calculations to labels
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

/**
 * Increment or decrement item quantities and re-render
 */
function updateItemQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(x => x.id === productId);
    if (!item) return;

    item.quantity += delta;
    
    // Remove item if quantity falls below 1
    if (item.quantity < 1) {
        removeItemFromCart(productId);
        return;
    }

    saveCart(cart);
    renderCart();
}

/**
 * Delete item completely from cart
 */
function removeItemFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}
