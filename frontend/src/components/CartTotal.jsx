import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="cart-total-box">
      <Title text1={"CART"} text2={"TOTALS"} />
      <div className="total-details">
        <p>
          Subtotal:{" "}
          <span>
            {currency}
            {getCartAmount()}.00
          </span>
        </p>
        <p>
          Shipping Fee:{" "}
          <span>
            {currency}
            {delivery_fee}.00
          </span>
        </p>
        <hr />
        <h3>
          Total:{" "}
          <span>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </span>
        </h3>
      </div>
    </div>
  );
};

export default CartTotal;
