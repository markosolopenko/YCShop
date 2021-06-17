export interface IProduct {
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
