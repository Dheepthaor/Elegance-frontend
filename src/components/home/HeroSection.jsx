import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
          alt="Fashion Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-xl">
          <span className="inline-block text-primary-foreground text-sm uppercase tracking-widest mb-4 animate-fade-in">
            New Collection 2024
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground mb-6 leading-tight">
            Discover Your
            <br />
            Signature Style
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-md">
            Explore our curated collection of timeless pieces designed for the modern wardrobe.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products?category=women"
              className="btn-primary px-8 py-4 text-sm font-medium inline-flex items-center gap-2"
            >
              Shop Women
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?category=men"
              className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground px-8 py-4 text-sm font-medium"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
