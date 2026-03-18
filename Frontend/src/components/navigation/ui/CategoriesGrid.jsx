import React from "react";

const categories = [
  {
    id: "electronics",
    label: "Electronics",
    img: "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/p/a/i/-original-imahfvuagzmf2ppf.jpeg?q=60",
  },
  {
    id: "clothing",
    label: "Clothing",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-t-shirt/e/u/u/2-3-years-kd-708-because-navy-24-atlans-clothes-original-imahdt8acuqfpgfy.jpeg?q=70",
  },
  {
    id: "food",
    label: "Foods",
    img: "https://rukminim1.flixcart.com/image/240/240/k6fd47k0/nut-dry-fruit/p/z/7/200-100-natural-california-pouch-happilo-original-imafzvw2tcazeur6.jpeg?q=60",
  },
  {
    id: "books",
    label: "Books",
    img: "https://rukminim2.flixcart.com/image/612/612/kynb6vk0/regionalbooks/i/u/j/mindset-deep-work-set-of-two-original-imagatbmangddjzm.jpeg?q=70",
  },
];

const CategoriesGrid = () => {
return (
  <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
    <div className="max-w-7xl mx-auto">

      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            {/* Image */}
            <img
              src={cat.img}
              alt={cat.label}
              className="w-full h-36 sm:h-44 md:h-48 object-contain bg-white"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center">
              <h3 className="text-white text-sm sm:text-lg font-semibold mb-3">
                {cat.label}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

};

export default CategoriesGrid;
