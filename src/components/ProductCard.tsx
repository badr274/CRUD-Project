import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import ImageComponent from "./ImageComponent";
import ButtonComponent from "./ui/ButtonComponent";
import RoundedColor from "./ui/RoundedColor";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { imageURL, title, description, price, category, colors } = product;
  const roundedColors = colors.length ? (
    colors.map((color, id) => (
      <RoundedColor key={id} className={`bg-[${color}]`} />
    ))
  ) : (
    <RoundedColor className={"visible pointer-events-none"} />
  );
  return (
    <div className="rounded-md shadow-md  mx-auto md:mx-0 max-w-sm md:mx-w-lg  overflow-hidden p-2 flex flex-col gap-y-3">
      <ImageComponent
        imageURL={imageURL}
        alt="product image"
        className="max-w-full flex-1 rounded-md lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">
        {txtSlicer(description, 80)}
      </p>
      <div className="colors flex items-center gap-x-1 ">{roundedColors}</div>

      <div className="flex items-center justify-between">
        <span className="font-medium">{`$${price}`}</span>
        <ImageComponent
          imageURL={category.imageURL}
          alt="product image"
          className="rounded-full w-10 h-10 object-center"
        />
      </div>
      <div className="flex items-center gap-x-2 mt-4">
        <ButtonComponent
          type="button"
          className=" flex-1 bg-indigo-700"
          width="w-full"
        >
          EDIT
        </ButtonComponent>
        <ButtonComponent type="button" className="flex-1 bg-red-700">
          DELETE
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ProductCard;
