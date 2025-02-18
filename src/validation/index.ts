// ProductObj === ErrorsObj (Title,Description,Image,Price)

export interface IProductObj {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}
export const productValidation = (product: IProductObj) => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  // Title Error
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }
  // Description Error
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 80
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters!";
  }
  // Image Error
  const regExpImageURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  if (!product.description.trim() || !regExpImageURL.test(product.imageURL)) {
    errors.imageURL = "Valid image URL is required!";
  }
  // Price Error
  if (!product.price.trim() || isNaN(+product.price)) {
    errors.price = "Valid price is required!";
  }
  return errors;
};
