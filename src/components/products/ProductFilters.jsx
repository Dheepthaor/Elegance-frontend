import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "kids", label: "Kids" },
  { value: "accessories", label: "Accessories" },
];

export function ProductFilters({ selectedCategory, onCategoryChange }) {
  const [expandedSections, setExpandedSections] = useState(["category"]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const hasActiveFilters = selectedCategory !== "all";

  const FilterContent = () => (
    <>
      {/* CATEGORY */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full py-2 mb-2"
        >
          <span className="font-medium text-sm uppercase tracking-wide">
            Category
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              expandedSections.includes("category") && "rotate-180"
            )}
          />
        </button>

        {expandedSections.includes("category") && (
          <div className="flex flex-col gap-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;

              return (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={cn(
                    "group relative text-left px-3 py-2 text-sm transition-all duration-200",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* LEFT ACTIVE BAR */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-black transition-all duration-300",
                      isActive
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 group-hover:opacity-60 group-hover:scale-y-75"
                    )}
                  />

                  {/* TEXT */}
                  <span className="ml-3">{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* CLEAR FILTER */}
      {hasActiveFilters && (
        <button
          onClick={() => onCategoryChange("all")}
          className="w-full btn-outline py-3 mt-4 text-sm"
        >
          Clear Filter
        </button>
      )}
    </>
  );

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 btn-outline px-4 py-2 text-sm"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <h2 className="font-display text-xl mb-6">Filters</h2>
        <FilterContent />
      </div>

      {/* MOBILE DRAWER */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/50 z-50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-background z-50 p-6 overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl">Filters</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-secondary rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterContent />
          </div>
        </>
      )}
    </>
  );
}
