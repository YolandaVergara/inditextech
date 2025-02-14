import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = useSelector((state: RootState) => state.categories.products);

  return (
    <div>
      <h2>Productos Disponibles</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
