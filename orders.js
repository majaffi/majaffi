import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getDocs(collection(db,"orders"));
      setOrders(data.docs.map(doc => doc.data()));
    };
    fetch();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Orders</h2>

      {orders.map((o,i)=>(
        <div key={i} className="border p-2 mb-2">
          <h5>{o.product.title}</h5>
          <p>{o.email}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { db, collection, getDocs, doc, updateDoc } from "./firebase.js";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getDocs(collection(db, "orders"));
      setOrders(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchOrders();
  }, []);

  const markDelivered = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "Delivered" });
    setOrders(prev => prev.map(o => o.id === id ? {...o, status: "Delivered"} : o));
  };

  return (
    <div className="container">
      <h2>All Orders</h2>
      {orders.map(o => (
        <div key={o.id} className="border p-2 mb-2">
          <p>{o.product.name} - ₦{o.product.price}</p>
          <p>{o.email}</p>
          <p>Status: {o.status}</p>
          {o.status !== "Delivered" && (
            <button onClick={() => markDelivered(o.id)}>Mark Delivered</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;