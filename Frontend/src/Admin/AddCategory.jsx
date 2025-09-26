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
    <div className="max-w-md mx-auto p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded font-semibold"
        >
          Add Category
        </button>
      </form>
    </div>
  )
}

export default AddCategory
