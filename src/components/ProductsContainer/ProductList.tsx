import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import { Product } from "../../types/categoryTypes";

const ProductList = () => {
  const products = useSelector((state: RootState) => state.categories.products);

  return (
    <div className="product-list-container">
      <h2>Productos Disponibles</h2>
      <div className="product-list">
        {
          products.map((product: Product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </div>
  );
};

export default ProductList;
