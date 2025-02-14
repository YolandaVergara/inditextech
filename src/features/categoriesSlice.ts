import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../utils/products";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface PositionedProduct {
  product: Product;
  alignment: "left" | "center" | "right";
}

interface CategoriesState {
  products: Product[];
  rows: {
    id: string;
    products: PositionedProduct[];
  }[];
}

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
      const row = state.rows.find((r) => r.id === action.payload.rowId);
      if (row && row.products.length < 3) {
        row.products.push({
          product: action.payload.product,
          alignment: action.payload.alignment,
        });
      }
    },
  },
});

export const { addRow, removeRow, addNewProduct, addProductToRow } = categoriesSlice.actions;
export default categoriesSlice.reducer;
