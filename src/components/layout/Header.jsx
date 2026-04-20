import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import { useAuth } from "@/context/AuthContext";
import { User, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    label: 'Women',
    href: '/products?category=women',
    
  },
  {
    label: 'Men',
    href: '/products?category=men',
   
  },
  {
    label: 'Kids',
    href: '/products?category=kids',
  },
  {
    label: 'Accessories',
    href: '/products?category=accessories',
  },
  {
    label: 'Sale',
    href: '/products?sale=true',
  },
];

export function Header() {
  const {user,logout}=useAuth()
    console.log("USER:", user);
  const isAdmin = user?.user?.role === "admin";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toggleCart, totalItems } = useCart();
  const { toggleWishlist, totalItems: wishlistItems } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
const location = useLocation();

const params = new URLSearchParams(location.search);
const activeCategory = params.get("category"); // women, men, etc
  return (
   <header
  className={cn(
    "sticky top-0 z-50 transition-all duration-300",
    isScrolled
      ? "bg-background/80 backdrop-blur-md shadow-md border-b border-border"
      : "bg-background"
  )}
>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs sm:text-sm tracking-wide">
        Free shipping on orders over $150 | Use code WELCOME15 for 15% off
      </div>

      <div className="container-custom">
       <div
  className={cn(
    "flex items-center justify-between transition-all duration-300",
    isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
  )}
>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
  to="/"
  className={cn(
    "font-display font-semibold tracking-tight transition-all duration-300 cursor-pointer",
    isScrolled ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl"
  )}
>
  ÉLÉGANCE
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
  {navItems.map((item) => {
    const itemCategory = new URLSearchParams(item.href.split("?")[1]).get("category");

    const isActive =
      location.pathname === "/products" &&
      activeCategory === itemCategory;

    return (
      <div key={item.label} className="relative">
        <Link
          to={item.href}
          className={cn(
  "relative text-sm font-medium tracking-wide uppercase py-2 transition-colors duration-300",

  isActive
    ? "text-black after:w-full"
    : "text-muted-foreground hover:text-black after:w-0 hover:after:w-full",

  "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all after:duration-300",

  item.label === "Sale" && "text-rose"
)}
        >
          {item.label}
        </Link>
      </div>
    );
  })}
</nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
   {user ? (
  <button
    onClick={() => {
      logout();
      toast.success("Logged out successfully");
    }}
    className="hidden sm:flex items-center gap-2 p-2 hover:bg-secondary rounded-full transition-colors"
    aria-label="Logout"
  >
    <LogOut className="w-5 h-5" />
    <span className="text-sm">Logout</span>
  </button>
) : (
  <Link
    to="/login"
    className="hidden sm:block p-2 hover:bg-secondary rounded-full transition-colors"
    aria-label="Account"
  >
    <User className="w-5 h-5" />
  </Link>
)}

            {/* Wishlist */}
            <button
              onClick={toggleWishlist}
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose text-primary-foreground text-xs flex items-center justify-center rounded-full">
                  {wishlistItems}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        {isAdmin && (
  <div className="text-center py-3 border-t border-border bg-secondary/30">
    <h2 className="text-lg font-semibold tracking-wide">
      Admin Dashboard
    </h2>
  </div>
)}
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border animate-slide-up">
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 input-styled"
                autoFocus
              />
              <button type="submit" className="btn-primary px-6 py-3 text-sm font-medium">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(40px+64px)] bg-background z-40 animate-fade-in overflow-y-auto">
          <nav className="container-custom py-6">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-border">
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block py-4 text-lg font-medium tracking-wide',
                    item.label === 'Sale' && 'text-rose'
                  )}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pb-4">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        to={subitem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 pl-4 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-4 text-lg font-medium tracking-wide border-b border-border"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
