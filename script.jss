let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  
  cartItems.innerHTML = "";
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div>
        ${item.name} - ₦${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Call on page load
displayCart();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";