import { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeProduct } from "../features/categoriesSlice";
import { Product } from "../types/categoryTypes";

const ProductCard = ({ product, isInRow = false }: { product: Product; isInRow?: boolean }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "PRODUCT",
    item: { product },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab", border: "1px solid #ddd", padding: "10px" }}>
      <img src={product.imageUrl} alt={product.name} width="50" />
      <div>
        <p>{product.name}</p>
        <p>${product.price.toFixed(2)}</p>
      </div>
      {!isInRow && (
        <button onClick={() => dispatch(removeProduct(product.id))} style={{ background: "red", color: "white", border: "none", cursor: "pointer" }}>
          🗑️
        </button>
      )}
    </div>
  );
};

export default ProductCard;
