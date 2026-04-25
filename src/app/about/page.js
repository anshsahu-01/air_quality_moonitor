import SiteHeader from "@/components/shared/site-header";
import Footer from "@/components/shared/footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col pt-6 px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto w-full">
      <SiteHeader activeItem="About" showSearch={false} />

      <main className="flex-1">

        <section className="pt-20 pb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold  mb-6">
            Building the Future of <span className="hero-gradient-text">Clean Air</span>
          </h1>
          <p className="text-lg  max-w-3xl mx-auto">
            AtmosGrid is a smart air quality monitoring network that provides real-time, hyperlocal insights using IoT sensors and predictive analytics.
          </p>
        </section>

        <section className="py-10 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold  mb-6">
            Our Mission
          </h2>
          <p className=" mb-4">
            Our goal is to democratize air quality data and make it accessible at a hyperlocal level — not just city-wide averages.
          </p>
          <p className="">
            We combine low-cost IoT sensors, real-time data processing, and predictive models to help people make informed decisions about their environment.
          </p>
        </section>

        <section className="py-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-Time Monitoring",
                desc: "Live AQI updates using distributed sensor networks."
              },
              {
                title: "Hyperlocal Data",
                desc: "Street-level air quality insights, not just city averages."
              },
              {
                title: "Smart Alerts",
                desc: "Get notified when pollution levels rise."
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold  mb-2">
                  {item.title}
                </h3>
                <p className="">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "50+", label: "Sensors Deployed" },
              { number: "10+", label: "Cities Covered" },
              { number: "1M+", label: "Data Points" },
              { number: "24/7", label: "Monitoring" }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-blue-400">
                  {stat.number}
                </h3>
                <p className="">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold  mb-6">
            About the Project
          </h2>
          <p className=" mb-4">
            This project was developed as part of a hackathon to address the lack of hyperlocal air quality monitoring systems.
          </p>
          <p className="">
            Our solution creates a distributed network of sensors combined with a modern web dashboard to visualize, predict, and alert users about air pollution in real-time.
          </p>
        </section>

        <section className="py-10 text-center">
          <h2 className="text-3xl font-semibold  mb-4">
            Join the Clean Air Movement 🌱
          </h2>
          <p className=" mb-6">
            Stay informed. Stay safe. Make smarter decisions with AtmosGrid.
          </p>
          <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg font-semibold">
            Explore Dashboard
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}