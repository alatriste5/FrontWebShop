
export interface ProductDto {
  id: number;
  name: string;
  price: number;
  details: string;
  sellerid: number;
  customerid?: number;
  soldat?: string;
  image?: string;
  valid?: number;
  //sellername?: string;
}
