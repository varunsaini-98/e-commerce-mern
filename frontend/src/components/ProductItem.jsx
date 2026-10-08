import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="product-item-card">
      <img src={image} alt={name} className="product-thumbnail" />
      <p className="product-title">{name}</p>
      <p className="product-price">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
