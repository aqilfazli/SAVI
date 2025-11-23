import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: 'Smart IoT Sensor Kit',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1632173068638-f9f51ab5ddf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBzZW5zb3J8ZW58MXx8fHwxNzYyMjM4MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Complete sensor package for monitoring',
  },
  {
    id: 2,
    name: 'Automated Irrigation System',
    price: '$899',
    image: 'https://images.unsplash.com/photo-1758524057756-7dc8ce53d88c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwYXV0b21hdGlvbnxlbnwxfHx8fDE3NjIyMzgyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Smart watering with precision control',
  },
  {
    id: 3,
    name: 'Hydroponic Growing System',
    price: '$1,299',
    image: 'https://images.unsplash.com/photo-1601125791528-ecf29ca06f6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb3BvbmljJTIwc3lzdGVtfGVufDF8fHx8MTc2MjIyMDgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Advanced soil-free farming solution',
  },
  {
    id: 4,
    name: 'SAVI Robot Harvesting Arm',
    price: '$4,999',
    image: 'https://images.unsplash.com/photo-1722119272044-fc49006131e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MjE2ODQ5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Autonomous harvesting technology',
  },
];

export function ProductShowcase() {
  return (
    <section id="products" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#1B5E20] mb-4" style={{ fontSize: '42px', fontWeight: 700 }}>
            Our Smart Farming Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Premium tools and equipment designed for modern agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#4CAF50]" style={{ fontSize: '24px', fontWeight: 700 }}>
                    {product.price}
                  </span>
                  <Button
                    variant="outline"
                    className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-xl"
                  >
                    View Detail
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-[#4CAF50] hover:bg-[#45a049] px-8 py-6 rounded-2xl">
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
