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
    <div className="p-4 sm:p-6 max-w-full sm:max-w-xl mx-auto bg-white rounded shadow">
      <img
        src={`data:${product.imageType};base64,${product.imageData}`}
        alt={product.imageName}
        className="h-40 sm:h-56 w-full object-cover rounded-md"
      />
      <h2 className="text-xl sm:text-2xl font-bold mt-4">{product.name}</h2>
      <p className="mt-2 text-base sm:text-lg">{product.desc}</p>
      <p className="mt-2 font-semibold text-sm sm:text-base">Price: ₹{product.price}</p>
      <p className="text-sm sm:text-base">Release: {product.releaseDate}</p>
      <p className="text-sm sm:text-base">Available: {product.available ? "Yes" : "No"}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
        <button onClick={addToCart} className="bg-green-500 px-3 py-2 sm:px-4 sm:py-2 rounded text-white cursor-pointer w-full sm:w-auto">
          Add to Cart
        </button>
        <button
          onClick={() => nav(`/product/update/${product.id}`)}
          className="bg-yellow-500 px-3 py-2 sm:px-4 sm:py-2 rounded text-white cursor-pointer w-full sm:w-auto"
        >
          Update
        </button>
        <button onClick={deleteProduct} className="bg-red-600 px-3 py-2 sm:px-4 sm:py-2 rounded text-white cursor-pointer w-full sm:w-auto">
          Delete
        </button>
      </div>
    </div>
  );
}