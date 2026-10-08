import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Fetch Orders from Backend
  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  // Cancel Order Handler
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId },
        { headers: { token } },
      );

      if (response.data.success) {
        alert("Order cancelled successfully!");
        loadOrderData(); // Refresh list to reflect 'Cancelled' status
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(error.response?.data?.message || "Failed to cancel order");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="orders-container">
      <Title text1={"MY"} text2={"ORDERS"} />

      <div style={{ marginTop: "1.5rem" }}>
        {orderData.map((item, index) => (
          <div key={index} className="order-item">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={item.image}
                alt={item.name}
                width="70"
                height="80"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
              <div>
                <p style={{ fontWeight: "600" }}>{item.name}</p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    fontSize: "0.85rem",
                    color: "#64748b",
                  }}
                >
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                    marginTop: "4px",
                  }}
                >
                  Date: <span>{new Date(item.date).toDateString()}</span> |
                  Payment: {item.paymentMethod}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor:
                      item.status === "Cancelled"
                        ? "#ef4444"
                        : item.status === "Order Placed"
                          ? "#22c55e"
                          : "#eab308",
                  }}
                ></span>
                <span style={{ fontSize: "0.85rem" }}>{item.status}</span>
              </div>

              <button onClick={loadOrderData}>Track Order</button>

              {/* Show Cancel button only while status is 'Order Placed' */}
              {item.status === "Order Placed" && (
                <button
                  onClick={() => handleCancelOrder(item.orderId)}
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#ef4444",
                    borderColor: "#fecaca",
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
