import { auth, signOut, db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "./firebase.js";

async function loadProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  const container = document.getElementById("allProducts");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" width="100">
        <h4>${p.name}</h4>
        <p>₦${p.price}</p>
        <p>Category: ${p.category}</p>
        <p>Featured: ${p.featured} | Trending: ${p.trending} | Flash: ${p.flash} | Reviews: ${p.reviews}</p>
        <button onclick='editProduct("${docSnap.id}")'>Edit</button>
        <button onclick='deleteProduct("${docSnap.id}")'>Delete</button>
      </div>
    `;
  });
}

window.addProduct = async function() {
  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;
  const featured = document.getElementById("featured").checked;
  const trending = document.getElementById("trending").checked;
  const flash = document.getElementById("flash").checked;
  const reviews = Number(document.getElementById("reviews").value);

  await addDoc(collection(db, "products"), { name, price, image, category, featured, trending, flash, reviews });
  alert("Product Added");
  loadProducts();
}

window.editProduct = async function(id) {
  const docRef = doc(db, "products", id);
  const newName = prompt("New Name:");
  const newPrice = Number(prompt("New Price:"));
  await updateDoc(docRef, { name:newName, price:newPrice });
  loadProducts();
}

window.deleteProduct = async function(id) {
  if(confirm("Delete this product?")){
    await deleteDoc(doc(db,"products",id));
    loadProducts();
  }
}

async function loadOrders() {
  const snapshot = await getDocs(collection(db,"orders"));
  const container = document.getElementById("allOrders");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const o = docSnap.data();
    container.innerHTML += `
      <div class="product">
        <h4>${o.product.name}</h4>
        <p>Price: ₦${o.product.price}</p>
        <p>User: ${o.email}</p>
        <p>Status: ${o.status}</p>
        <button onclick='updateOrderStatus("${docSnap.id}")'>Mark Delivered</button>
      </div>
    `;
  });
}

window.updateOrderStatus = async function(id){
  const docRef = doc(db,"orders",id);
  await updateDoc(docRef,{status:"Delivered"});
  loadOrders();
}

window.logout = function() {
  signOut(auth).then(()=> location.href="login.html");
}

loadProducts();
loadOrders();