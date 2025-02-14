import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeRow, addProductToRow, reorderRows, removeProductFromRow } from "../../features/categoriesSlice";
import { useDrop, useDrag } from "react-dnd";
import ProductCard from "../ProductsContainer/ProductCard";
import { PositionedProduct, Product } from "../../types/categoryTypes";
import "./Row.css";

const Row = ({ row, index }: { row: { id: string; products: PositionedProduct[] }; index: number }) => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);
  const updatedRow = rows.find((r) => r.id === row.id);

  const rowRef = useRef<HTMLLIElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRow] = useDrag({
    type: "ROW",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRow] = useDrop({
    accept: "ROW",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        dispatch(reorderRows({ fromIndex: draggedItem.index, toIndex: index }));
        draggedItem.index = index;
      }
    },
  });

  const createDropHandler = (ref: React.MutableRefObject<HTMLDivElement | null>, alignment: "left" | "center" | "right") => {
    const [{ isOver }, drop] = useDrop({
      accept: "PRODUCT",
      drop: (item: { product: Product }) => {
        dispatch(addProductToRow({ rowId: row.id, product: item.product, alignment }));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    useEffect(() => {
      if (ref.current) {
        drop(ref.current);
      }
    }, [drop]);

    return { ref, isOver };
  };

  const left = createDropHandler(leftRef, "left");
  const center = createDropHandler(centerRef, "center");
  const right = createDropHandler(rightRef, "right");

  useEffect(() => {
    if (rowRef.current) {
      dropRow(rowRef.current);
      dragRow(rowRef.current);
    }
  }, [dropRow, dragRow]);

  return (
    <li ref={rowRef} className={`row-container ${isDragging ? "dragging" : ""}`}>
      <button className="delete-row" onClick={() => dispatch(removeRow(row.id))}>❌</button>

      <div ref={left.ref} className={`drop-zone ${left.isOver ? "hovered" : ""}`}>
        {updatedRow?.products.filter((p) => p.alignment === "left").map((p) => (
          <div key={p.product.id} className="product-wrapper">
            <ProductCard product={p.product} isInRow={true} />
            <button className="delete-product" onClick={() => dispatch(removeProductFromRow({ rowId: row.id, productId: p.product.id }))}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div ref={center.ref} className={`drop-zone ${center.isOver ? "hovered" : ""}`}>
        {updatedRow?.products.filter((p) => p.alignment === "center").map((p) => (
          <div key={p.product.id} className="product-wrapper">
            <ProductCard product={p.product} isInRow={true} />
            <button className="delete-product" onClick={() => dispatch(removeProductFromRow({ rowId: row.id, productId: p.product.id }))}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div ref={right.ref} className={`drop-zone ${right.isOver ? "hovered" : ""}`}>
        {updatedRow?.products.filter((p) => p.alignment === "right").map((p) => (
          <div key={p.product.id} className="product-wrapper">
            <ProductCard product={p.product} isInRow={true} />
            <button className="delete-product" onClick={() => dispatch(removeProductFromRow({ rowId: row.id, productId: p.product.id }))}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </li>
  );
};

export default Row;
