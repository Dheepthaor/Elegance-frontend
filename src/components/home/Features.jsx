import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $150' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy' },
  { icon: Shield, title: 'Secure Payment', description: 'SSL encrypted checkout' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated customer care' },
];

export function Features() {
  return (
    <section className="border-y border-border">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-secondary rounded-full">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
