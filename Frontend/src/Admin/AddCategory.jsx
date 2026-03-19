import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import getCookie from '../../../Backend/src/utils/GetToken.js'
import { useDispatch } from 'react-redux'
import { createCategory } from '../redux/slices/categorySlice.jsx'

const AddCategory = () => {

    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createCategory({ name, slug }))
            setMessage("Created category successfully")
            setName("")
            setSlug("")
        } catch (error) {
            console.log("Error create categories", error)
        }
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4 py-10 sm:py-16">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Add Category
                </h2>

                {message && (
                    <p className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Electronics"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="e.g. electronics"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg text-sm transition"
                    >
                        Add Category
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddCategory