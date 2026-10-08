import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, name, price, bestseller }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card-img-wrapper">
        {bestseller && <span className="bestseller-badge">BESTSELLER</span>}
        <img src={image[0]} alt={name} className="product-card-img" />
      </div>
      <div className="product-card-info">
        <p className="product-card-title">{name}</p>
        <p className="product-card-price">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
