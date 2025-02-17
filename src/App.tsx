import AddProductForm from "./components/FormContainer/AddProductForm";
import ProductList from "./components/ProductsContainer/ProductList";
import EditorContainer from "./components/EditorContainer/EditorContainer";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1 className="header">ZARA Jeans</h1>
      <div className="container">
        <div className="editor-container">
          <EditorContainer />
        </div>
        <div className="product-container">
          <AddProductForm />
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default App;