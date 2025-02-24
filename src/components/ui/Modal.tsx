import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { memo, ReactNode } from "react";

interface IProps {
  title?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const MyModal = ({ isOpen, closeModal, title, children }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10  w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-2xl text-black p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-medium text-black mb-3 text-lg"
              >
                {title}
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default memo(MyModal);
