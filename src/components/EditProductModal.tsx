import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { categories, colorsList, formInputsList } from "../data";
import { ICategory, IProduct } from "../interfaces";
import ButtonComp from "./ui/ButtonComp";
import InputComponent from "./ui/InputComponent";
import MyModal from "./ui/Modal";
import CircleColor from "./CircleColor";
import SelectMenu from "./ui/SelectMenu";
import { ProductValidation } from "../validations";
import ErrorMessage from "./ErrorMessage";

interface IProps {
  isEditOpen: boolean;
  setIsEditOpen: (isEditOpen: boolean) => void;
  product: IProduct;
  setProduct: (product: IProduct) => void;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  defaultProduct: IProduct;
  idxOfProduct: number;
}
const EditProductModal = ({
  isEditOpen,
  setIsEditOpen,
  product,
  products,
  setProduct,
  idxOfProduct,
}: IProps) => {
  const defaultError = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };
  const categoryOfProduct = categories.filter(
    (c) => c.name === product.category.name
  )[0];
  const idx = categoryOfProduct ? categories.indexOf(categoryOfProduct) : 1;
  /*________STATES_________*/
  const [errors, setErrors] = useState(defaultError);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[idx]
  );
  useEffect(() => {
    setSelectedCategory(categories[idx]);
    setSelectedColors(product.colors);
  }, [idx, product.colors]);

  /*________FUNCTIONS_________*/
  const closeEditModal = () => setIsEditOpen(false);

  const handleSelectColor = (newColor: string) => {
    const exist = selectedColors.some((color) => color === newColor);
    if (exist) {
      const filtersColors = selectedColors.filter(
        (color) => color !== newColor
      );
      errors.colors = "";
      setSelectedColors(filtersColors);
      return;
    }
    errors.colors = "";
    setSelectedColors((prev) => [...prev, newColor]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const returnedErrors = ProductValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      colors: selectedColors,
    });
    setErrors(returnedErrors);
    const hasErrorMsg =
      Object.values(returnedErrors).some((value) => value === "") &&
      Object.values(returnedErrors).every((value) => value === "");
    if (!hasErrorMsg) return;
    product.colors = selectedColors;
    product.category = selectedCategory;
    products[idxOfProduct] = product;
    setIsEditOpen(false);
  };

  /*________RENDERS_________*/
  // Render colors
  const renderColors = colorsList.map((color, idx) => {
    return (
      <CircleColor
        key={idx}
        color={color}
        onClick={() => handleSelectColor(color)}
      />
    );
  });
  // Render selected colors
  const renderSelectedColors = selectedColors?.map((color, idx) => {
    return (
      <span
        key={idx}
        className="p-1 rounded-md text-white text-sm"
        style={{ backgroundColor: color }}
      >
        {color}
      </span>
    );
  });
  // Render inputs
  const renderInputs = formInputsList.map((input) => {
    return (
      <div key={input.id} className="input-container flex flex-col gap-2 mt-2">
        <label htmlFor={input.id} className="text-sm font-medium text-gray-900">
          {input.label}
        </label>
        <InputComponent
          id={input.id}
          type={input.type}
          name={input.name}
          value={product ? product[input.name] : ""}
          onChange={handleInputChange}
        />
        {errors[input.name] ? (
          <span className="font-semibold text-sm text-red-700">
            {errors[input.name]}
          </span>
        ) : null}
      </div>
    );
  });
  return (
    <MyModal
      title="EDIT PRODUCT"
      isOpen={isEditOpen}
      closeModal={closeEditModal}
    >
      <form onSubmit={handleEditSubmit} className="mt-4">
        <div>{renderInputs}</div>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          {renderSelectedColors}
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          {renderColors}
        </div>
        <ErrorMessage msg={errors.colors} />
        <SelectMenu
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <div className="mt-7 flex items-center gap-x-2">
          <ButtonComp
            type="submit"
            className="bg-indigo-300 hover:bg-indigo-500"
          >
            Edit
          </ButtonComp>
          <ButtonComp
            type="button"
            className="bg-gray-300 hover:bg-gray-500"
            onClick={closeEditModal}
          >
            Cancel
          </ButtonComp>
        </div>
      </form>
    </MyModal>
  );
};

export default EditProductModal;
