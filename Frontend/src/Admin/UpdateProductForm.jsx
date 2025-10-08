import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import getCookie from '../../../Backend/src/utils/GetToken.js';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts_ById, updateProduct } from '../redux/slices/admin.productSlice.jsx';
import { getCategories } from '../redux/slices/categorySlice.jsx';

const UpdateProductForm = () => {
  const { id } = useParams(); 
 
  const navigate = useNavigate();
 

  // const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [initialValues, setInitialValues] = useState(null); 


  const dispatch = useDispatch()
  const {selectedProduct} = useSelector((state)=>state.adminProduct)

  const {categories} = useSelector((state)=>state.category)



 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
     await dispatch(getProducts_ById({id}))

      
        setInitialValues({
          name: selectedProduct.name,
          title: selectedProduct.title,
          price: selectedProduct.price,
          stock: selectedProduct.stock,
          category: selectedProduct.category?._id || '',
          description: selectedProduct.description,
          images: [], 
        });
        setImages(selectedProduct.image || []); 
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

  
    const fetchCategories = async () => {
      try {
   const res =     await dispatch(getCategories())

   console.log(res)
      
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id, selectedProduct]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").min(0),
    stock: Yup.number().required("Stock is required").min(0),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
  });

  if (!initialValues) return <p>Loading...</p>; // wait for data

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        try {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("title", values.title);
          formData.append("price", values.price);
          formData.append("stock", values.stock);
          formData.append("category", values.category);
          formData.append("description", values.description);

          values.images.forEach(img => formData.append("images", img));

        const res =   await dispatch(updateProduct({id,updateData:formData}))
          
       console.log(res)

        if(res.payload.success){
          window.alert("Product successfully updated")
          navigate("/dashboard")
        }


        } catch (err) {
          console.error("Failed to update product:", err);
          alert("Update failed!");
        }
      }}
    >
      {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => {
        const handleImageChange = (e) => {
          const files = Array.from(e.target.files);
          const updatedFiles = [...values.images, ...files].slice(0, 5);
          setFieldValue("images", updatedFiles);
          setImages(updatedFiles);
        };

        return (
          <Form className="w-[500px] mx-auto mt-4">
            <div className="mb-2">
              <Field
                as={TextField}
                name="name"
                label="Product Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
            </div>

            <div className="mb-2">
              <Field
                as={TextField}
                name="title"
                label="Product Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />
            </div>

            <div className="mb-2">
              <Field
                as={TextField}
                name="price"
                label="Price"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                fullWidth
              />
            </div>

            <div className="mb-2">
              <Field
                as={TextField}
                name="stock"
                label="Stock"
                type="number"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.stock && Boolean(errors.stock)}
                helperText={touched.stock && errors.stock}
                fullWidth
              />
            </div>

            <div className="mb-2">
              <Field
                as={TextField}
                select
                name="category"
                label="Category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                ))}
              </Field>
            </div>

            <div className="mb-2">
              <Field
                as={TextField}
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                fullWidth
              />
            </div>

            <div className="mb-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {images.length > 0 && (
                <div className="mt-2 text-sm">
                  Selected {images.length} image(s)
                </div>
              )}
            </div>

            <div className="mb-2">
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Product
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateProductForm;
