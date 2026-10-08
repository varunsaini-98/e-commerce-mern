import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((p) => p._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // Cash on Delivery Method (/api/order/place)
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: { token },
            },
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            alert(response.data.message);
          }
          break;
        }

        // Stripe Payment Gateway (/api/order/stripe)
        case "stripe": {
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            {
              headers: { token },
            },
          );
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            alert(responseStripe.data.message);
          }
          break;
        }

        // Razorpay Payment Gateway (/api/order/razorpay)
        case "razorpay": {
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            {
              headers: { token },
            },
          );
          if (responseRazorpay.data.success) {
            alert(`Razorpay Order Created: ${responseRazorpay.data.order.id}`);
            setCartItems({});
            navigate("/orders");
          } else {
            alert(responseRazorpay.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="place-order-form">
      <h3>Delivery Information</h3>
      <input
        name="firstName"
        onChange={onChangeHandler}
        placeholder="First name"
        required
      />
      <input
        name="lastName"
        onChange={onChangeHandler}
        placeholder="Last name"
        required
      />
      <input
        name="email"
        onChange={onChangeHandler}
        placeholder="Email address"
        required
      />
      <input
        name="street"
        onChange={onChangeHandler}
        placeholder="Street"
        required
      />
      <input
        name="city"
        onChange={onChangeHandler}
        placeholder="City"
        required
      />
      <input
        name="phone"
        onChange={onChangeHandler}
        placeholder="Phone number"
        required
      />

      <h3>Payment Method</h3>
      <button type="button" onClick={() => setMethod("stripe")}>
        Stripe
      </button>
      <button type="button" onClick={() => setMethod("razorpay")}>
        Razorpay
      </button>
      <button type="button" onClick={() => setMethod("cod")}>
        Cash on Delivery
      </button>

      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlaceOrder;
