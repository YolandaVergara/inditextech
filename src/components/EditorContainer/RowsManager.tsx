import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Row from "./Row";

const RowsManager = () => {
  const rows = useSelector((state: RootState) => state.categories.rows);

  return (
    <div>
      <ul>
        {rows.map((row, index) => (
          <Row key={row.id} row={row} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default RowsManager;
