import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export function ProductGridCard({ product }) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.user?.role === "admin";

  const isWishlisted = isInWishlist(product._id);

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
     await axios.delete(
  `${import.meta.env.VITE_API_URL}/admin/products/${product._id}`,
  {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Product deleted");
      window.location.reload();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();

    if (isWishlisted) {
      removeItem(product._id);
    } else {
      addItem(product);
    }
  };

  return (
    <div className="group text-center">
      <Link to={`/product/${product._id}`}>

        {/* ✅ FIXED IMAGE CONTAINER */}
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">

          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* ADMIN BUTTONS */}
          {isAdmin && (
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/edit-product/${product._id}`);
                }}
                className="bg-black text-white p-2 rounded"
              >
                ✏️
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white p-2 rounded"
              >
                🗑️
              </button>
            </div>
          )}

          {/* ❤️ OPTIONAL (kept your wishlist logic intact but not shown before) */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full"
          >
            <Heart
              className={cn(
                "w-4 h-4",
                isWishlisted && "fill-red-500 text-red-500"
              )}
            />
          </button>

        </div>

        {/* DETAILS */}
        <div className="mt-4">
          <h3 className="text-sm font-medium truncate">
            {product.name}
          </h3>
          <div className="w-6 h-[1px] bg-black mx-auto my-2"></div>
          <p className="text-base font-medium">₹{product.price}</p>
        </div>

      </Link>
    </div>
  );
}