import React from "react";
import { createOrder, verifyPayment } from "@/services/paymentService";

const Checkout = ({ totalAmount = 999 }) => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const order = await createOrder(totalAmount);

      // 2️⃣ Razorpay options
      const options = {
        key: "RAZORPAY_KEY_HERE", // placeholder for now
        amount: order.amount,
        currency: "INR",
        name: "My E-Commerce Store",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.success) {
            alert("Payment Successful 🎉");
          } else {
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#000000",
        },
      };

      // 3️⃣ Open Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>

      <p className="mb-4">
        Total Amount: <strong>₹{totalAmount}</strong>
      </p>

      <button
        onClick={handlePayment}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
