import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="cart-page">
      <Title text1={"YOUR"} text2={"CART"} />
      <div className="cart-list">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );
          if (!productData) return null;

          return (
            <div key={index} className="cart-item-row">
              <img src={productData.image} alt={productData.name} width="80" />
              <div>
                <p className="item-name">{productData.name}</p>
                <p>
                  {currency}
                  {productData.price} | Size: {item.size}
                </p>
              </div>
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value),
                      )
                }
              />
              <button onClick={() => updateQuantity(item._id, item.size, 0)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-summary-section">
        <CartTotal />
        <button
          onClick={() => navigate("/place-order")}
          className="checkout-btn"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
