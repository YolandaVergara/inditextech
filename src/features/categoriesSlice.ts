import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../utils/products";
import { CategoriesState, Product } from "../types/categoryTypes";

const initialState: CategoriesState = {
  products,
  rows: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addRow: (state) => {
      state.rows.push({
        id: crypto.randomUUID(),
        products: [],
        template: "center",
      });
    },
    removeRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    addNewProduct: (state, action: PayloadAction<{ name: string; price: number }>) => {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        price: action.payload.price,
        imageUrl: "/assets/default-image.jpg",
      };
      state.products.push(newProduct);
    },
    addProductToRow: (state, action: PayloadAction<{ rowId: string; product: Product; alignment: "dropZone" }>) => {
      const { rowId, product, alignment } = action.payload;

      state.rows.forEach((row) => {
        row.products = row.products.filter((p) => p.product.id !== product.id);
      });

      const newRow = state.rows.find((row) => row.id === rowId);
      if (newRow && newRow.products.length < 3) {
        newRow.products.push({ product, alignment });
      }
    },
    reorderRows: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= state.rows.length || toIndex >= state.rows.length) return;

      const [movedRow] = state.rows.splice(fromIndex, 1);
      state.rows.splice(toIndex, 0, movedRow);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.products = state.products.filter((product) => product.id !== productId);

      state.rows.forEach((row) => {
        row.products = row.products.filter((p) => p.product.id !== productId);
      });
    },
    removeProductFromRow: (state, action: PayloadAction<{ rowId: string; productId: string }>) => {
      const { rowId, productId } = action.payload;

      const row = state.rows.find((r) => r.id === rowId);
      if (row) {
        row.products = row.products.filter((p) => p.product.id !== productId);
      }
    },
    setRowTemplate: (state, action: PayloadAction<{ rowId: string; template: "left" | "center" | "right" }>) => {
      const { rowId, template } = action.payload;
      const row = state.rows.find((row) => row.id === rowId);
      if (row) {
        row.template = template;
      }
    },
  },
});

export const { addRow, removeRow, addNewProduct, addProductToRow, reorderRows, removeProduct, removeProductFromRow, setRowTemplate } = categoriesSlice.actions;
export default categoriesSlice.reducer;
