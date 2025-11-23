import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Star,
  Package,
  Truck,
  Shield,
  Leaf,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  features: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

export function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 'P001',
      name: 'Smart IoT Sensor Kit',
      price: 4500000,
      description: 'Comprehensive IoT sensor kit for monitoring temperature, humidity, soil moisture, and light intensity in real-time.',
      category: 'Sensors',
      rating: 4.8,
      reviews: 124,
      stock: 45,
      image: '🌡️',
      features: [
        'Temperature & Humidity Sensor',
        'Soil Moisture Sensor',
        'Light Intensity Sensor',
        'Wireless Connectivity',
        '6-month Battery Life',
        'Cloud Dashboard Access',
      ],
    },
    {
      id: 'P002',
      name: 'Hydroponic Growing System',
      price: 19500000,
      description: 'Complete hydroponic system for efficient vegetable cultivation with automated nutrient delivery and pH control.',
      category: 'Systems',
      rating: 4.9,
      reviews: 87,
      stock: 12,
      image: '🌱',
      features: [
        'Automated Nutrient Delivery',
        'pH Level Control',
        '12 Plant Capacity',
        'LED Grow Lights',
        'Water Circulation System',
        'Mobile App Control',
      ],
    },
    {
      id: 'P003',
      name: 'Automated Irrigation System',
      price: 13500000,
      description: 'Smart irrigation system with soil moisture sensors and automatic watering schedules for optimal water management.',
      category: 'Irrigation',
      rating: 4.7,
      reviews: 156,
      stock: 28,
      image: '💧',
      features: [
        'Soil Moisture Sensors',
        'Programmable Schedule',
        'Weather Integration',
        'Water Flow Monitoring',
        'Drip & Sprinkler Support',
        'Mobile Control',
      ],
    },
    {
      id: 'P004',
      name: 'Climate Controller Pro',
      price: 8900000,
      description: 'Advanced climate control system for greenhouse temperature, humidity, and ventilation management.',
      category: 'Climate Control',
      rating: 4.6,
      reviews: 93,
      stock: 34,
      image: '🌡️',
      features: [
        'Temperature Control',
        'Humidity Regulation',
        'Automated Ventilation',
        'Multi-zone Support',
        'Remote Monitoring',
        'Energy Efficient',
      ],
    },
    {
      id: 'P005',
      name: 'LED Grow Light Panel',
      price: 3200000,
      description: 'Full-spectrum LED grow light panel optimized for vegetable growth with adjustable intensity.',
      category: 'Lighting',
      rating: 4.5,
      reviews: 201,
      stock: 67,
      image: '💡',
      features: [
        'Full Spectrum LED',
        'Adjustable Intensity',
        'Energy Efficient',
        '50,000 Hour Lifespan',
        'Low Heat Output',
        'Easy Installation',
      ],
    },
    {
      id: 'P006',
      name: 'Greenhouse Automation Kit',
      price: 25000000,
      description: 'Complete greenhouse automation solution with sensors, controllers, and mobile app for total control.',
      category: 'Systems',
      rating: 5.0,
      reviews: 45,
      stock: 8,
      image: '🏡',
      features: [
        'All-in-One Solution',
        'Multiple Sensors Included',
        'Climate Control',
        'Irrigation Management',
        'AI-Powered Optimization',
        'Professional Support',
      ],
    },
    {
      id: 'P007',
      name: 'Soil Testing Kit',
      price: 1200000,
      description: 'Professional soil testing kit for measuring pH, NPK levels, and other essential nutrients.',
      category: 'Testing',
      rating: 4.4,
      reviews: 178,
      stock: 120,
      image: '🧪',
      features: [
        'pH Measurement',
        'NPK Level Testing',
        'Quick Results',
        'Portable Design',
        '100 Tests Included',
        'Easy to Use',
      ],
    },
    {
      id: 'P008',
      name: 'Smart Weather Station',
      price: 5500000,
      description: 'Professional weather station with wireless sensors for monitoring local weather conditions.',
      category: 'Sensors',
      rating: 4.7,
      reviews: 112,
      stock: 23,
      image: '🌤️',
      features: [
        'Temperature & Humidity',
        'Wind Speed & Direction',
        'Rainfall Measurement',
        'UV Index Monitoring',
        'Wireless Connectivity',
        'Historical Data Logging',
      ],
    },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error('Stock limit reached');
        return;
      }
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success('Quantity updated in cart');
    } else {
      setCart([...cart, { product, quantity: 1 }]);
      toast.success('Added to cart');
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) return null;
            if (newQuantity > item.product.stock) {
              toast.error('Stock limit reached');
              return item;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
    toast.success('Removed from cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E8F5E9] to-[#C8E6C9] pt-20 pb-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-40 left-10">
          <Leaf className="h-32 w-32 text-[#2E7D32] transform -rotate-12" />
        </div>
        <div className="absolute bottom-40 right-10">
          <Leaf className="h-40 w-40 text-[#2E7D32] transform rotate-45" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Cart */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>
              Smart Farming Products
            </h1>
            <p className="text-gray-600 text-lg">
              Premium agriculture technology and equipment
            </p>
          </div>

          {/* Shopping Cart Button */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                className="relative bg-[#2E7D32] hover:bg-[#1B5E20] rounded-2xl h-14 px-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                      {cart.map((item) => (
                        <Card key={item.product.id} className="p-4 rounded-2xl">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-xl flex items-center justify-center text-3xl">
                              {item.product.image}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm mb-1" style={{ fontWeight: 600 }}>
                                {item.product.name}
                              </p>
                              <p className="text-sm text-[#2E7D32] mb-2" style={{ fontWeight: 600 }}>
                                {formatPrice(item.product.price)}
                              </p>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0 rounded-lg"
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-sm w-8 text-center" style={{ fontWeight: 600 }}>
                                  {item.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0 rounded-lg"
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span style={{ fontWeight: 600 }}>{formatPrice(getTotalPrice())}</span>
                      </div>
                      <Button
                        className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl h-12"
                        onClick={() => {
                          toast.success('Proceeding to checkout...');
                          setIsCartOpen(false);
                        }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all group"
            >
              {/* Product Image/Icon */}
              <div className="w-full h-40 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-2xl flex items-center justify-center mb-4 text-6xl group-hover:scale-105 transition-transform">
                {product.image}
              </div>

              {/* Category Badge */}
              <Badge className="mb-3 bg-[#E8F5E9] text-[#2E7D32] border-[#4CAF50]/20">
                {product.category}
              </Badge>

              {/* Product Name */}
              <h3 className="text-gray-900 mb-2 line-clamp-2" style={{ fontWeight: 600 }}>
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm" style={{ fontWeight: 600 }}>
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              {/* Price */}
              <p className="text-[#2E7D32] mb-4" style={{ fontSize: '24px', fontWeight: 700 }}>
                {formatPrice(product.price)}
              </p>

              {/* Stock */}
              <p className="text-sm text-gray-500 mb-4">
                Stock: <span style={{ fontWeight: 600 }}>{product.stock} units</span>
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]"
                  onClick={() => handleViewDetails(product)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2" style={{ fontWeight: 600 }}>Free Shipping</h3>
            <p className="text-sm text-gray-600">Free delivery for orders above Rp 5.000.000</p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2" style={{ fontWeight: 600 }}>Warranty</h3>
            <p className="text-sm text-gray-600">2-year warranty on all products</p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2" style={{ fontWeight: 600 }}>Easy Returns</h3>
            <p className="text-sm text-gray-600">30-day return policy on all items</p>
          </Card>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="w-full h-48 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-2xl flex items-center justify-center text-8xl mb-4">
                  {selectedProduct.image}
                </div>
                <DialogTitle className="text-[#1B5E20]" style={{ fontSize: '28px', fontWeight: 700 }}>
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription>
                  <Badge className="bg-[#E8F5E9] text-[#2E7D32] border-[#4CAF50]/20">
                    {selectedProduct.category}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Rating & Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span style={{ fontWeight: 600 }}>
                      {selectedProduct.rating}
                    </span>
                    <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                  </div>
                  <p className="text-[#2E7D32]" style={{ fontSize: '28px', fontWeight: 700 }}>
                    {formatPrice(selectedProduct.price)}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="mb-2" style={{ fontWeight: 600 }}>Description</h4>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="mb-3" style={{ fontWeight: 600 }}>Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock */}
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <p className="text-sm text-gray-600">
                    Available Stock: <span style={{ fontWeight: 600 }}>{selectedProduct.stock} units</span>
                  </p>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl h-12"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setIsDetailOpen(false);
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
