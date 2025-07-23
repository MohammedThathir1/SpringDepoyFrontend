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
    <header className=" bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="space-x-4 font-semibold">
        <Link to="/">Home</Link>
        <Link to="/product/add">Add Product</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <form onSubmit={search}>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          className="p-1 rounded text-black"
        />
      </form>
    </header>
);
}
