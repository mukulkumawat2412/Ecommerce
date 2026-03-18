import axios from 'axios'
import React, { useState, useCallback } from 'react'
import debounce from "lodash/debounce"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../../redux/slices/searchSlice.jsx'


const SearchBar = () => {
    const [query, setQuery] = useState("")

    const [showDropdown, setShowDropdown] = useState(false)

    const user = useSelector((state)=>state.auth.user)

    const role = user?.role


    console.log(role)



    const { searchProduct } = useSelector((state) => state.search)
    console.log(searchProduct)
    const dispatch = useDispatch()

    // ✅ Fetch products with proper thunk handling
    const fetchSearchProduct = async (value) => {
        if (value.trim() === "") {

            setShowDropdown(false)
            return
        }


        // const decoded = jwtDecode(token)
        // console.log(decoded)


        // const role = decoded.role

     
       
        


        try {

            if (role =="user") {
                const response = await dispatch(searchProducts({ query: value })).unwrap()

                console.log(response)
                setShowDropdown(true)

            }
            // unwrap() se sidha payload milega

        } catch (error) {
            console.log("Error fetching product by search", error)
            setShowDropdown(false)
        }
    }

    // ✅ Debounce search for performance
    const debouncedSearch = useCallback(debounce(fetchSearchProduct, 200), [])

    // ✅ Handle input change
    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)
        debouncedSearch(value)

        if (value.trim() !== "") {
            setShowDropdown(true)
        } else {
            setShowDropdown(false)
        }
    }




    return (
  <div className="relative w-72 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
    <input
      type="text"
      onChange={handleChange}
      value={query}
      placeholder="Search Products..."
      onFocus={() => query && searchProduct.length > 0 && setShowDropdown(true)}
      className="w-full outline-none py-2 pl-3 pr-10 border rounded-md focus:ring-1 focus:ring-purple-400 text-sm sm:text-base"
    />

    {showDropdown && searchProduct.length > 0 && (
      <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
        {searchProduct.map((p) => (
          <Link key={p._id} to={`/product-details/${p._id}`}>
            <li className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100">
              <img
                src={p.image[0]}
                alt={p.name}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
              />
              <span className="text-black text-xs sm:text-sm">
                {p.name} - ₹{p.price}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    )}
  </div>
);

}

export default SearchBar
