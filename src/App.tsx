import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addRow, removeRow, addNewProduct } from "./features/categoriesSlice";

const App = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows);
  const products = useSelector((state: RootState) => state.categories.products);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name.trim() === "" || isNaN(Number(newProduct.price))) return;

    dispatch(addNewProduct({ name: newProduct.name, price: Number(newProduct.price) }));
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div>
      <h1>ZARA Jeans 👖</h1>

      {/* Formulario para agregar un nuevo producto */}
      <h2>Añadir Nuevo Producto</h2>
      <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button type="submit">Añadir Producto</button>
      </form>

      {/* Listado de productos disponibles */}
      <h2>Productos Disponibles</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <img src={product.imageUrl} alt={product.name} width="80" />
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Botón para agregar filas */}
      <button onClick={() => dispatch(addRow())}>Añadir Fila</button>
      <ul>
        {rows.map(row => (
          <li key={row.id}>
            Fila {row.id}
            <button onClick={() => dispatch(removeRow(row.id))} style={{ marginLeft: '10px' }}>
              Eliminar Fila
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
