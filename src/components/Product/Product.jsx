import React, { useState, useEffect, useCallback } from "react";
import useAxiosPrivate from "../../customAxios/authAxios";
import "./Product.css";

const Product = () => {
  const privateAxios = useAxiosPrivate();
  const [product, setProduct] = useState({
    name: "",
    protein: "",
    fat: "",
    carbs: "",
    calories: "",
    servingSize: "",
  });

  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize fetchFoodItems to avoid unnecessary re-creations
  const fetchFoodItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await privateAxios.get("/addFoodItem");
      setFoodItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch food items");
    } finally {
      setIsLoading(false);
    }
  }, [privateAxios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await privateAxios.post("/addFoodItem", product);
      alert("Product added successfully");
      setProduct({
        name: "",
        protein: "",
        fat: "",
        carbs: "",
        calories: "",
        servingSize: "",
      });
      fetchFoodItems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]); // Add fetchFoodItems as a dependency

  return (
    <div className="product-container">
      <h2>Add Food Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {["name", "calories", "protein", "carbs", "fat", "servingSize"].map(
          (field) => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type={
                  field === "calories" ||
                  field === "protein" ||
                  field === "carbs" ||
                  field === "fat"
                    ? "number"
                    : "text"
                }
                name={field}
                value={product[field]}
                onChange={handleChange}
                required
              />
            </label>
          )
        )}
        <button type="submit">Add Product</button>
      </form>

      <div className="food-items-list">
        <h3>Food Items List</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : foodItems.length === 0 ? (
          <p>No food items found</p>
        ) : (
          <ul>
            {foodItems.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong>: {item.calories} cal,{" "}
                {item.protein}g protein, {item.carbs}g carbs, {item.fat}g fat,
                Serving Size: {item.servingSize}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Product;
