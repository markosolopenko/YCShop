export interface IProduct {
  isEditable: boolean;
  id: string;
  name: string;
  price: number;
  origin: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProducts {
  page: number;
  perPage: number;
  totalItems: number;
  items: IProduct[];
}

export interface IProductsInCart {
  amount: number;
  product: IProduct;
}

export interface IUpdateProduct {
  id: string;
  product: {
    name: string;
    price: number;
    origin: string;
  };
}

export interface IProductParams {
  page: number;
  perPage: number;
  origins: string;
  minPrice: string;
  maxPrice: string;
  isEditable: boolean | null | undefined;
}
