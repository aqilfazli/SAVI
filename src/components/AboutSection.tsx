import { ImageWithFallback } from './figma/ImageWithFallback';
import { Cpu, Database, Leaf, Zap } from 'lucide-react';

const technologies = [
  { icon: Leaf, label: 'IoT Sensors' },
  { icon: Cpu, label: 'AI & Robotics' },
  { icon: Database, label: 'Data Analytics' },
  { icon: Zap, label: 'Automation' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1690986469727-1ed8bcdf6384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwdG9vbHMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYyMTQ1NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="SAVI system"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[#1B5E20] mb-6" style={{ fontSize: '42px', fontWeight: 700 }}>
              About SAVI
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              <span style={{ fontWeight: 600 }}>SAVI (Smart Autonomous Vegetable Integrator)</span> is a revolutionary 
              smart farming innovation that seamlessly combines IoT sensor technology, advanced robotics, and 
              powerful data analytics to transform modern agriculture.
            </p>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Our integrated platform empowers farmers to monitor greenhouse conditions in real-time, automate 
              harvesting processes with precision robotics, and make data-driven decisions that increase yield 
              while reducing resource consumption. SAVI represents the future of sustainable and efficient farming.
            </p>

            {/* Technology Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#1B5E20] flex items-center justify-center mb-2">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm text-center">{tech.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-[#4CAF50]" style={{ fontSize: '32px', fontWeight: 700 }}>
                  10K+
                </p>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-[#4CAF50]" style={{ fontSize: '32px', fontWeight: 700 }}>
                  500+
                </p>
                <p className="text-gray-600">Greenhouses</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-[#4CAF50]" style={{ fontSize: '32px', fontWeight: 700 }}>
                  95%
                </p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
