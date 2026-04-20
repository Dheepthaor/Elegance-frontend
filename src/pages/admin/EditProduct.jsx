import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const authData = JSON.parse(localStorage.getItem("user"));
  const user = authData?.user;
  const token = authData?.token;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // 🔒 Admin protection
  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admin only.");
      navigate("/products");
    }
  }, [user, navigate]);

  // 📦 Fetch product
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/products/${id}`
);

        setFormData({
          name: res.data.name || "",
          price: res.data.price || "",
          description: res.data.description || "",
          image: res.data.images?.[0] || "",
        });
      } catch (error) {
        console.error("Failed to fetch product", error);
        alert("Product not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // ✏️ Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Authentication error");
      return;
    }

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      images: [formData.image],
    };

    try {
     await axios.put(
  `${import.meta.env.VITE_API_URL}/admin/products/${id}`,
  payload,
  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product updated successfully");
      navigate("/products");
    } catch (error) {
      console.error("Update failed", error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading product...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          rows={4}
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        {/* IMAGE URL */}
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        {/* IMAGE PREVIEW */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />
        )}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
