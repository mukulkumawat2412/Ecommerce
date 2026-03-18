import React from "react";

const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "food", label: "Foods" },
  { id: "sports", label: "Sports" },
];

export default function HeroSectionMinimal({ onCategoryClick = () => {} }) {
 return (
  <section className="bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
            Shop smart. Shop simple.
          </h1>

          <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto lg:mx-0">
            Electronics, clothing, food & sports — curated picks with easy returns and fast delivery.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => onCategoryClick(c.id)}
                className="px-4 py-2 border rounded-full cursor-pointer text-sm text-slate-700 border-slate-200 transition hover:bg-violet-500 hover:text-white"
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button className="px-5 py-2.5 border font-semibold cursor-pointer hover:bg-violet-500 border-slate-800 text-slate-800 text-sm rounded-md transition hover:text-white">
              Browse all products
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end mt-6 lg:mt-10">
          <img
            src="https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?w=600&auto=format&fit=crop&q=60"
            alt="products"
            className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-sm object-cover opacity-95"
          />
        </div>

      </div>
    </div>
  </section>
);

}
