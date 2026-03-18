import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import getCookie from '../../../Backend/src/utils/GetToken.js'
import { useDispatch } from 'react-redux'
import { createCategory } from '../redux/slices/categorySlice.jsx'

const AddCategory = () => {


    const [message,setMessage] = useState("")
    const [name,setName] = useState("")
    const [slug,setSlug] = useState("")


    const dispatch  = useDispatch()


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {

          await dispatch(createCategory({name,slug}))
      


        setMessage("created category successfully")
        setName("")
        setSlug("")

            
        } catch (error) {
            console.log("Error create categories",error)
            
        }

    }



 return (
  <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md 
                  mx-auto p-4 sm:p-6 md:p-8 
                  shadow rounded mt-10 sm:mt-16 md:mt-24">

    <h2 className="text-lg sm:text-xl md:text-2xl 
                   font-bold mb-4 text-center sm:text-left">
      Add Category
    </h2>

    {message && (
      <p className="mb-2 text-sm sm:text-base text-green-600 text-center sm:text-left">
        {message}
      </p>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block mb-1 text-sm sm:text-base">
          Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm sm:text-base">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto 
                   bg-gray-600 text-white 
                   px-6 py-2 sm:py-3 
                   rounded font-semibold text-sm sm:text-base"
      >
        Add Category
      </button>
    </form>
  </div>
)

}

export default AddCategory
