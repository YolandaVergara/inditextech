import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addRow, addNewProduct } from "./features/categoriesSlice";
import Row from "./components/Row";
import ProductCard from "./components/ProductCard";
import { PositionedProduct } from "./types/categoryTypes";

const App = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.categories.rows as { id: string; products: PositionedProduct[] }[]);
  const products = useSelector((state: RootState) => state.categories.products);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    if (newProduct.name.trim() === "" || isNaN(Number(newProduct.price))) return;

    dispatch(addNewProduct({ name: newProduct.name, price: Number(newProduct.price) }));
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div>
      <h1>ZARA Jeans 👖</h1>

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

      <h2>Productos Disponibles</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <button onClick={() => dispatch(addRow())}>Añadir Fila</button>
      <ul>
        {rows.map((row, index) => (
          <Row key={row.id} row={row} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default App;