/**
 * ShopLite - Product Detail Page Controller
 * Reads URL search query and renders individual product specifications
 */

let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
    initDetailPage();
});

/**
 * Main detail page loader
 */
async function initDetailPage() {
    const loader = document.getElementById('productLoader');
    const content = document.getElementById('productDetailContent');
    const errorAlert = document.getElementById('productError');

    // Extract product ID from URL query string (e.g., product.html?id=5)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    if (isNaN(productId)) {
        // No valid ID found, display error layout
        loader.classList.add('d-none');
        errorAlert.classList.remove('d-none');
        return;
    }

    try {
        // Fetch specific product by ID
        currentProduct = await fetchProductById(productId);
        
        if (!currentProduct) {
            throw new Error('Product not found');
        }

        // Bind data fields
        populateProductDetails(currentProduct);

        // Show contents
        content.classList.remove('d-none');
        loader.classList.add('d-none');
    } catch (error) {
        console.error('Failed to load product detail view:', error);
        loader.classList.add('d-none');
        errorAlert.classList.remove('d-none');
    }

    // Set up quantity controllers
    const btnMinus = document.getElementById('qtyMinus');
    const btnPlus = document.getElementById('qtyPlus');
    const qtyText = document.getElementById('qtyVal');

    if (btnMinus && btnPlus && qtyText) {
        btnMinus.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                qtyText.textContent = currentQuantity;
            }
        });

        btnPlus.addEventListener('click', () => {
            currentQuantity++;
            qtyText.textContent = currentQuantity;
        });
    }

    // Add to cart click event
    const btnAdd = document.getElementById('btnAddToCart');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            if (currentProduct) {
                addToCart(currentProduct, currentQuantity);
                alert(`Added ${currentQuantity} of "${currentProduct.title}" to your shopping cart!`);
                currentQuantity = 1;
                qtyText.textContent = '1';
            }
        });
    }
}

/**
 * Map API response variables to DOM elements
 */
function populateProductDetails(product) {
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailImage').alt = product.title;
    document.getElementById('detailCategory').textContent = product.category;
    document.getElementById('detailTitle').textContent = product.title;
    document.getElementById('detailPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('detailDescription').textContent = product.description;
    
    // Breadcrumbs reference update
    document.getElementById('breadcrumbCurrent').textContent = product.title;

    // Optional ratings check (Fake Store API contains rating object)
    if (product.rating) {
        document.getElementById('detailRatingVal').textContent = product.rating.rate;
        document.getElementById('detailRatingCount').textContent = `(${product.rating.count} reviews)`;
    }
}
