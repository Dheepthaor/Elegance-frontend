import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
    const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/products`
);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

     await axios.delete(
  `${import.meta.env.VITE_API_URL}/admin/${id}`,
  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container-custom py-10">
      
      {/* 🔥 TITLE SECTION */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your products</p>
      </div>

      {/* ➕ ADD PRODUCT BUTTON */}
      <div className="flex justify-end mb-6">
        <Link to="/admin/add-product">
          <button className="bg-black text-white px-5 py-2 rounded hover:opacity-90 transition">
            + Add Product
          </button>
        </Link>
      </div>

      <hr className="mb-6" />

      {/* PRODUCTS LIST */}
      {products.length === 0 && (
        <p className="text-gray-500">No products found</p>
      )}

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{p.name}</h4>
              <p className="text-gray-500">₹{p.price}</p>
            </div>

            <div className="flex gap-3">
              {/* EDIT */}
              <Link to={`/admin/edit-product/${p._id}`}>
                <button className="px-4 py-1 border rounded hover:bg-gray-100">
                  Edit
                </button>
              </Link>

              {/* DELETE */}
              <button
                onClick={() => deleteProduct(p._id)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
