import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import ImageComponent from "./ImageComponent";
import ButtonComponent from "./ui/ButtonComponent";
import RoundedColor from "./ui/RoundedColor";

interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { imageURL, title, description, price, colors } = product;
  const roundedColors = colors.map((color, id) => (
    <RoundedColor key={id} color={color} />
  ));
  return (
    <div className="rounded-md mx-auto md:mx-0 max-w-sm md:mx-w-lg  overflow-hidden p-2 flex flex-col ">
      <ImageComponent
        imageURL={imageURL}
        alt="product image"
        className="max-w-full rounded-md"
      />
      <h3>{title}</h3>
      <p>{txtSlicer(description, 70)}</p>
      <div className="colors flex items-center gap-x-1 my-2">
        {roundedColors}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium">{`$${price}`}</span>
        <ImageComponent
          imageURL={imageURL}
          alt="product image"
          className="rounded-full w-10 h-10 object-center"
        />
      </div>
      <div className="flex items-center gap-x-1 my-4">
        <ButtonComponent
          type="button"
          className=" flex-1 bg-indigo-700"
          width="w-full"
        >
          Edit
        </ButtonComponent>
        <ButtonComponent type="button" className="flex-1 bg-red-700">
          Destroy
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ProductCard;
