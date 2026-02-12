const products = [
  { id: 1, name: "Wireless Headset", price: 15000 },
  { id: 2, name: "Smart Watch", price: 25000 },
  { id: 3, name: "Men Sneakers", price: 18000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <h3>${product.name}</h3>
        <p>₦${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

function displayCart() {
  const container = document.getElementById("cart");
  const totalElement = document.getElementById("total");
  if (!container) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    total += item.price;
    container.innerHTML += `
      <div class="product-card">
        <h3>${item.name}</h3>
        <p>₦${item.price}</p>
      </div>
    `;
  });

  totalElement.innerText = total;
}

displayProducts();
displayCart();