import Link from "next/link";
import { ArrowRight, Shield, Zap, Activity } from "lucide-react";
import SiteHeader from "@/components/shared/site-header";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-6 px-4 sm:px-6 lg:px-8 mx-auto w-full">
      <SiteHeader showSearch={false} actionLabel="Go to Dashboard" action={null} />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center py-20 lg:py-32 relative">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)]  text-sm mb-8 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full   opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2  "></span>
          </span>
          Next-Gen Air Quality Monitoring
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight    mb-6 max-w-4xl">
          Breathe Better with <span className="hero-gradient-text">AtmosGrid</span>
        </h1>
        
        <p className="text-lg md:text-xl   max-w-2xl mb-10 leading-relaxed">
          Production-ready IoT platform for hyper-local urban air quality tracking, 
          device management, and real-time public health advisories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full   px-8 py-4 text-base font-semibold text-white bg-blue-500 transition-all hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Open Dashboard
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link 
            href="/features"
            className="inline-flex items-center justify-center gap-2 rounded-full border   px-8 py-4 text-base font-semibold   transition-all"
          >
            Explore Features
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full max-w-5xl">
          <div className="glass-panel p-8 rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-[rgba(59,130,246,0.1)] flex items-center justify-center mb-6  ">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold    mb-3">Real-time Analytics</h3>
            <p className=" ">Monitor PM2.5, CO, and NO2 levels with millisecond precision across your entire city grid.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center mb-6 text-[#8b5cf6]">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold    mb-3">Smart Advisories</h3>
            <p className=" ">Automated health alerts and actionable tips when pollution levels exceed safety limits.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl">
            <div className="h-12 w-12 rounded-2xl bg-[rgba(16,185,129,0.1)] flex items-center justify-center mb-6 text-[#10b981]">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold    mb-3">Device Control</h3>
            <p className=" ">Remotely toggle urban purifiers and environmental endpoints directly from the dashboard.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
