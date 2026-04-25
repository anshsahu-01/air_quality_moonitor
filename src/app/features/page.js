import SiteHeader from "@/components/shared/site-header";
import Footer from "@/components/shared/footer";
import { Activity, Zap, Shield, Globe } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col pt-6 px-4 sm:px-6 lg:px-8   mx-auto w-full">
      <SiteHeader activeItem="Features" showSearch={false} />
      
      <main className="flex-1 py-20 lg:py-32">
        <div className="text-center max-w-7xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight    mb-6">
            Everything You Need for <span className="hero-gradient-text">Urban Air Quality</span>
          </h1>
          <p className="text-lg  ">
            AtmosGrid offers a complete suite of tools to monitor emissions, trigger smart purifiers, and keep the public informed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-panel p-8 rounded-[32px]">
            <Activity className="h-8 w-8   mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Hyper-Local Analytics</h3>
            <p className=" ">
              Sensor data ingested with microsecond precision. Monitor PM2.5, NO2, and CO levels across dozens of physical nodes.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-[32px]">
            <Zap className="h-8 w-8 text-[#f59e0b] mb-6" />
            <h3 className="text-2xl font-semibold mb-3">IoT Integration</h3>
            <p className=" ">
              Remotely toggle environmental endpoints and smart purifiers based on conditional logic right from the dashboard.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-[32px]">
            <Shield className="h-8 w-8 text-[#10b981] mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Public Health Advisories</h3>
            <p className=" ">
              Automatically issue health alerts, dynamic warnings, and mask-advisories when thresholds are breached.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-[32px]">
            <Globe className="h-8 w-8 text-[#8b5cf6] mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Geospatial Mapping</h3>
            <p className=" ">
              Live interactive maps built on Leaflet to visualize AQI patterns and track emission clouds dynamically.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
