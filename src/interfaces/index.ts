export interface IProduct {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}
export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}
export interface IFormInput {
  type: string;
  id: string;
  name: string;
  label: string;
}
