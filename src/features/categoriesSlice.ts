import { createSlice } from '@reduxjs/toolkit';

export interface Row {
    id: string;
    products: []; // Más adelante definiremos el tipo de producto
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
    },
});

export const { addRow } = categoriesSlice.actions;

export default categoriesSlice.reducer;

