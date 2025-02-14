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
    }
  },
});

export const { addRow, removeRow, addNewProduct, addProductToRow } = categoriesSlice.actions;
export default categoriesSlice.reducer;