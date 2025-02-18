import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import ButtonComp from "./components/ui/ButtonComp";
import MyModal from "./components/ui/Modal";
import { categories, colorsList, formInputsList, productList } from "./data";
import InputComponent from "./components/ui/InputComponent";
import CircleColor from "./components/CircleColor";
import { ProductValidation } from "./validations";
import { v4 as uuid } from "uuid";
import { ICategory, IProduct } from "./interfaces";
import SelectMenu from "./components/ui/SelectMenu";
const App = () => {
  /*________STATES_________*/
  const defaultProduct = {
    id: uuid(),
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const defaultError = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
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
  const openAddModal = () => setIsAddOpen(true);
  const closeEditModal = () => setIsEditOpen(false);
  const openEditModal = () => setIsEditOpen(true);

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
    product.colors = selectedColors;
    product.category = selectedCategory;
    console.log(product);
    setProducts((prev) => [...prev, product]);
    closeAddModal();
  };

  /*________RENDERS_________*/
  // Render products
  const renderProducts = products.map((product) => {
    return <ProductCard key={product.id} product={product} />;
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
        className="p-2 rounded-md"
        style={{ backgroundColor: color }}
      >
        {color}
      </span>
    );
  });
  return (
    <div className="container mx-auto px-8">
      <ButtonComp
        type="button"
        className="bg-red-700 cursor-pointer"
        onClick={openAddModal}
      >
        Open Add Modal
      </ButtonComp>
      <ButtonComp
        type="button"
        className="bg-indigo-700 cursor-pointer"
        onClick={openEditModal}
      >
        Open Edit Modal
      </ButtonComp>
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
              Submit
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

      <MyModal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        title="EDIT PRODUCT"
      >
        <div className="mt-4">{renderInputs}</div>
      </MyModal>
      <div className="products grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4  ">
        {renderProducts}
      </div>
    </div>
  );
};

export default App;
