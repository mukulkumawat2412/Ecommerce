import React,{ useState } from "react";
import api from "../utils/axiosInstance.js"; // <-- your axios instance

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview,setPreview] = useState(null)


  // image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)) // preview
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await api.post("/contact/send-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });



      alert("Image sent to admin!");
      console.log(res);

    } catch (error) {
      alert("Error sending image");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4 border p-5 rounded-lg shadow"
      >
        <label className="block font-semibold">Select Image:</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />

        {
            preview && (
                <img src={preview} className="w-48 object-cover rounded-md mt-2" alt="preview"/>
            )
        }

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded w-full"
        >
          Send Image
        </button>
      </form>
    </div>
  );
}
