// This file handles the shopping cart functionality

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalElem = document.getElementById("total");

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `Product ${item.id}: $${item.price}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    totalElem.textContent = total;
}

function addToCart(productId) {
    // Simulating product data
    const productData = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 }
    ];

    const product = productData.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

document.query
// Handle adding to cart
function addToCart(productId) {
    const productData = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 }
    ];

    const product = productData.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

// Update the cart page content
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalElem = document.getElementById("total");

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name}: $${item.price}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    totalElem.textContent = total;
}

// Add event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.product);
        addToCart(productId);
    });
});

// Initial cart update
updateCart();