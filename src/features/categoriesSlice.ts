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
    addProductToRow: (state, action: PayloadAction<{ rowId: string; product: Product; alignment: "left" | "center" | "right" }>) => {
      const { rowId, product, alignment } = action.payload;

      state.rows.forEach((row) => {
        row.products = row.products.filter((p) => p.product.id !== product.id);
      });

      const newRow = state.rows.find((row) => row.id === rowId);
      if (newRow) {
        newRow.products.push({ product, alignment });
      }
    },
    reorderRows: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= state.rows.length || toIndex >= state.rows.length) return;

      const [movedRow] = state.rows.splice(fromIndex, 1);
      state.rows.splice(toIndex, 0, movedRow);
    },
  },
});

export const { addRow, removeRow, addNewProduct, addProductToRow, reorderRows } = categoriesSlice.actions;
export default categoriesSlice.reducer;