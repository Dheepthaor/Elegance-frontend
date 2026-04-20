import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);

        // ✅ LIMIT TO 12 PRODUCTS ONLY (3 slides × 4 products)
        setProducts(res.data.slice(0, 12));

      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // 👉 group into 4 products per slide
  const chunkSize = 4;
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    groupedProducts.push(products.slice(i, i + chunkSize));
  }

  // ✅ LIMIT SLIDES TO MAX 3
  const slides = groupedProducts.slice(0, 3);

  // 👉 auto slide (ONLY 3 SLIDES)
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container-custom">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
              Featured Collection
            </h2>
            <p className="text-muted-foreground">
              Handpicked favorites and bestsellers
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-medium link-underline"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* SLIDER */}
        {loading ? (
          <p className="text-center text-muted-foreground">
            Loading products...
          </p>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {slides.map((group, i) => (
                  <div
                    key={i}
                    className="min-w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
                  >
                    {group.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-6 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-black w-5"
                      : "bg-gray-400 w-2.5"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
