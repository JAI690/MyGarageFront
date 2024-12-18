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

export interface WarehouseRecordInput {
  ProductID: string;       // ID único del producto
  name: string;
  zone: string;
  shelf: string;
  rack: string;
  niche: string;      
}

export interface WarehouseRecord {
  WarehouseID: string;
  ProductID: string;
  productName: string;
  zone: string;
  shelf: string;
  rack: string;
  niche: string;
}
