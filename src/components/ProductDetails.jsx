import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ProductDetails({ product }) {
  const nav = useNavigate();

  const deleteProduct = async () => {
    /* await api.delete(`/products/${product.id}`);
    nav("/"); */
  
  
   try {
      await api.delete(`/products/${product.id}`);
      alert("Product deleted successfully!");
    nav("/");
  } catch (error) {
    console.error("Upload error:", error);
    alert("Something went wrong: Unknown error");
  }
  
  
  };

  const addToCart = async () => {
    await api.post("/cart", { productId: product.id });
    nav("/cart");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
       <img
          src={`data:${product.imageType};base64,${product.imageData}`}
          alt={product.imageName}
          className="h-40 w-full object-cover"
        />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="mt-2">{product.desc}</p>
      <p className="mt-2 font-semibold">Price: ₹{product.price}</p>
      <p>Release: {product.releaseDate}</p>
      <p>Available: {product.available ? "Yes" : "No"}</p>
      <div className="flex gap-4 mt-4">
        <button onClick={addToCart} className="bg-green-500 px-4 py-2 rounded text-white cursor-pointer">
          Add to Cart
        </button>
        <button
          onClick={() => nav(`/product/update/${product.id}`)}
          className="bg-yellow-500 px-4 py-2 rounded text-white cursor-pointer"
        >
          Update
        </button>
        <button onClick={deleteProduct} className="bg-red-600 px-4 py-2 rounded text-white cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
}