import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteWishlistProduct, wishlistProducts } from "../../../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlistItems, loading } = useSelector((state) => state.wishlist);
  console.log(wishlistItems)

  useEffect(() => {
    dispatch(wishlistProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-gray-600">
        Loading wishlist...
      </div>
    );
  }



  const handleWishlistItems = async(itemId)=>{
  const res =  await dispatch(DeleteWishlistProduct({itemId}))

  console.log(res)


  }




return (
  <div className="w-full min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center sm:text-left">
        My Wishlist 💖
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-500 text-base sm:text-lg">
            Your wishlist is empty. Start exploring products!
          </p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 relative group"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleWishlistItems(item._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                title="Remove from Wishlist"
              >
                <FaTrashAlt size={18} />
              </button>

              {/* Image */}
              <div className="flex justify-center items-center h-40 sm:h-48 mb-3">
                <img
                  src={item.product?.image?.[0]}
                  alt={item.product?.name}
                  className="max-h-full object-contain rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                  {item.product?.name}
                </h2>

                <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                  {item.product?.title}
                </p>

                <p className="text-gray-900 font-bold mt-2 text-base sm:text-lg">
                  ₹{item.product?.price}
                </p>

                <Link
                  to={`/product-details/${item.product?._id}`}
                  className="mt-3 inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default WishlistPage;
