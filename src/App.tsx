import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import RowsManager from "./components/RowsManager";

const App = () => {
  return (
    <div>
      <h1>ZARA Jeans 👖</h1>
      <AddProductForm />
      <ProductList />
      <RowsManager />
    </div>
  );
};

export default App;