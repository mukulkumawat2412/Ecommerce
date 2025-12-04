import React from "react";
import AboutUsimage from '../../public/aboutUsImage.jpg'

const AboutUsPage = () => {
  return (
  <section className="bg-gray-50 text-gray-800">
    {/* Hero Section */}
    <div className="relative bg-gradient-to-r from-violet-500 to-violet-600 text-white py-16 sm:py-20 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        About Us
      </h1>
      <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 sm:px-0">
        Building trust through quality, innovation, and customer satisfaction.
      </p>
    </div>

    {/* Content Section */}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
      {/* Left Side Image */}
      <div>
        <img
          src={AboutUsimage}
          alt="About Us"
          className="rounded-2xl shadow-lg w-full h-auto object-cover"
        />
      </div>

      {/* Right Side Content */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 text-gray-900">
          Who We Are
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          We are a passionate team dedicated to delivering the best online shopping
          experience. Our goal is to bring you high-quality products with exceptional
          service. Every item we offer is carefully curated to ensure customer
          satisfaction and trust.
        </p>
        <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 text-gray-900">
          Our Mission
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          To empower our customers by providing reliable, affordable, and trend-setting
          products that enhance everyday living.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition duration-300">
          Shop Now
        </button>
      </div>
    </div>

    {/* Team Section */}
    <div className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-10 text-gray-900">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
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
                className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                {member.name}
              </h4>
              <p className="text-gray-500 text-sm sm:text-base">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer Quote */}
    <div className="bg-gray-100 py-10 text-center px-4 sm:px-6">
      <p className="text-gray-600 italic text-sm sm:text-base max-w-3xl mx-auto">
        “Our success is built on your trust — every product, every service, every smile.”
      </p>
    </div>
  </section>
);

};

export default AboutUsPage;
