import { IProduct } from "../interfaces";
import ButtonComp from "./ui/ButtonComp";
import MyModal from "./ui/Modal";

interface IProps {
  isDeleteOpen: boolean;
  closeDeleteModal: () => void;
  productToDelete: IProduct;
  idxOfProduct: number;
}
const DeleteProductModal = ({ isDeleteOpen, closeDeleteModal }: IProps) => {
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
        <ButtonComp type="submit" className="bg-pink-700">
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
