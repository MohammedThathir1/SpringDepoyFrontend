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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.length === 0 && <p>Cart is empty.</p>}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border p-4 rounded shadow"
        >
          <img src={item.image} alt={item.name} className="h-20 w-20 object-cover" />
          <div className="flex-grow">
            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
          </div>
          <button
            onClick={() => remove(item.id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}