import React from "react";


const categories = [
  { id: "electronics", label: "Electronics", img: "/images/electronics.jpg" },
  { id: "clothing", label: "Clothing", img: "/images/clothing.jpg" },
  { id: "food", label: "Foods", img: "/images/food.jpg" },
  { id: "books", label: "Books", img: "/images/books.jpg" },
];

const CategoriesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.label}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gray-300 bg-opacity-30 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">{cat.label}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
