import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeRow, addProductToRow, } from "../features/categoriesSlice";
import { useDrop } from "react-dnd";
import ProductCard from "./ProductCard";
import { PositionedProduct, Product } from "../types/categoryTypes";

const Row = ({ row }: { row: { id: string; products: PositionedProduct[] } }) => {

  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);
  const updatedRow = rows.find((r) => r.id === row.id);

  const createDropHandler = (alignment: "left" | "center" | "right") => {
    const ref = useRef<HTMLDivElement | null>(null);
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

  const left = createDropHandler("left");
  const center = createDropHandler("center");
  const right = createDropHandler("right");

  return (
    <li style={{ display: "flex", gap: "10px", padding: "10px", border: "1px solid #ccc", justifyContent: "space-around" }}>
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