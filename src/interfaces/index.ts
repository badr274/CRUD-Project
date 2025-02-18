export type IProduct = {
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
};

export type IFormInput = {
  id: string;
  type: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
};

export type ICategory = {
  id: string;
  name: string;
  imageURL: string;
};
