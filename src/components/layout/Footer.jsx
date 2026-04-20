import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Women', href: '/products?category=women' },
    { label: 'Men', href: '/products?category=men' },
    { label: 'Kids', href: '/products?category=kids' },
    { label: 'Accessories', href: '/products?category=accessories' },
    { label: 'Sale', href: '/products?sale=true' },
  ],
  help: [
    { label: 'Customer Service', href: '#' },
    { label: 'Track Order', href: '#' },
    { label: 'Returns & Exchanges', href: '#' },
    { label: 'Shipping Information', href: '#' },
    { label: 'Size Guide', href: '#' },
  ],
  about: [
    { label: 'Our Story', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="container-custom py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl mb-3">Join Our Community</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to receive exclusive offers, early access to new arrivals, and style inspiration.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full input-styled pl-12"
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-3 text-sm font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
              ÉLÉGANCE
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Curated fashion for the modern individual. Timeless elegance meets contemporary style.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium mb-4 uppercase text-sm tracking-wide">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium mb-4 uppercase text-sm tracking-wide">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-medium mb-4 uppercase text-sm tracking-wide">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Élégance. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
