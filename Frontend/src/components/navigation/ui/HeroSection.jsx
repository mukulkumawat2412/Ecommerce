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
          {/* Left: text + categories */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
              Shop smart. Shop simple.
            </h1>
            <p className="mt-4 text-base text-slate-600 max-w-xl">
              Electronics, clothing, food & sports — curated picks with easy returns and fast delivery.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className="px-4 py-2 border rounded-full text-sm text-slate-700 border-slate-200 hover:bg-slate-50 transition"
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button className="px-5 py-2.5 border border-slate-800 text-slate-800 text-sm rounded-md hover:bg-slate-50 transition">
                Browse all products
              </button>
            </div>
          </div>

          {/* Right: subtle image */}
          <div className="flex justify-center lg:justify-end">
            <img
            
              alt="products"
              className="w-full max-w-sm rounded-lg shadow-sm object-cover opacity-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
