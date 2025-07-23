import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import ProductDetails from "../components/ProductDetails";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  return product ? <ProductDetails product={product} /> : <p>Loading...</p>;
}