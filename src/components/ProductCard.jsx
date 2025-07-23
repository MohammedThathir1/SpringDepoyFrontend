import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>

      <div className="border rounded-md shadow p-2 w-[250px]">
        <img
          src={`data:${product.imageType};base64,${product.imageData}`}
          alt={product.imageName}
          className="w-full h-52 object-contain p-2"
        />

        <div className="p-3">
          <h2 className="font-bold text-lg truncate">{product.name}</h2>
          <p className="text-blue-600 font-semibold">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
