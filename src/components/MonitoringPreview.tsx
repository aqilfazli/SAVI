import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Thermometer, Droplets, Sun, Wind } from 'lucide-react';

export function MonitoringPreview() {
  const [metrics, setMetrics] = useState({
    temperature: 24,
    humidity: 65,
    light: 850,
    airflow: 2.3,
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        temperature: 24 + Math.random() * 2 - 1,
        humidity: 65 + Math.random() * 5 - 2.5,
        light: 850 + Math.random() * 100 - 50,
        airflow: 2.3 + Math.random() * 0.4 - 0.2,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metricsData = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${metrics.temperature.toFixed(1)}°C`,
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${metrics.humidity.toFixed(1)}%`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sun,
      label: 'Light Intensity',
      value: `${metrics.light.toFixed(0)} lux`,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Wind,
      label: 'Airflow',
      value: `${metrics.airflow.toFixed(1)} m/s`,
      color: 'from-teal-500 to-emerald-500',
    },
  ];

  return (
    <section id="monitoring" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#1B5E20] mb-4" style={{ fontSize: '42px', fontWeight: 700 }}>
            Live Monitoring Dashboard
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real-time insights from your greenhouse environment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metricsData.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card
                key={index}
                className="p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg border-0 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse"></span>
                </div>
                <p className="text-gray-600 mb-2">{metric.label}</p>
                <p className="text-gray-900" style={{ fontSize: '28px', fontWeight: 700 }}>
                  {metric.value}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-white mb-4" style={{ fontSize: '28px', fontWeight: 600 }}>
            Want to see more detailed analytics?
          </h3>
          <p className="text-white/90 mb-6 text-lg">
            Access historical data, predictive insights, and control your greenhouse remotely
          </p>
          <Button
            size="lg"
            className="bg-white text-[#1B5E20] hover:bg-gray-100 px-8 py-6 rounded-2xl"
          >
            Open Full Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
