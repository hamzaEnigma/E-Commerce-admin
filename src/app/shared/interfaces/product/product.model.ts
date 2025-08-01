import { Category } from "./category.model";

export interface Product {
  productId: number;
  productName: string;
  purchasePrice?:number;
  unitsInStock?: number;
  categoryId?:number;
  category?: Category;
  imageUrl?: string;
  description?:string;
  sellPrice?:number;
  stockLimit?:number;
}