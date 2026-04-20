import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Star, Pencil, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import axios from "axios";

export function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const { addItem, toggleCart } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.user?.role === "admin";


  const isWishlisted = isInWishlist(product._id);

  // 🛒 QUICK ADD
  const handleQuickAdd = (e) => {
    e.preventDefault();

    addItem({
      product,
      quantity: 1,
      size: product.sizes?.[0],
      color: product.colors?.[0]?.name,
    });

    toast.success("Added to bag", {
      description: `${product.name} has been added to your bag.`,
      action: {
        label: "View Bag",
        onClick: toggleCart,
      },
    });
  };

  // ❤️ WISHLIST
  const handleWishlist = (e) => {
    e.preventDefault();

    if (isWishlisted) {
      removeFromWishlist(product._id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  // 🗑️ DELETE PRODUCT (ADMIN)
  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
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
      window.location.reload(); // ok for now
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div
      className="group product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} className="block">
        {/* IMAGE */}
        <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="product-image"
          />

          {/* 🔐 ADMIN ACTIONS */}
          {isAdmin && (
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/edit-product/${product._id}`);
                }}
                className="bg-black text-white p-2 rounded"
                title="Edit"
              >
                <Pencil size={14} />
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white p-2 rounded"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          {/* ❤️ WISHLIST */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-background/80 rounded-full"
          >
            <Heart
              className={cn("w-4 h-4", isWishlisted && "fill-rose text-rose")}
            />
          </button>

          {/* QUICK ADD */}
          <div className="product-actions">
            <button
              onClick={handleQuickAdd}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="pt-4 pb-2">
          <h3 className="font-medium">{product.name}</h3>

          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">₹{product.price}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>{product.rating || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
