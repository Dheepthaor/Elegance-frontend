import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Grid3X3, LayoutGrid } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductGridCard } from "@/components/products/ProductGridCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const Products = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/products`
);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  setSelectedCategory(category);
  setSearchQuery(search);
}, [searchParams]);
  console.log("Products state:", products);
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter(
  (p) =>
    p.category?.toLowerCase() === selectedCategory?.toLowerCase()
);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((c) => selectedColors.includes(c.name))
      );
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) => selectedSizes.includes(s))
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return result;
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedColors,
    selectedSizes,
    priceRange,
    sortBy,
  ]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 1000]);
    setSearchQuery("");
  };

  const categoryTitle =
    selectedCategory === "all"
      ? "All Products"
      : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20">Loading products...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HEADER */}
      <div className="bg-secondary/30 ">
        <div className="container-custom text-center">
          <h1 className="font-display text-4xl font-semibold">
            {categoryTitle}
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          
          {/* LEFT — FILTERS */}
          <aside className="sticky top-24 h-fit">
              {JSON.parse(localStorage.getItem("user"))?.user?.role === "admin" && (
      <button
        onClick={() => window.location.href = "/admin/add-product"}
        className="w-full mb-4 bg-black text-white py-3 rounded hover:opacity-90"
      >
        + Add Product
      </button>
    )}
            <ProductFilters
              selectedCategory={selectedCategory}
              selectedColors={selectedColors}
              selectedSizes={selectedSizes}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onColorsChange={setSelectedColors}
              onSizesChange={setSelectedSizes}
              onPriceChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* RIGHT — PRODUCTS */}
          <section>
            {/* SORT + GRID SWITCH */}
            <div className="flex justify-end items-center gap-4 mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-styled"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <div className="hidden lg:flex border border-border">
                <button
                  onClick={() => setGridCols(3)}
                  className={cn(
                    "p-2",
                    gridCols === 3
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={cn(
                    "p-2",
                    gridCols === 4
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl mb-3">No products found</h3>
                <button onClick={handleClearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  gridCols === 3
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductGridCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
