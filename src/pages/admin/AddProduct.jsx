import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "men",
    brand: "",
    countInStock: "",
    sizes: "",
    image: "",
    colors: [],
  });

  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "image") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token) {
      alert("Admin not logged in");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      brand: formData.brand,
      countInStock: Number(formData.countInStock),
      sizes: formData.sizes.split(","),
      images: [formData.image],
      colors: [
        {
          name: "Black",
          code: "#000000",
        },
      ],
    };

    try {
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/admin/products`,
  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add product");
        return;
      }

      alert("Product added successfully");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Add Product (Admin)
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input name="name" placeholder="Product Name" onChange={handleChange} style={inputStyle} />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "80px" }}
        />

        <input name="price" type="number" placeholder="Price" onChange={handleChange} style={inputStyle} />

        <select name="category" onChange={handleChange} style={inputStyle}>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="accessories">Accessories</option>
        </select>

        <input name="brand" placeholder="Brand" onChange={handleChange} style={inputStyle} />

        <input name="countInStock" type="number" placeholder="Stock" onChange={handleChange} style={inputStyle} />

        <input name="sizes" placeholder="Sizes (S,M,L)" onChange={handleChange} style={inputStyle} />

        <input name="image" placeholder="Image URL" onChange={handleChange} style={inputStyle} />

        {/* 🖼️ Image Preview */}
        {formData.image && !imageError && (
          <img
            src={formData.image}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
            onError={() => setImageError(true)}
          />
        )}

        {imageError && (
          <p style={{ color: "red", fontSize: "14px" }}>
            Invalid image URL
          </p>
        )}

        <button type="submit" style={buttonStyle}>
          Add Product
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  padding: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default AddProduct;
