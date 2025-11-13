import { Thermometer, Bot, ShoppingBag, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Thermometer,
    title: 'Real-time Greenhouse Monitoring',
    description: 'Track temperature, humidity, and light intensity with IoT sensors in real-time.',
  },
  {
    icon: Bot,
    title: 'Autonomous Harvesting Robot',
    description: 'Automated vegetable harvesting with precision robotics and AI vision.',
  },
  {
    icon: ShoppingBag,
    title: 'Smart Farming Marketplace',
    description: 'Browse and purchase cutting-edge farming tools and equipment.',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with farmers and technicians to share knowledge and experiences.',
  },
];

export function KeyFeatures() {
  return (
    <section id="features" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#1B5E20] mb-4" style={{ fontSize: '42px', fontWeight: 700 }}>
            Key Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover how SAVI revolutionizes modern agriculture with integrated technology solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#1B5E20] flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
