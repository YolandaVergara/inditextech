import AddProductForm from "./components/FormContainer/AddProductForm";
import ProductList from "./components/ProductsContainer/ProductList";
import EditorContainer from "./components/EditorContainer/EditorContainer";

const App = () => {
  return (
    <div>
      <h1>ZARA Jeans 👖</h1>
      <AddProductForm />
      <ProductList />
      <EditorContainer />
    </div>
  );
};

export default App;