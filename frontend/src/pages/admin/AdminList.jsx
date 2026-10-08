import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminList = ({ adminToken, backendUrl }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token: adminToken } },
      );
      if (response.data.success) {
        await fetchList();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="admin-list-container">
      <h3>All Products Inventory</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image} alt={item.name} width="50" />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>\${item.price}</td>
              <td>
                <button onClick={() => removeProduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
