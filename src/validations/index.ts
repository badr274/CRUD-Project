interface IProps {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}
export const ProductValidation = (product: IProps) => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };
  // Title validation
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters";
  }
  // Description validation
  if (
    !product.description.trim() ||
    product.description.length < 20 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 20 and 500 characters";
  }
  // Image URL validation
  const regExpImageURL = /(http(s?):)([/|.|\w|\s|-])/g;
  if (!product.imageURL.trim() || !regExpImageURL.test(product.imageURL)) {
    errors.imageURL = "Valid image URL required";
  }
  // Price validation
  if (!product.price.trim() || isNaN(+product.price)) {
    errors.price = "Valid price is required";
  }
  // Color validation
  if (product.colors.length === 0) {
    errors.colors = "Please choose at least one color";
    console.log("Error: Invalid");
    console.log(product.colors);
  }
  return errors;
};
