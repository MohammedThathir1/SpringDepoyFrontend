import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

const empty = { name: "", desc: "", price: 0, releaseDate: "", available: false, image: null };

export default function AddUpdateProduct() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const nav = useNavigate();

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then((res) => setForm({ ...res.data, image: null }));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, image: file }));
  };




/*   const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null) data.append(key, val);
    });
    if (isEdit) {
      await api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      await api.post("/products", data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    nav("/");
  }; */




const submit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  const productData = { ...form };
  delete productData.image; 

  data.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

  if (form.image) {
    data.append("imageFile", form.image);
  }

  try {
    if (isEdit) {
      await api.put(`/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product updated successfully!");
    } else {
      await api.post("/products", data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product added successfully!");
    }
    nav("/");
  } catch (error) {
    console.error("Upload error:", error);
    alert("Something went wrong: " + error?.response?.data?.message || "Unknown error");
  }
};








  return (
    <form onSubmit={submit} className="max-w-full sm:max-w-lg mx-auto bg-white p-3 sm:p-6 rounded shadow space-y-3 sm:space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold">{isEdit ? "Update" : "Add"} Product</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="capitalize text-sm sm:text-base">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded text-sm sm:text-base"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="desc" className="capitalize text-sm sm:text-base">Description</label>
        <textarea
          name="desc"
          id="desc"
          value={form.desc}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded text-sm sm:text-base"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="capitalize text-sm sm:text-base">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={form.price}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded text-sm sm:text-base"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="releaseDate" className="capitalize">Release Date</label>
        <input
          type="date"
          name="releaseDate"
          id="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="available" className="capitalize">Available</label>
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={form.available}
          onChange={handleChange}
          className="h-5 w-5"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="capitalize">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded cursor-pointer"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        {isEdit ? "Update" : "Add"} Product
      </button>
    </form>
  );
}