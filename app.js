import { db, collection, getDocs } from "./firebase.js";

const productContainer = document.getElementById("products");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  productContainer.innerHTML = "";

  querySnapshot.forEach(doc => {
    const p = doc.data();

    productContainer.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>₦${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>
    `;
  });
}

window.addToCart = function(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
import { usePaystackPayment } from "react-paystack";
import { auth, db, collection, addDoc } from "./firebase.js";

// Prepare cart total
const totalAmount = cart.reduce((sum, item) => sum + item.price, 0) * 100; // in kobo

const config = {
  reference: new Date().getTime().toString(),
  email: auth.currentUser?.email,
  amount: totalAmount,
  publicKey: "YOUR_PAYSTACK_PUBLIC_KEY",
};

const onSuccess = async () => {
  // Save each product order in Firestore
  for (let item of cart) {
    await addDoc(collection(db, "orders"), {
      email: auth.currentUser.email,
      product: item,
      status: "Processing",
      createdAt: new Date()
    });
  }
  alert("Payment successful! Orders saved.");
  localStorage.removeItem("cart");
  location.href = "index.html";
};

const onClose = () => {
  alert("Payment was not completed.");
};

const initializePayment = usePaystackPayment(config);

// Call inside checkout
function checkout() {
  initializePayment(onSuccess, onClose);
}

loadProducts();

import { db, collection, getDocs } from "./firebase.js";

const productContainer = document.getElementById("products");
const featuredContainer = document.getElementById("featuredDeals");
let allProducts = [];

async function loadProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  allProducts = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data() }));
  renderProducts(allProducts);
  renderFeatured(allProducts.filter(p=>p.featured));
}

function renderProducts(products){
  productContainer.innerHTML = "";
  products.forEach(p=>{
    productContainer.innerHTML += `
      <div class="product">
        ${p.flash?'<div class="flash-deal">FLASH</div>':''}
        <img src="${p.image}" />
        <h4>${p.name}</h4>
        <p>₦${p.price}</p>
        <p class="review">${p.reviews?`${p.reviews} ⭐`:"No reviews yet"}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>`;
  });
}

function renderFeatured(products){
  featuredContainer.innerHTML = "";
  products.forEach(p=>{
    featuredContainer.innerHTML += `
      <div class="product">
        <img src="${p.image}" />
        <h4>${p.name}</h4>
        <p>₦${p.price}</p>
        <p class="review">${p.reviews?`${p.reviews} ⭐`:"No reviews yet"}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>`;
  });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
window.addToCart = function(product){
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

window.searchProducts = function(){
  const term = document.getElementById("search").value.toLowerCase();
  const filtered = allProducts.filter(p=>p.name.toLowerCase().includes(term));
  renderProducts(filtered);
}

window.filterCategory = function(category){
  const filtered = allProducts.filter(p=>p.category===category);
  renderProducts(filtered);
}

loadProducts();