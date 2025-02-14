import { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Product } from "../types/categoryTypes";

const ProductCard = ({ product }: { product: Product }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "PRODUCT",
    item: () => {
      return { product };
    },
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
      <p>{product.name}</p>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
