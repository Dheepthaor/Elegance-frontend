import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct"
import AdminProducts from "./pages/admin/AdminProducts"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
            <WishlistDrawer />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
             <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<AdminProducts/>}/>
             <Route path="/admin/add-product" element={<AddProduct />} />
             <Route path="/admin/edit-product/:id" element={<EditProduct/>}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
        </TooltipProvider>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
