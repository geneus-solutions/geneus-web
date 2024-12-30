import React, { useState } from "react";
import useAxiosPrivate from "../../customAxios/authAxios";
import "./Product.css";

const Product = () => {
  // const privateAxios = useAxiosPrivate();
  const [product, setProduct] = useState({
    name: "",
    protein: "",
    fat: "",
    carbs: "",
    calories: "",
    servingSize: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await privateAxios.post("/addFoodItem", product);
      // alert("Product added successfully");
      // Reset form
      setProduct({
        name: "",
        protein: "",
        fat: "",
        carbs: "",
        calories: "",
        servingSize: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="product-container">
      <h2 className="form-title">Add your product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label>Calories</label>
          <input
            type="number"
            name="calories"
            value={product.calories}
            onChange={handleChange}
            placeholder="Enter calories"
            required
          />
        </div>

        <div className="form-group">
          <label>Protein (g)</label>
          <input
            type="number"
            name="protein"
            value={product.protein}
            onChange={handleChange}
            placeholder="Enter protein"
            required
          />
        </div>

        <div className="form-group">
          <label>Carbs (g)</label>
          <input
            type="number"
            name="carbs"
            value={product.carbs}
            onChange={handleChange}
            placeholder="Enter carbs"
            required
          />
        </div>

        <div className="form-group">
          <label>Fat (g)</label>
          <input
            type="number"
            name="fat"
            value={product.fat}
            onChange={handleChange}
            placeholder="Enter fat"
            required
          />
        </div>

        <div className="form-group">
          <label>Serving Size (g)</label>
          <input
            type="text"
            name="servingSize"
            value={product.servingSize}
            onChange={handleChange}
            placeholder="Enter serving size"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default Product;
