import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const ProductForm = () => {

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        title: Yup.string().required("Title is required"),
        price: Yup.number().required("Price is required").min(0, "Price cannot be negative"),
        description: Yup.string().required("Description is required"),
        stock: Yup.number().required("Stock is required").min(0, "Stock cannot be negative"),
        category: Yup.string().required("Category is required"),
        image: Yup.mixed().required("Image is required"),
    })

    const categories = ["Electronics", "Clothing", "Books", "Food", "Sports"];


       const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  };


     const token = getCookie("accessToken");
     console.log('token ',token)
    if (!token) {
      alert("User not logged in! Token missing.");
      return;
    }




    return (
        <Formik
            initialValues={{
                name: '',
                title: '',
                price: '',
                stock: 0,
                category: '',
                description: '',
                image: null
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

                const formData = new FormData()

                formData.append("name", values.name),
                    formData.append("title", values.title),
                    formData.append("price", values.price),
                    formData.append("stock", values.stock),
                    formData.append("category", values.category),
                    formData.append("description", values.description),
                    formData.append("image", values.image)



                try {
                    const response = await axios.post(
                        "http://localhost:8000/api/v1/product/create-product",
                        formData,
                        {
                            headers: {

                                "Content-Type": "multipart/form-data",
                                "Authorization":`Bearer ${token}`

                            },

                        },
                        { withCredentials: true }


                    );
                    console.log("Server Response:", response.data);
                    alert("Product created successfully!");
                } catch (error) {
                    console.error("Upload Error:", error);
                    alert("Product failed!");
                }





            }}
        >
            {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
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
                                <MenuItem key={cat} value={cat}>
                                    {cat}
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
                            id="image"
                            name="image"
                            type="file"
                            onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                        />
                        {touched.image && errors.image && (
                            <div style={{ color: "red", fontSize: "12px" }}>{errors.image}</div>
                        )}
                    </div>

                    <div className="mb-2">
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </div>
                </Form>

            )}
        </Formik>
    )
}

export default ProductForm;
