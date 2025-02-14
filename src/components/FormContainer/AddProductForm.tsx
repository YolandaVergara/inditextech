import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../features/categoriesSlice";
import "./AddProductForm.css";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name.trim() === "" || isNaN(Number(newProduct.price))) return;

    dispatch(addNewProduct({ name: newProduct.name, price: Number(newProduct.price) }));
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div className="form-container">
      <h2>Añadir Nuevo Producto</h2>
      <form onSubmit={handleAddProduct} className="product-form">
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
    </div>
  );
};

export default AddProductForm;
