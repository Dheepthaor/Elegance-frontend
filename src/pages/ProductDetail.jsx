import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, toggleCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showZoom, setShowZoom] = useState(false);

  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [smoothLens, setSmoothLens] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/products/${id}`
);
        setProduct(res.data);
        setActiveImage(res.data.images?.[0]);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔍 SMOOTH LENS FOLLOW (ULTRA PREMIUM)
  useEffect(() => {
    const animate = () => {
      setSmoothLens((prev) => ({
        x: prev.x + (lensPosition.x - prev.x) * 0.15,
        y: prev.y + (lensPosition.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(animate);
    };
    animate();
  }, [lensPosition]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const percentX = (x / width) * 100;
    const percentY = (y / height) * 100;

    setZoomPosition({ x: percentX, y: percentY });
    setLensPosition({ x, y });
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20">Loading product...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20">Product not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* ================= IMAGE + ZOOM ================= */}
        <div className="flex gap-6 relative">

          {/* THUMBNAILS */}
          {product.images?.length > 1 && (
            <div className="flex flex-col gap-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "w-20 h-24 object-cover rounded-md cursor-pointer border transition-all",
                    activeImage === img
                      ? "border-black scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                />
              ))}
            </div>
          )}

          {/* MAIN IMAGE */}
          <div
            className="w-[400px] h-[500px] overflow-hidden rounded-xl bg-gray-100 relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          >
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* 🔍 ULTRA PREMIUM LENS */}
            {showZoom && (
              <div
                className="absolute pointer-events-none rounded-full overflow-hidden shadow-2xl border border-white/40 backdrop-blur-sm"
                style={{
                  width: "160px",
                  height: "160px",
                  left: `${smoothLens.x - 80}px`,
                  top: `${smoothLens.y - 80}px`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div
                  className="w-full h-full bg-no-repeat"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundSize: "250%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* 🔥 RIGHT ZOOM PANEL */}
          {showZoom && (
            <div className="hidden lg:block w-[400px] h-[500px] border rounded-xl overflow-hidden bg-white shadow-xl">
              <div
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundSize: "200%",
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* ================= DETAILS ================= */}
        <div className="flex flex-col">

          <p className="text-xs text-muted-foreground mb-2">
            SKU: {product._id.slice(-8)}
          </p>

          <h1 className="text-4xl font-semibold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold mb-6">
            ₹{product.price}
          </p>

          <p className="text-muted-foreground mb-8">
            {product.description}
          </p>

          {/* SIZE */}
          <div className="mb-8">
            <p className="font-medium mb-3 uppercase text-sm">
              Select Size
            </p>

            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-5 py-2 border transition-all",
                    selectedSize === size
                      ? "bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-8">
            <p className="font-medium mb-3 uppercase text-sm">
              Quantity
            </p>

            <div className="flex border rounded-md w-fit bg-white">
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                −
              </button>
              <span className="px-6">{quantity}</span>
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="space-y-4">
            <Button
              className="w-full py-6 bg-black text-white hover:bg-gray-900"
              onClick={() => {
                if (!selectedSize) {
                  alert("Select size");
                  return;
                }

                addItem({ product, quantity, size: selectedSize });
                toggleCart();
              }}
            >
              Add to Cart
            </Button>

            <Button
              className="w-full py-6 bg-white border border-black text-black hover:bg-black hover:text-white"
              onClick={() => {
                if (!selectedSize) {
  toast.error("Please select a size");
  return;
}

                addItem({ product, quantity, size: selectedSize });
                navigate("/cart");
              }}
            >
              Buy Now
            </Button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
