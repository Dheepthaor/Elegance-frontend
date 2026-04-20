import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    state,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <>
      {/* BACKDROP */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* DRAWER */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transition-transform duration-300",
          state.isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl">
              Shopping Bag ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-secondary transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CONTENT */}
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-display text-xl mb-2">
                Your bag is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Discover our latest collection and find something you love.
              </p>
              <Link
                to="/products"
                onClick={closeCart}
                className="btn-primary px-8 py-3 text-sm font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* ITEMS */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {state.items.map((item) => (
                  <div
                    key={`${item.product._id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={closeCart}
                      className="w-24 h-32 bg-secondary overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <Link
                        to={`/product/${item.product._id}`}
                        onClick={closeCart}
                        className="font-medium hover:underline line-clamp-1"
                      >
                        {item.product.name}
                      </Link>

                      <p className="text-sm text-muted-foreground mt-1">
                        {item.size} / {item.color}
                      </p>

                      <p className="font-medium mt-1">
                        ₹{item.product.price}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            className="p-2 hover:bg-secondary transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="w-10 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="p-2 hover:bg-secondary transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeItem(
                              item.product._id,
                              item.size,
                              item.color
                            )
                          }
                          className="text-sm text-muted-foreground hover:text-foreground underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="block w-full btn-primary py-4 text-center font-medium"
                >
                  View Bag & Checkout
                </Link>

                <button
                  onClick={closeCart}
                  className="block w-full btn-outline py-3 text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
