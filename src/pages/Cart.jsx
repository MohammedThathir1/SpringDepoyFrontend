import { useEffect, useState } from "react";
import api from "../api/api";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/cart").then((res) => setItems(res.data));
  }, []);

  const remove = async (productId) => {
    await api.delete(`/cart/${productId}`);
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  return (
    <div className="space-y-2 sm:space-y-4 px-2 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold">Your Cart</h1>
      {items.length === 0 && <p>Cart is empty.</p>}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 border p-2 sm:p-4 rounded shadow"
        >
          <img src={item.image} alt={item.name} className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md" />
          <div className="flex-grow text-center sm:text-left">
            <h2 className="font-semibold text-sm sm:text-base">{item.name}</h2>
            <p className="text-xs sm:text-base">{item.price}</p>
          </div>
          <button
            onClick={() => remove(item.id)}
            className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded w-full sm:w-auto"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}