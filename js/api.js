/**
 * ShopLite - API Module (Beginner-Friendly Fetching)
 * Handles communication with Fake Store API
 */

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch helper to avoid repeating boilerplate try/catch
 */
async function apiRequest(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error on endpoint ${endpoint}:`, error);
        throw error; // Let the caller page handle showing the error UI
    }
}

/**
 * Get all products
 */
async function fetchProducts() {
    return await apiRequest('/products');
}

/**
 * Get a single product by ID
 */
async function fetchProductById(id) {
    return await apiRequest(`/products/${id}`);
}

/**
 * Get the list of all categories
 */
async function fetchCategories() {
    return await apiRequest('/products/categories');
}

/**
 * Get products inside a specific category
 */
async function fetchProductsByCategory(categoryName) {
    // URL encode in case category name contains spaces
    return await apiRequest(`/products/category/${encodeURIComponent(categoryName)}`);
}
