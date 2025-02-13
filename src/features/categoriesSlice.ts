import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Row {
  id: string;
  products: [];
  alignment: 'left' | 'center' | 'right';
}

interface CategoriesState {
  rows: Row[];
}

const initialState: CategoriesState = {
  rows: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addRow: (state) => {
      const newRow: Row = {
        id: crypto.randomUUID(),
        products: [],
        alignment: 'center',
      };
      state.rows.push(newRow);
    },
    removeRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
  },
});

export const { addRow, removeRow } = categoriesSlice.actions;

export default categoriesSlice.reducer;
