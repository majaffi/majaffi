import React, { useState } from "react";
import PayButton from "./PayButton";

export default function ProductCard({ product }) {
  const [showPay, setShowPay] = useState(false);

  return (
    <div className="col-md-3">
      <div className="card p-2 mb-3 shadow-sm">
        <img src={product.image} alt="" className="card-img-top" />
        <h5>{product.title}</h5>
        <p>₦{product.price}</p>

        <button
          className="btn btn-dark"
          onClick={() => setShowPay(true)}
        >
          Buy Now
        </button>

        {showPay && <PayButton product={product} />}
      </div>
    </div>
  );
}