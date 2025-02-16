import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, memo, useState } from "react";
import InputComponent from "./InputComponent";
import { formInputsList } from "../../data";
import ButtonComponent from "./ButtonComponent";
import { IProduct } from "../../interfaces";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
}
const MyModal = memo(({ isOpen, closeModal, title }: IProps) => {
  /*_______ STATES ________*/
  const [product, setProduct] = useState<IProduct>({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    }
  })
  /*_______ HANDLERS ________*/
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setProduct({ ...product, [e.target.name]: e.target.value })
  console.log(product);
  /*_______ RENDERS ________*/
  const inputs = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col gap-1 my-2">
        <label htmlFor={input.id} className="font-medium text-sm text-gray-700">{input.label}</label>
        <InputComponent id={input.id} type={input.type} name={input.name} value={product[input.name]} onChange={handleChangeInput} />
      </div>
    );
  });
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    {title}
                  </Dialog.Title>
                  <form>
                    <div className="mt-2">{inputs}</div>

                    <div className="mt-8 flex gap-2">
                      <ButtonComponent type="submit" className="bg-indigo-500 hover:bg-indigo-600">
                        Submit
                      </ButtonComponent>
                      <ButtonComponent
                        type="button"
                        className="bg-gray-400 hover:bg-gray-500 "
                        onClick={closeModal}
                      >
                        Cancel
                      </ButtonComponent>

                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
})
export default MyModal;
