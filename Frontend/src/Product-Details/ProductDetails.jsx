import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import getCookie from '../../../Backend/src/utils/GetToken.js'

const ProductDetails = () => {
    const [product,setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const {id} = useParams()

    useEffect(()=>{
        const fetchSingleProduct = async()=>{
            const token = getCookie("accessToken")
            if(!token){
                setLoading(false)
                return
            }

            try {
                const res = await axios.get(`http://localhost:8000/api/v1/product/single-product/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    withCredentials:true
                })
                setProduct(res.data.data)
                setLoading(false)
            } catch (error) {
                console.log("Error fetching product",error)
                setLoading(false)
            }
        }

        fetchSingleProduct()
    },[id])

   
   

    if(loading) return <p className='text-center mt-20 text-xl'>Loading...</p>
    if(!product) return <p className='text-center mt-20 text-xl'>No product found</p>

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto mt-10 p-5 flex flex-col md:flex-row gap-10"
        >
    
            <div className="flex-1 flex justify-center items-center bg-white rounded-lg shadow-md p-5">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-[300px] h-[300px] object-contain"
                />
            </div>

         
            <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
                <h3 className="text-xl text-gray-500">{product.title}</h3>
                <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                
                <p className="text-gray-700">{product.description}</p>

                
                <div className="flex items-center gap-4 mt-4">
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e)=>setQuantity(Number(e.target.value))}
                        min={1} 
                        className="w-20 border rounded px-2 py-1 text-center"
                    />
                    <button 
                      
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow-md transition-all"
                    >
                        Buy Now
                    </button>
                </div>

                
                <div className="mt-5 text-gray-600">
                    <p>⭐⭐⭐⭐☆ 4.2 Ratings</p>
                    <p className="mt-2">Available offers: Buy 2 get 10% off</p>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductDetails
