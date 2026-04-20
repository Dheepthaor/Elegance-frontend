import { Link } from "react-router-dom";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

export function WishlistDrawer() {
  const { state, closeWishlist, removeItem, totalItems } = useWishlist();
  const { addItem, toggleCart } = useCart();

  // ✅ Prevent background scroll when open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [state.isOpen]);

  const handleAddToCart = (product) => {
    addItem({
      product,
      quantity: 1,
      size: product.sizes?.[0],
      color: product.colors?.[0]?.name,
    });

    removeItem(product._id);
    closeWishlist();

    setTimeout(() => {
      toggleCart();
    }, 150);

    toast.success("Moved to bag", {
      description: `${product.name} has been added to your bag.`,
    });
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300",
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeWishlist}
      />

      {/* DRAWER */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-[100] shadow-2xl transition-transform duration-300",
          state.isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl">
              Wishlist ({totalItems})
            </h2>
            <button
              onClick={closeWishlist}
              className="p-2 rounded-full hover:bg-secondary transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CONTENT */}
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-display text-xl mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Save items you love and find them here anytime.
              </p>
              <Link
                to="/products"
                onClick={closeWishlist}
                className="btn-primary px-8 py-3 text-sm font-medium"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {state.items.map((product) => (
                <div key={product._id} className="flex gap-4">
                  <Link
                    to={`/product/${product._id}`}
                    onClick={closeWishlist}
                    className="w-24 h-32 bg-secondary overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <Link
                      to={`/product/${product._id}`}
                      onClick={closeWishlist}
                      className="font-medium hover:underline line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <p className="font-medium mt-1">₹{product.price}</p>

                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 btn-primary py-2 flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Bag
                      </button>

                      <button
                        onClick={() => removeItem(product._id)}
                        className="p-2 rounded-full hover:bg-secondary transition"
                        aria-label="Remove from wishlist"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
