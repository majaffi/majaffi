import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Admin() {

  const [product, setProduct] = useState({});

  if (auth.currentUser?.email !== "affison01@gmail.com")
    return <h2 className="text-center mt-5">Access Denied</h2>;

  const upload = async () => {
    await addDoc(collection(db, "products"), product);
    alert("Uploaded");
  };

  return (
    <div className="container mt-5">
      <input placeholder="Title"
        className="form-control mb-2"
        onChange={e => setProduct({...product, title:e.target.value})} />

      <input placeholder="Price"
        className="form-control mb-2"
        onChange={e => setProduct({...product, price:Number(e.target.value)})} />

      <input placeholder="Image URL"
        className="form-control mb-2"
        onChange={e => setProduct({...product, image:e.target.value})} />

      <button className="btn btn-dark" onClick={upload}>
        Upload Product
      </button>
    </div>
  );
}
