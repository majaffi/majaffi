import React from "react";
import { usePaystackPayment } from "react-paystack";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function PayButton({ product }) {

  const config = {
    reference: new Date().getTime().toString(),
    email: auth.currentUser?.email,
    amount: product.price * 100,
    publicKey: "YOUR_PAYSTACK_PUBLIC_KEY",
  };

  const onSuccess = async () => {
    await addDoc(collection(db, "orders"), {
      email: auth.currentUser.email,
      product,
      status: "Processing",
      createdAt: new Date()
    });

    alert("Payment Successful!");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      className="btn btn-success mt-2"
      onClick={() => initializePayment(onSuccess)}
    >
      Pay ₦{product.price}
    </button>
  );
}