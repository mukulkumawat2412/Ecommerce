// ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/slices/categorySlice.jsx";
import { PaginationProducts } from "../redux/slices/productSlice.jsx";
import CategoriesDropdown from "../components/navigation/CategoriesDropdown.jsx";
import { AddToCart } from "../redux/slices/cartSlice.jsx";

const ProductPage = ({ setCartCount }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("latest");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch categories
  useEffect(() => {
    dispatch(getCategories()).unwrap().catch(console.log);
  }, [dispatch]);

  // Fetch products whenever page/category/sort changes
  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated, page, selectedCategory, selectedSort]);

  const fetchProducts = async () => {
    try {
      if (isAuthenticated) {
        const res = await dispatch(
          PaginationProducts({
            page,
            limit: 8,
            category: selectedCategory,
            sort: selectedSort,
          })
        ).unwrap();
        setTotalPages(res.totalPages || 1);
      }
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

  const addToCart = async (productId) => {
    try {
      const alreadyInCart = cartItems.some(
        (item) => item.product._id.toString() === productId.toString()
      );
      await dispatch(AddToCart({ productId, quantity: 1 })).unwrap();
      if (!alreadyInCart) setCartCount((prev) => prev + 1);
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-[var(--navbar-height)] px-4 sm:px-6 md:px-12">
      {/* Explanation: pt-[var(--navbar-height)] ensures content is below navbar */}
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold w-full md:w-auto">Shop Products</h2>
        <CategoriesDropdown />

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg p-2 bg-white shadow-sm w-full md:w-auto"
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
              setPage(1);
            }}
            className="border rounded-lg p-2 bg-white shadow-sm w-full md:w-auto"
          >
            <option value="latest">Latest</option>
            <option value="priceAsc">Price Low → High</option>
            <option value="priceDesc">Price High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={p.image[0]}
                alt={p.name}
                className="w-full h-56 md:h-48 object-contain bg-gray-100"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg md:text-xl">{p.name}</h3>
                <p className="text-gray-600 mt-1">₹{p.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(p._id);
                  }}
                  className="mt-auto w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition text-sm md:text-base"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No products available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
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