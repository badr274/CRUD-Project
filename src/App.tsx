import { useState } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Modal";
import { productList } from "./data";
import ButtonComponent from "./components/ui/ButtonComponent";

function App() {
  // Renders
  const renderProductsList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <main className="container mx-auto md:px-6">
      <ButtonComponent
        type="button"
        onClick={openModal}
        className={"bg-red-600"}
      >
        Open Modal
      </ButtonComponent>
      <div className="p-2 m-5 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch ">
        {renderProductsList}
      </div>
      <MyModal isOpen={isOpen} closeModal={closeModal} title="EDIT PRODUCT" />
    </main>
  );
}

export default App;
