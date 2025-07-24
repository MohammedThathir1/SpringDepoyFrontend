import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const search = (e) => {
    e.preventDefault();
    nav(`/?search=${q}`);
  };

  return (
    <header className="bg-blue-600 text-white p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      <div className="space-x-2 sm:space-x-4 font-semibold flex flex-col sm:flex-row items-center">
        <Link to="/">Home</Link>
        <Link to="/product/add">Add Product</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <form onSubmit={search} className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-center sm:justify-end">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="p-1 sm:p-2 rounded text-black w-full sm:w-40"
        />
      </form>
    </header>
);
}
