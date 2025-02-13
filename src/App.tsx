import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addRow } from './features/categoriesSlice';

const App = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);

  return (
    <div>
      <h1>ZARA Jeans</h1>
      <button onClick={() => dispatch(addRow())}>Añadir Fila</button>
      <ul>
        {rows.map(row => (
          <li key={row.id}>Fila {row.id} - Alineación: {row.alignment}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
