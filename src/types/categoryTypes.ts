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

export interface Row {
  id: string;
  products: PositionedProduct[];
}

export interface CategoriesState {
  products: Product[];
  rows: Row[];
}