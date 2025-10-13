import axios from 'axios'
import React, { useState, useCallback } from 'react'
import debounce from "lodash/debounce"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../../redux/slices/searchSlice.jsx'
import { jwtDecode } from 'jwt-decode'
import getCookie from '../../../../Backend/src/utils/GetToken.js'

const SearchBar = () => {
    const [query, setQuery] = useState("")

    const [showDropdown, setShowDropdown] = useState(false)
    const token = getCookie("accessToken")



    const { searchProduct } = useSelector((state) => state.search)
    console.log(searchProduct)
    const dispatch = useDispatch()

    // ✅ Fetch products with proper thunk handling
    const fetchSearchProduct = async (value) => {
        if (value.trim() === "") {

            setShowDropdown(false)
            return
        }


        const decoded = jwtDecode(token)
        console.log(decoded)


        const role = decoded.role

     
       
        


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
        <div className='relative w-72'>
            <input
                type='text'
                onChange={handleChange}
                value={query}
                placeholder='Search Products...'
                onFocus={() => query && searchProduct.length > 0 && setShowDropdown(true)}
                className='outline-none py-2 pl-2 px-20 border rounded-sm focus:ring-1 focus:ring-purple-400 placeholder-lg'
            />

            {
                showDropdown && searchProduct.length > 0 && (
                    <ul className='absolute w-68 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50'>
                        {searchProduct.map((p) => (
                            <Link key={p._id} to={`/product-details/${p._id}`}>
                                <li className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100'>
                                    <img src={p.image[0]} alt={p.name} className='w-10 h-10 object-contain' />
                                    <span className='text-black'>{p.name} - ₹{p.price}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default SearchBar
