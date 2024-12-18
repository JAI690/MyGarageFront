export interface Product {
  ProductID: string;
  name: string;
  barcode: string;
  productCode: string;
  zone?: string;
  shelf?: string;
  rack?: string;
  niche?: string;
}

export interface ProductInput {
  name: string;
  barcode: string;
  productCode: string;
}

export interface WarehouseRecord {
  ProductID: string;       // ID único del producto
  name: string;
  barcode: string;
  productCode: string;
  zone: string;
  shelf: string;
  rack: string;
  niche: string;      
}
