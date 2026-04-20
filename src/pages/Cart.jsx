import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { state, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-display text-3xl font-semibold mb-4">Your Bag is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your bag yet.
              Explore our collection and find something you love.
            </p>
            <Link to="/products" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold">
            Shopping Bag ({totalItems})
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear Bag
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-4 sm:gap-6 p-4 bg-secondary/30 rounded-sm"
              >
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-24 sm:w-32 h-32 sm:h-40 bg-secondary flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium hover:underline line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-border bg-background">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-medium">
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
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          ${item.product.price} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-secondary/30 p-6 lg:p-8 rounded-sm">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Shipping</span>
                  <span>{totalPrice >= 150 ? 'Free' : '$15.00'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Estimated Total</span>
                  <span>${(totalPrice + (totalPrice >= 150 ? 0 : 15)).toFixed(2)}</span>
                </div>
                {totalPrice < 150 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Add ${(150 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo Code */}

              <button className="w-full btn-primary py-4 font-medium mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block w-full btn-outline py-3 text-center text-sm"
              >
                Continue Shopping
              </Link>

              {/* Payment Icons */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Secure checkout powered by
                </p>
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                  <span className="text-xs font-medium">VISA</span>
                  <span className="text-xs font-medium">MASTERCARD</span>
                  <span className="text-xs font-medium">AMEX</span>
                  <span className="text-xs font-medium">PAYPAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
