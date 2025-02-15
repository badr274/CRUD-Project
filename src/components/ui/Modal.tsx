import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InputComponent from "./InputComponent";
import { formInputsList } from "../../data";
import ButtonComponent from "./ButtonComponent";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
}
const MyModal = ({ isOpen, closeModal, title }: IProps) => {
  const inputs = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col gap-1 my-2">
        <label htmlFor={input.id}>{input.label}</label>
        <InputComponent id={input.id} type={input.type} name={input.name} />
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
                  <div className="mt-2">{inputs}</div>

                  <div className="mt-8 flex gap-2">
                    <ButtonComponent
                      type="button"
                      className="bg-red-600"
                      onClick={closeModal}
                    >
                      Cancel
                    </ButtonComponent>
                    <ButtonComponent type="button" className="bg-blue-600">
                      Submit
                    </ButtonComponent>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default MyModal;
