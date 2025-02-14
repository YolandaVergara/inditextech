import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addRow } from "../../features/categoriesSlice";
import Row from "./Row";

const RowsManager = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);

  return (
    <div>
      <button onClick={() => dispatch(addRow())}>Añadir Fila</button>
      <ul>
        {rows.map((row, index) => (
          <Row key={row.id} row={row} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default RowsManager;
