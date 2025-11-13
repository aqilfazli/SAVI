import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onNavigateToMonitoring?: () => void;
  onNavigateToProducts?: () => void;
}

export function HeroSection({ onNavigateToMonitoring, onNavigateToProducts }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1620052736792-ac388531ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncmVlbmhvdXNlJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjIyMzgyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern greenhouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-white mb-6" style={{ fontSize: '56px', fontWeight: 700, lineHeight: 1.1 }}>
            Empowering Smart Farming with Autonomous Technology
          </h1>
          <p className="text-white/90 mb-8 text-xl">
            Monitor, manage, and automate your vegetable farming with SAVI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#4CAF50] hover:bg-[#45a049] text-lg px-8 py-6 rounded-2xl"
              onClick={onNavigateToMonitoring}
            >
              View Monitoring Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1B5E20] text-lg px-8 py-6 rounded-2xl"
              onClick={onNavigateToProducts}
            >
              Explore Products
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}
