import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../redux/slices/productSlice.jsx'

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(""); 

  const { id } = useParams();
  const { SingleProduct } = useSelector((state) => state.product);

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[])


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
         await dispatch(singleProduct({ id }));
     
     
        setLoading(false);
      } catch (error) {
        console.log("Error fetching product", error);
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id, dispatch,SingleProduct]);

 
  useEffect(() => {
    if (SingleProduct?.image?.length > 0) {
      setMainImage(SingleProduct.image[0]);
    }
  }, [SingleProduct]);

  if (loading) return <p className="text-center mt-20 text-xl">Loading...</p>;
  if (!SingleProduct) return <p className="text-center mt-20 text-xl">No product found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto mt-20 p-5 flex flex-col md:flex-row gap-10"
    >
      {/* Left Images */}
      <div className="flex gap-4 flex-1">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {SingleProduct.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setMainImage(img)} 
            />
          ))}
        </div>

    
        <div className="flex-1 flex justify-center items-center bg-white rounded-lg shadow-md p-5">
          <img
            src={mainImage} 
            alt={SingleProduct.name}
            className="w-[350px] h-[350px] object-contain"
          />
        </div>
      </div>

  
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="text-3xl font-semibold text-gray-800">{SingleProduct.name}</h2>
        <h3 className="text-xl text-gray-500">{SingleProduct.title}</h3>
        <p className="text-2xl font-bold text-green-600">₹{SingleProduct.price}</p>
        <p className="text-gray-700">{SingleProduct.description}</p>

        <p className="text-red-700 font-semibold text-2xl">
          {SingleProduct.stock > 0 ? "InStock" : "Out-of-stock"}
        </p>

        <div className="flex items-center gap-4 mt-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            className="w-20 border rounded px-2 py-1 text-center"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow-md transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
