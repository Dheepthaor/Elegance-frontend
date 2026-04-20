import { Link } from 'react-router-dom';

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-6">
          <Link to="/products?sale=true" className="group relative aspect-[4/5] lg:aspect-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" alt="End of Season Sale" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-foreground/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-primary-foreground">
              <span className="text-sm uppercase tracking-widest mb-4">Limited Time</span>
              <h3 className="font-display text-4xl lg:text-5xl font-semibold mb-4">End of Season<br />Sale</h3>
              <p className="mb-6 max-w-xs">Up to 50% off on selected items</p>
              <span className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground px-8 py-3 text-sm font-medium">Shop Sale</span>
            </div>
          </Link>
          <div className="grid gap-6">
            <Link to="/products?category=accessories" className="group relative aspect-[16/9] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80" alt="Accessories" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/20" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-primary-foreground">
                <span className="text-sm uppercase tracking-widest mb-2">New Arrivals</span>
                <h3 className="font-display text-2xl lg:text-3xl font-medium mb-4">Accessories</h3>
                <span className="link-underline text-sm after:bg-primary-foreground">Shop Now</span>
              </div>
            </Link>
            <Link to="/products?new=true" className="group relative aspect-[16/9] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="New In" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/20" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-primary-foreground">
                <span className="text-sm uppercase tracking-widest mb-2">Just Landed</span>
                <h3 className="font-display text-2xl lg:text-3xl font-medium mb-4">Spring Essentials</h3>
                <span className="link-underline text-sm after:bg-primary-foreground">Discover More</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
