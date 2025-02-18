import { IProduct } from "../interfaces";
import { sliceTxt } from "../utils/functions";
import CircleColor from "./CircleColor";
import ButtonComp from "./ui/ButtonComp";

type Props = {
  product: IProduct;
  openEditModal: () => void;
  openDeleteModal: () => void;
};

const ProductCard = ({ product, openEditModal, openDeleteModal }: Props) => {
  const { imageURL, title, description, price, colors, category } = product;

  const renderProductColors = colors.length ? (
    colors.map((color, idx) => {
      return <CircleColor key={idx} color={color} />;
    })
  ) : (
    <CircleColor className="pointer-events-none" />
  );
  return (
    <div className="product-card rounded-md flex flex-col gap-y-2 p-2 shadow-md">
      <img src={imageURL} alt="product image" className="rounded-md flex-1" />
      <h3 className="font-semibold text-xl">{sliceTxt(title)}</h3>
      <p className="text-sm text-gray-600 font-semibold">
        {sliceTxt(description, 80)}
      </p>
      <div className="flex items-center gap-x-1 mt-2">
        {renderProductColors}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">${(+price).toLocaleString()}</span>
        <div className="flex items-center gap-x-1">
          <span className="text-sm">{category.name}</span>
          <img
            src={category.imageURL}
            alt="category image"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
      <div className="flex gap-x-2 items-center mt-4">
        <ButtonComp
          type="button"
          className="bg-indigo-600 hover:bg-indigo-900"
          onClick={openEditModal}
        >
          Edit
        </ButtonComp>
        <ButtonComp
          type="button"
          className="bg-pink-700 hover:bg-pink-900"
          onClick={openDeleteModal}
        >
          Remove
        </ButtonComp>
      </div>
    </div>
  );
};

export default ProductCard;
