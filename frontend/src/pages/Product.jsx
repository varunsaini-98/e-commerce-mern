import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const item = products.find((p) => p._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="product-detail-container">
      {/* Product Image Gallery */}
      <div className="gallery-section">
        <div className="thumbnail-list">
          {productData.image.map((item, index) => (
            <img
              src={item}
              key={index}
              onClick={() => setImage(item)}
              alt="thumbnail"
              width="70"
            />
          ))}
        </div>
        <div className="main-image">
          <img src={image} alt={productData.name} width="400" />
        </div>
      </div>

      {/* Product Information */}
      <div className="info-section">
        <h2>{productData.name}</h2>
        <p className="price">
          {currency}
          {productData.price}
        </p>
        <p className="description">{productData.description}</p>

        <div className="size-selector">
          <p>Select Size:</p>
          <div className="size-buttons">
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                className={item === size ? "selected-size" : ""}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => addToCart(productData._id, size)}
          className="add-to-cart-btn"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  ) : (
    <div className="loading-state">Loading product details...</div>
  );
};

export default Product;
