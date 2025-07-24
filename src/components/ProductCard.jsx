import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>

      <div className="border rounded-md shadow p-2 w-full sm:w-[250px] flex flex-col">
        <img
          src={`data:${product.imageType};base64,${product.imageData}`}
          alt={product.imageName}
          className="w-full h-40 sm:h-52 object-contain p-2 rounded-md"
        />
        <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
          <h2 className="font-bold text-base sm:text-lg truncate">{product.name}</h2>
          <p className="text-blue-600 font-semibold text-sm sm:text-base">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
