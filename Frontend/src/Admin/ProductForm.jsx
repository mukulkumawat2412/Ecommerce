import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import getCookie from '../../../Backend/src/utils/GetToken.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/slices/admin.productSlice.jsx';
import { getCategories } from '../redux/slices/categorySlice.jsx';

const ProductForm = () => {
    const [images, setImages] = useState([]);

    const [categories, setCategories] = useState([])


    const dispatch = useDispatch()

    console.log(categories)

    const token = getCookie("accessToken");
    if (!token) {
        alert("User not logged in! Token missing.");

    }




    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await dispatch(getCategories()).unwrap();
                setCategories(res);
                console.log(res)
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, [dispatch]);













    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        title: Yup.string().required("Title is required"),
        price: Yup.number().required("Price is required").min(0, "Price cannot be negative"),
        description: Yup.string().required("Description is required"),
        stock: Yup.number().required("Stock is required").min(0, "Stock cannot be negative"),
        category: Yup.string().required("Category is required"),
        images: Yup.array().min(1, "At least 1 image is required").max(5, "Maximum 5 images allowed"),
    });





















    return (
        <Formik
            initialValues={{
                name: '',
                title: '',
                price: 0,
                stock: 0,
                category: '',
                description: '',
                images: []
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("title", values.title);
                formData.append("price", values.price);
                formData.append("stock", values.stock);
                formData.append("category", values.category);
                formData.append("description", values.description);

                values.images.forEach((img) => {
                    formData.append("images", img); // backend should handle "images" array
                });


                const res = await dispatch(createProduct(formData)).unwrap()

                console.log(res)

                if (res) {
                    alert("Product successfully created✅")
                }

            }}
        >
            {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => {

                const handleImageChange = (e) => {
                    const files = Array.from(e.target.files);
                    const updatedFiles = [...images, ...files].slice(0, 5); // existing + new, max 5
                    setImages(updatedFiles);
                    setFieldValue("images", updatedFiles);
                    console.log("Selected Images Array:", updatedFiles);
                };

                return (
                    <Form className="w-[500px] mx-auto mt-25">
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

                        <div className="mb-2 ">
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
                                    <MenuItem key={cat} value={cat._id}>
                                        {cat.name}
                                    </MenuItem>
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
                                id="images"
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                            {touched.images && errors.images && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.images}</div>
                            )}
                            {images.length > 0 && (
                                <div className="mt-2 text-sm">
                                    Selected {images.length} image(s)
                                </div>
                            )}
                        </div>

                        <div className="mb-2">
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                               Add Product
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ProductForm;
