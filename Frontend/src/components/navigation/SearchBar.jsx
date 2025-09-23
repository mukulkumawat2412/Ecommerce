import axios from 'axios'
import React from 'react'
import { useState,useCallback } from 'react'
import getCookie from '../../../../Backend/src/utils/GetToken.js'
import debounce from "lodash/debounce"
import { Link } from 'react-router-dom'


const SearchBar = () => {

    const [query,setQuery] = useState("") // electronics
    const [product,setProduct] = useState([])
    const [showDropdown,setShowDropdown] = useState(false) 
    
    


    const token = getCookie("accessToken")



     const fetchSearchProduct = async(value)=>{

        if(value.trim()===""){
            setProduct([])
            return
           
        }

        try {
      const response =  await axios.get(`http://localhost:8000/api/v1/product/search?query=${value}`,{
       
            headers:{
                Authorization:`Bearer ${token}`
            },
            withCredentials:true
           })
              
      
            setProduct(response.data.data)
         
        
            
        } catch (error) {
            console.log("Error fetching product by search",error)
            setShowDropdown(false)
    }

}



const debouncedSearch =  useCallback(debounce(fetchSearchProduct,200),[])
// [] me  only ek bar debounce function banega chahe me dobara se search karu toh bhi ek hi function banega debounce ka 
    


    const handleChange = (e)=>{
        const value = e.target.value
        setQuery(value)
        debouncedSearch(value)
        if(!value.trim()==""){
            setShowDropdown(true)
        }else{
            setShowDropdown(false)
        }

    }




  return (
    <div className='relative w-72'>
    {/* onBlur={()=>{setTimeout(()=> setShowDropdown(false),100)} } */}

        <input type='text' onChange={handleChange} value={query}  placeholder='Search Products...' onFocus={()=> query && product.length > 0  && setShowDropdown(true) }  className='outline-none py-2 pl-2 px-25 border rounded-sm focus:ring-1 focus:ring-purple-400 placeholder-lg'/>

    
    {
        showDropdown &&
        product.length > 0  && (
            <ul className='absolute w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 '>
                {
                    product.map((p)=>(
                        <Link key={p._id} to={`/product-details/${p._id}`}>
                        <li key={p._id} className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 '>
                        <img src={p.image} alt={p.name} className='w-10 h-10 object-contain'/>
                        <span className='text-black'>{p.name} - ₹{p.price}</span>

                        </li>
                        </Link>
                        
                    ))
                }
            </ul>
        )
    }
    



    </div>
  )
}



export default SearchBar
