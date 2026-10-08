import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "../components/ProductItem.jsx";
import Title from "../components/Title.jsx";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="collection-container">
      {/* Sidebar Filter Options */}
      <div className="filter-options">
        <h3>Filters</h3>
        <div className="filter-group">
          <h4>Categories</h4>
          <p>
            <input type="checkbox" value="Men" onChange={toggleCategory} /> Men
          </p>
          <p>
            <input type="checkbox" value="Women" onChange={toggleCategory} />{" "}
            Women
          </p>
          <p>
            <input type="checkbox" value="Kids" onChange={toggleCategory} />{" "}
            Kids
          </p>
        </div>
        <div className="filter-group">
          <h4>Type</h4>
          <p>
            <input
              type="checkbox"
              value="Topwear"
              onChange={toggleSubCategory}
            />{" "}
            Topwear
          </p>
          <p>
            <input
              type="checkbox"
              value="Bottomwear"
              onChange={toggleSubCategory}
            />{" "}
            Bottomwear
          </p>
          <p>
            <input
              type="checkbox"
              value="Winterwear"
              onChange={toggleSubCategory}
            />{" "}
            Winterwear
          </p>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="catalog-view">
        <div className="catalog-header">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="product-grid">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
