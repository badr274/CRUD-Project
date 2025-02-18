import { ChangeEvent, FormEvent, useState } from "react";
import CircleColor from "./CircleColor";
import MyModal from "./ui/Modal";
import { categories, colorsList, formInputsList } from "../data";
import { ICategory, IProduct } from "../interfaces";
import { ProductValidation } from "../validations";
import InputComponent from "./ui/InputComponent";
import SelectMenu from "./ui/SelectMenu";
import ButtonComp from "./ui/ButtonComp";
import { v4 as uuid } from "uuid";
interface IProps {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  isAddOpen: boolean;
  setIsAddOpen: (isAddOpen: boolean) => void;
  defaultProduct: IProduct;
}
const AddProductModal = ({
  isAddOpen,
  setIsAddOpen,
  products,
  setProducts,
  defaultProduct,
}: IProps) => {
  /*________STATES_________*/

  const defaultError = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  const [product, setProduct] = useState<IProduct>(defaultProduct);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[3]
  );
  const [errors, setErrors] = useState(defaultError);
  /*________FUNCTIONS_________*/
  const closeAddModal = () => {
    setProduct(defaultProduct);
    setErrors(defaultError);
    setSelectedColors([]);
    setIsAddOpen(false);
  };

  // Handle Change inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle Canceling Modals

  // Handle Select new color
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

  // Handle Adding Product Submission
  const onAddingFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
    product.id = uuid();
    product.colors = selectedColors;
    product.category = selectedCategory;
    console.log(product);
    setProducts([...products, product]);
    closeAddModal();
  };

  /*________RENDERS_________*/
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
  return (
    <MyModal
      isOpen={isAddOpen}
      closeModal={closeAddModal}
      title="ADD A NEW PRODUCT"
    >
      <form onSubmit={onAddingFormSubmit} className="mt-4">
        <div>{renderInputs}</div>
        {renderSelectedColors.length ? (
          <div className="mt-3 flex items-center flex-wrap gap-2">
            {renderSelectedColors}
          </div>
        ) : null}
        <div className="mt-3 flex items-center gap-x-2">{renderColors}</div>
        <span className="font-semibold text-sm text-red-700">
          {errors.colors}
        </span>

        <SelectMenu
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <div className="mt-7 flex items-center gap-x-2">
          <ButtonComp
            type="submit"
            className="bg-indigo-300 hover:bg-indigo-500"
          >
            Add
          </ButtonComp>
          <ButtonComp
            type="button"
            className="bg-gray-300 hover:bg-gray-500"
            onClick={closeAddModal}
          >
            Cancel
          </ButtonComp>
        </div>
      </form>
    </MyModal>
  );
};

export default AddProductModal;
