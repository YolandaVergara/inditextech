import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeRow, addProductToRow, reorderRows } from "../features/categoriesSlice";
import { useDrop, useDrag } from "react-dnd";
import ProductCard from "./ProductCard";
import { PositionedProduct, Product } from "../types/categoryTypes";

const Row = ({ row, index }: { row: { id: string; products: PositionedProduct[] }; index: number }) => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);
  const updatedRow = rows.find((r) => r.id === row.id);

  const rowRef = useRef<HTMLLIElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Drag and drop for rows 
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

  // Drag and drop to move products between rows and inside each row
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
    <li ref={rowRef}
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        justifyContent: "space-around",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}>
      <button onClick={() => dispatch(removeRow(row.id))}>❌</button>

      <div ref={left.ref as unknown as React.RefObject<HTMLDivElement>}
        style={{ background: left.isOver ? "#ddd" : "white", flex: 1, padding: "10px", minHeight: "80px" }}>
        {updatedRow?.products.filter((p) => p.alignment === "left").map((p) => (
          <ProductCard key={p.product.id} product={p.product} />
        ))}
      </div>

      <div ref={center.ref as unknown as React.RefObject<HTMLDivElement>}
        style={{ background: center.isOver ? "#ddd" : "white", flex: 1, padding: "10px", minHeight: "80px" }}>
        {updatedRow?.products.filter((p) => p.alignment === "center").map((p) => (
          <ProductCard key={p.product.id} product={p.product} />
        ))}
      </div>

      <div ref={right.ref as unknown as React.RefObject<HTMLDivElement>}
        style={{ background: right.isOver ? "#ddd" : "white", flex: 1, padding: "10px", minHeight: "80px" }}>
        {updatedRow?.products.filter((p) => p.alignment === "right").map((p) => (
          <ProductCard key={p.product.id} product={p.product} />
        ))}
      </div>
    </li>
  );
};

export default Row;