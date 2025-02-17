import { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeProduct, removeProductFromRow } from "../../features/categoriesSlice";
import { Product } from "../../types/categoryTypes";
import "./ProductList.css";

const ProductCard = ({ product, isInRow = false, rowId }: { product: Product; isInRow?: boolean; row?: string; rowId?: string }) => {
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
    <div ref={ref} className="product-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-footer">
        <div className="product-info">
          <p>{product.name}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() =>
            dispatch(
              isInRow && rowId
                ? removeProductFromRow({ rowId, productId: product.id })
                : removeProduct(product.id)
            )
          }
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ProductCard;