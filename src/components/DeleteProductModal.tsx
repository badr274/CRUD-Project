import { toast } from "react-toastify";
import { IProduct } from "../interfaces";
import ButtonComp from "./ui/ButtonComp";
import MyModal from "./ui/Modal";

interface IProps {
  isDeleteOpen: boolean;
  closeDeleteModal: () => void;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  productToDelete: IProduct;
}
const DeleteProductModal = ({
  isDeleteOpen,
  closeDeleteModal,
  products,
  setProducts,
  productToDelete,
}: IProps) => {
  const deleteToast = () =>
    toast.dark("Product deleted successfully!", {
      position: "top-left",
      icon: <>👍</>,
    });
  const handleRemoveProduct = () => {
    const filteredProducts = products.filter(
      (p) => p.id !== productToDelete.id
    );
    console.log(filteredProducts);
    setProducts(filteredProducts);
    closeDeleteModal();
    deleteToast();
  };
  return (
    <MyModal
      title="Are you sure you want to delete this product form your store?"
      isOpen={isDeleteOpen}
      closeModal={closeDeleteModal}
    >
      <p className="mt-4 text-sm text-gray-500">
        Deleting this product will remove it permanently fom your inventory, Any
        associated data sales history, and other related information will also
        be deleted, Please make sure this is the intended action
      </p>
      <div className="mt-7 flex items-center gap-x-2">
        <ButtonComp
          type="submit"
          className="bg-pink-700 hover:bg-pink-900"
          onClick={handleRemoveProduct}
        >
          Yes, remove
        </ButtonComp>
        <ButtonComp
          type="button"
          className="bg-gray-50 !text-black hover:text-white hover:bg-gray-400"
          onClick={closeDeleteModal}
        >
          Cancel
        </ButtonComp>
      </div>
    </MyModal>
  );
};

export default DeleteProductModal;
