import SiteHeader from "@/components/shared/site-header";
import Footer from "@/components/shared/footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col pt-6 px-4 sm:px-6 lg:px-8   mx-auto w-full">
      <SiteHeader activeItem="Pricing" showSearch={false} />
      
      <main className="flex-1 py-20 lg:py-32 flex flex-col items-center">
        <div className="text-center max-w-7xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight    mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg  ">
            Deploy AtmosGrid for a single building, or scale out to an entire metropolitan network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="glass-panel p-8 rounded-[32px] flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Starter Node</h3>
            <div className="text-4xl font-bold mb-6">$49<span className="text-sm font-normal  ">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1  ">
              <li>1 IoT Sensor Node</li>
              <li>Realtime Dashboard</li>
              <li>24 Hour Data Retention</li>
            </ul>
            <button className="w-full py-3 rounded-full border   hover:bg-[var(--surface-soft)] font-medium transition">Get Started</button>
          </div>

          <div className="glass-panel p-8 rounded-[32px] border-[var(--ring)] relative flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2   text-white px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>
            <h3 className="text-xl font-semibold mb-2  ">City Grid</h3>
            <div className="text-4xl font-bold mb-6">$299<span className="text-sm font-normal  ">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1  ">
              <li>Up to 25 Nodes</li>
              <li>Realtime Dashboard + API</li>
              <li>30 Day Data Retention</li>
              <li>Automated Alerts</li>
            </ul>
            <button className="w-full py-3 rounded-full   text-white hover:bg-blue-600 font-medium transition shadow-[0_0_15px_rgba(59,130,246,0.3)]">Deploy Network</button>
          </div>

          <div className="glass-panel p-8 rounded-[32px] flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-6">Custom</div>
            <ul className="space-y-4 mb-8 flex-1  ">
              <li>Unlimited Nodes</li>
              <li>SSO & RBAC Settings</li>
              <li>Infinite Data Retention</li>
              <li>Custom SLAs &support </li>
            </ul>
            <button className="w-full py-3 rounded-full border   hover:bg-[var(--surface-soft)] font-medium transition">Contact Sales</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
