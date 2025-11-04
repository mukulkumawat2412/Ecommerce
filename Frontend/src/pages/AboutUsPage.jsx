import React from "react";

const AboutUsPage = () => {
  return (
    <section className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-violet-500 to-violet-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Building trust through quality, innovation, and customer satisfaction.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1556742400-b5b7c5121f5e?auto=format&fit=crop&w=800&q=80"
            alt="About Us"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We are a passionate team dedicated to delivering the best online shopping
            experience. Our goal is to bring you high-quality products with exceptional
            service. Every item we offer is carefully curated to ensure customer
            satisfaction and trust.
          </p>
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
            Our Mission
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            To empower our customers by providing reliable, affordable, and trend-setting
            products that enhance everyday living.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                name: "Mukul Kumawat",
                role: "Founder & CEO",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Aarav Sharma",
                role: "Marketing Head",
                img: "https://randomuser.me/api/portraits/men/41.jpg",
              },
              {
                name: "Priya Singh",
                role: "Design Lead",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-xl transition duration-300"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="bg-gray-100 py-10 text-center">
        <p className="text-gray-600 italic max-w-3xl mx-auto">
          “Our success is built on your trust — every product, every service, every smile.”
        </p>
      </div>
    </section>
  );
};

export default AboutUsPage;
