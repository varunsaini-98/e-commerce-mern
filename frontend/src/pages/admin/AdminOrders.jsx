import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = ({ adminToken, backendUrl }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!adminToken) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token: adminToken } },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token: adminToken } },
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [adminToken]);

  return (
    <div>
      <h2>Order Fulfillment Console</h2>
      {orders.map((order) => (
        <div key={order._id} className="admin-order-card">
          <p>Order ID: {order._id}</p>
          <p>Amount: \${order.amount}</p>
          <p>
            Payment: {order.paymentMethod} ({order.payment ? "Paid" : "Pending"}
            )
          </p>
          <select
            value={order.status}
            onChange={(e) => statusHandler(e, order._id)}
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
