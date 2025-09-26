import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/slices/categorySlice.jsx";
import { PaginationProducts } from "../redux/slices/productSlice.jsx";
import CategoriesDropdown from "../components/navigation/CategoriesDropdown.jsx";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const [page, setPage] = useState(1); // local page state
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("latest");

  // Fetch categories
  useEffect(() => {
    dispatch(getCategories()).unwrap().catch(console.log);
  }, [dispatch]);

  // Fetch products whenever page/category/sort changes
  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory, selectedSort]);

  const fetchProducts = async () => {
    try {
      const res = await dispatch(
        PaginationProducts({
          page,
          limit: 2,
          category: selectedCategory,
          sort: selectedSort,
        })
      ).unwrap();

      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const getPageNumbers = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Filter + Sort */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shop Products</h2>

    <CategoriesDropdown/>
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1); // reset to first page on filter change
            }}
            className="border rounded-lg p-2 bg-white shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
              setPage(1); // reset to first page on sort change
            }}
            className="border rounded-lg p-2 bg-white shadow-sm"
          >
            <option value="latest">Latest</option>
            <option value="priceAsc">Price Low → High</option>
            <option value="priceDesc">Price High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-90">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={p.image[0]}
              alt={p.name}
              className="w-full h-56 object-contain bg-gray-100"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-gray-600 mt-1">₹{p.price}</p>
              <button className="mt-3 w-full bg-slate-400 text-white py-2 rounded-lg hover:bg-slate-500 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg border ${page === 1 ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          Prev
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${page === num ? "bg-violet-500 text-white" : "hover:bg-gray-100"}`}
          >
            {num}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg border ${page === totalPages ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
