import React, { useState } from "react";
import axios from "axios";

const AdminAdd = ({ adminToken, backendUrl }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Toggle size selections
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      alert("Please select at least one size.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      // Append binary File objects (using files[0])
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token: adminToken } },
      );

      if (response.data.success) {
        alert("Product Added Successfully!");
        // Reset Form Fields
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestSeller(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="admin-add-form">
      <h3>Upload Product Images</h3>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "15px",
        }}
      >
        <div>
          <label htmlFor="image1" style={{ cursor: "pointer" }}>
            <img
              src={
                !image1
                  ? "https://via.placeholder.com/80?text=Upload"
                  : URL.createObjectURL(image1)
              }
              alt="Preview 1"
              width="80"
              height="80"
              style={{
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px dashed #cbd5e1",
              }}
            />
          </label>
          <input
            type="file"
            id="image1"
            onChange={(e) => setImage1(e.target.files[0])}
            hidden
          />
        </div>

        <div>
          <label htmlFor="image2" style={{ cursor: "pointer" }}>
            <img
              src={
                !image2
                  ? "https://via.placeholder.com/80?text=Upload"
                  : URL.createObjectURL(image2)
              }
              alt="Preview 2"
              width="80"
              height="80"
              style={{
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px dashed #cbd5e1",
              }}
            />
          </label>
          <input
            type="file"
            id="image2"
            onChange={(e) => setImage2(e.target.files[0])}
            hidden
          />
        </div>

        <div>
          <label htmlFor="image3" style={{ cursor: "pointer" }}>
            <img
              src={
                !image3
                  ? "https://via.placeholder.com/80?text=Upload"
                  : URL.createObjectURL(image3)
              }
              alt="Preview 3"
              width="80"
              height="80"
              style={{
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px dashed #cbd5e1",
              }}
            />
          </label>
          <input
            type="file"
            id="image3"
            onChange={(e) => setImage3(e.target.files[0])}
            hidden
          />
        </div>

        <div>
          <label htmlFor="image4" style={{ cursor: "pointer" }}>
            <img
              src={
                !image4
                  ? "https://via.placeholder.com/80?text=Upload"
                  : URL.createObjectURL(image4)
              }
              alt="Preview 4"
              width="80"
              height="80"
              style={{
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px dashed #cbd5e1",
              }}
            />
          </label>
          <input
            type="file"
            id="image4"
            onChange={(e) => setImage4(e.target.files[0])}
            hidden
          />
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>
          Product Name
        </label>
        <input
          type="text"
          placeholder="Type product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>
          Product Description
        </label>
        <textarea
          placeholder="Write product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>
            Sub Category
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>
            Price (\$)
          </label>
          <input
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>
          Product Sizes
        </label>
        <div
          className="size-buttons"
          style={{ display: "flex", gap: "8px", marginTop: "5px" }}
        >
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              type="button"
              key={size}
              className={sizes.includes(size) ? "selected-size" : ""}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        <input
          type="checkbox"
          id="bestseller"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
        <label
          htmlFor="bestseller"
          style={{ fontSize: "0.9rem", cursor: "pointer" }}
        >
          Add to Bestseller
        </label>
      </div>

      <button type="submit" style={{ marginTop: "15px" }}>
        ADD PRODUCT
      </button>
    </form>
  );
};
export default AdminAdd;
