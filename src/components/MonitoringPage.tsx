import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Activity,
  Cpu,
  Battery,
  Zap,
  Leaf,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
} from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: any;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
  location: string;
}

export function MonitoringPage() {
  const [sensorData, setSensorData] = useState<SensorData[]>([
    {
      id: '1',
      name: 'Temperature',
      value: 26.5,
      unit: '°C',
      status: 'normal',
      icon: Thermometer,
      trend: 'up',
      lastUpdate: '2 min ago',
      location: 'Greenhouse A',
    },
    {
      id: '2',
      name: 'Humidity',
      value: 68,
      unit: '%',
      status: 'normal',
      icon: Droplets,
      trend: 'stable',
      lastUpdate: '2 min ago',
      location: 'Greenhouse A',
    },
    {
      id: '3',
      name: 'Soil Moisture',
      value: 45,
      unit: '%',
      status: 'warning',
      icon: Droplets,
      trend: 'down',
      lastUpdate: '3 min ago',
      location: 'Field B',
    },
    {
      id: '4',
      name: 'Light Intensity',
      value: 8500,
      unit: 'lux',
      status: 'normal',
      icon: Sun,
      trend: 'up',
      lastUpdate: '1 min ago',
      location: 'Greenhouse A',
    },
    {
      id: '5',
      name: 'Air Quality',
      value: 92,
      unit: 'AQI',
      status: 'normal',
      icon: Wind,
      trend: 'stable',
      lastUpdate: '2 min ago',
      location: 'Greenhouse B',
    },
    {
      id: '6',
      name: 'pH Level',
      value: 6.8,
      unit: 'pH',
      status: 'normal',
      icon: Activity,
      trend: 'stable',
      lastUpdate: '5 min ago',
      location: 'Hydroponic Tank 1',
    },
    {
      id: '7',
      name: 'CO2 Level',
      value: 420,
      unit: 'ppm',
      status: 'normal',
      icon: Wind,
      trend: 'up',
      lastUpdate: '3 min ago',
      location: 'Greenhouse A',
    },
    {
      id: '8',
      name: 'Water Level',
      value: 78,
      unit: '%',
      status: 'normal',
      icon: Droplets,
      trend: 'down',
      lastUpdate: '4 min ago',
      location: 'Main Tank',
    },
  ]);

  const [robotStatus, setRobotStatus] = useState([
    {
      id: 'R001',
      name: 'Harvesting Robot #1',
      status: 'active',
      battery: 85,
      task: 'Harvesting tomatoes - Row 3',
      location: 'Greenhouse A',
      efficiency: 94,
    },
    {
      id: 'R002',
      name: 'Harvesting Robot #2',
      status: 'charging',
      battery: 45,
      task: 'Charging at station',
      location: 'Charging Station B',
      efficiency: 88,
    },
    {
      id: 'R003',
      name: 'Monitoring Drone',
      status: 'active',
      battery: 72,
      task: 'Aerial survey - Field B',
      location: 'Field B',
      efficiency: 96,
    },
    {
      id: 'R004',
      name: 'Irrigation Robot',
      status: 'maintenance',
      battery: 100,
      task: 'Scheduled maintenance',
      location: 'Workshop',
      efficiency: 0,
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: sensor.value + (Math.random() - 0.5) * 2,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRobotStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'charging':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>
            Monitoring Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time monitoring of greenhouse sensors and autonomous robots
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">Normal</Badge>
            </div>
            <p className="text-gray-500 text-sm mb-1">Active Sensors</p>
            <p className="text-gray-900" style={{ fontSize: '32px', fontWeight: 700 }}>
              {sensorData.filter((s) => s.status === 'normal').length}/{sensorData.length}
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Active</Badge>
            </div>
            <p className="text-gray-500 text-sm mb-1">Robots Online</p>
            <p className="text-gray-900" style={{ fontSize: '32px', fontWeight: 700 }}>
              {robotStatus.filter((r) => r.status === 'active').length}/{robotStatus.length}
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Warning</Badge>
            </div>
            <p className="text-gray-500 text-sm mb-1">Alerts</p>
            <p className="text-gray-900" style={{ fontSize: '32px', fontWeight: 700 }}>
              {sensorData.filter((s) => s.status === 'warning').length}
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">Efficiency</Badge>
            </div>
            <p className="text-gray-500 text-sm mb-1">Avg. Efficiency</p>
            <p className="text-gray-900" style={{ fontSize: '32px', fontWeight: 700 }}>
              {Math.round(robotStatus.reduce((acc, r) => acc + r.efficiency, 0) / robotStatus.length)}%
            </p>
          </Card>
        </div>

        {/* Sensor Data Grid */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-6" style={{ fontSize: '28px', fontWeight: 600 }}>
            Environmental Sensors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sensorData.map((sensor) => {
              const Icon = sensor.icon;
              return (
                <Card
                  key={sensor.id}
                  className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <Badge className={`${getStatusColor(sensor.status)} border`}>
                      {sensor.status}
                    </Badge>
                  </div>

                  <p className="text-gray-500 text-sm mb-1">{sensor.name}</p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="text-gray-900" style={{ fontSize: '32px', fontWeight: 700 }}>
                      {sensor.value.toFixed(1)}
                    </p>
                    <p className="text-gray-600">{sensor.unit}</p>
                    {getTrendIcon(sensor.trend)}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3" />
                    {sensor.location}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {sensor.lastUpdate}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Robot Status */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-6" style={{ fontSize: '28px', fontWeight: 600 }}>
            Autonomous Robots
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {robotStatus.map((robot) => (
              <Card
                key={robot.id}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg border-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center">
                        <Cpu className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900" style={{ fontWeight: 600 }}>
                          {robot.name}
                        </p>
                        <p className="text-gray-500 text-sm">ID: {robot.id}</p>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getRobotStatusColor(robot.status)} border`}>
                    {robot.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Battery */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Battery className="h-4 w-4" />
                        Battery Level
                      </div>
                      <span className="text-sm" style={{ fontWeight: 600 }}>
                        {robot.battery}%
                      </span>
                    </div>
                    <Progress value={robot.battery} className="h-2" />
                  </div>

                  {/* Efficiency */}
                  {robot.efficiency > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="h-4 w-4" />
                          Efficiency
                        </div>
                        <span className="text-sm" style={{ fontWeight: 600 }}>
                          {robot.efficiency}%
                        </span>
                      </div>
                      <Progress value={robot.efficiency} className="h-2" />
                    </div>
                  )}

                  {/* Current Task */}
                  <div className="p-4 bg-[#F5F5F5] rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Current Task</p>
                    <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                      {robot.task}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {robot.location}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
