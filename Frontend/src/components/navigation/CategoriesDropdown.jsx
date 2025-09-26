import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/slices/categorySlice.jsx';

const CategoriesDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  console.log(categories)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getCategories());
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex justify-between items-center w-48 px-4 py-2 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600 focus:outline-none"
      >
        Select Category
        <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <ul>
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  to={`/category-by-products/${cat._id}`}
                  className="block px-4 py-2 hover:bg-sky-100 cursor-pointer"
                  onClick={() => setDropdownOpen(false)} // close dropdown on click
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
