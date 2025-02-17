import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeRow, addProductToRow, reorderRows, setRowTemplate } from "../../features/categoriesSlice";
import { useDrop, useDrag } from "react-dnd";
import ProductCard from "../ProductsContainer/ProductCard";
import { PositionedProduct, Product } from "../../types/categoryTypes";
import "./Row.css";

const Row = ({ row, index }: { row: { id: string; products: PositionedProduct[]; template?: "left" | "center" | "right" }; index: number }) => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);
  const updatedRow = rows.find((r) => r.id === row.id);
  const template = row.template || "center";

  const rowRef = useRef<HTMLLIElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

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

  const createDropHandler = (
    ref: React.MutableRefObject<HTMLDivElement | null>,
    alignment: "left" | "center" | "right"
  ) => {
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
    }, [drop, ref]);

    return { ref, isOver };
  };

  const dropZone = createDropHandler(dropRef, template);

  useEffect(() => {
    if (rowRef.current) {
      dropRow(rowRef.current);
      dragRow(rowRef.current);
    }
  }, [dropRow, dragRow]);

  const getContainerWidth = (totalProducts: number) => {
    if (totalProducts === 1) return "33.33%";
    if (totalProducts === 2) return "66.66%";
    return "100%";
  };

  const totalProducts = updatedRow?.products.length || 0;
  const containerWidth = getContainerWidth(totalProducts);
  const containerStyle = {
    display: "flex",
    width: containerWidth,
    marginLeft: template === "right" ? "auto" : template === "center" ? "auto" : "0",
    marginRight: template === "left" ? "auto" : template === "center" ? "auto" : "0",
    gap: "10px",
    justifyContent: "space-between",
  };

  const handleTemplateChange = (newTemplate: "left" | "center" | "right") => {
    dispatch(setRowTemplate({ rowId: row.id, template: newTemplate }));
  };

  return (
    <li ref={rowRef} className={`row-container ${isDragging ? "dragging" : ""}`}>
      <div className="row-header">
        <button className="delete-row" onClick={() => dispatch(removeRow(row.id))}>🗑️</button>
        <div className="row-template-selector">
          <label>
            <input
              type="radio"
              name={`template-${row.id}`}
              value="left"
              checked={template === "left"}
              onChange={() => handleTemplateChange("left")}
            />
            Izquierda
          </label>
          <label>
            <input
              type="radio"
              name={`template-${row.id}`}
              value="center"
              checked={template === "center"}
              onChange={() => handleTemplateChange("center")}
            />
            Centro
          </label>
          <label>
            <input
              type="radio"
              name={`template-${row.id}`}
              value="right"
              checked={template === "right"}
              onChange={() => handleTemplateChange("right")}
            />
            Derecha
          </label>
        </div>
      </div>
      <div ref={dropZone.ref} className="drop-zone" style={containerStyle}>
        {updatedRow?.products.map((p) => (
          <div key={p.product.id} className="product-wrapper" style={{ flex: "1 0 33.33%" }}>
            <ProductCard product={p.product} isInRow={true} rowId={row.id} />
          </div>
        ))}
      </div>
    </li>
  );
};

export default Row;