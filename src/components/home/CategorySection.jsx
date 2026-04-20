import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export function CategorySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Explore our curated collections designed for every style and occasion</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/products?category=${category.id}`} className="group relative aspect-[3/4] overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-primary-foreground">
                <h3 className="font-display text-xl lg:text-2xl font-medium mb-2">{category.name}</h3>
                <span className="flex items-center gap-2 text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Shop Now<ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
