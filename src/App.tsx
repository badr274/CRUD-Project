import { useState } from "react";
import ProductCard from "./components/ProductCard";
import ButtonComp from "./components/ui/ButtonComp";
import { IProduct } from "./interfaces";
import { productList } from "./data";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import DeleteProductModal from "./components/DeleteProductModal";

const App = () => {
  const defaultProduct = {
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
  /*________STATES_________*/
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [idxOfProduct, setIdxOfProduct] = useState<number>(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<IProduct>(defaultProduct);
  /*________HANDLERS_________*/
  const openAddModal = () => setIsAddOpen(true);
  const openEditModal = (product: IProduct) => {
    setIsEditOpen(true);
    setProductToEdit(product);
    setIdxOfProduct(products.indexOf(product));
  };
  const openDeleteModal = (product: IProduct) => {
    setIsDeleteOpen(true);
    setProductToDelete(product);
    setIdxOfProduct(products.indexOf(product));
  };
  const closeDeleteModal = () => setIsDeleteOpen(false);

  /*________RENDERS_________*/
  // Render products
  const renderProducts = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        openEditModal={() => openEditModal(product)}
        openDeleteModal={() => openDeleteModal(product)}
      />
    );
  });
  return (
    <div className="container mx-auto px-8">
      <ButtonComp
        type="button"
        className="bg-red-700 cursor-pointer"
        onClick={openAddModal}
      >
        Add New Product
      </ButtonComp>
      <AddProductModal
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        products={products}
        setProducts={setProducts}
        defaultProduct={defaultProduct}
      />
      <EditProductModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        product={productToEdit}
        setProduct={setProductToEdit}
        products={products}
        setProducts={setProducts}
        defaultProduct={defaultProduct}
        idxOfProduct={idxOfProduct}
      />
      <DeleteProductModal
        isDeleteOpen={isDeleteOpen}
        closeDeleteModal={closeDeleteModal}
        productToDelete={productToDelete}
        idxOfProduct={idxOfProduct}
      />
      <div className="products grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4  ">
        {renderProducts}
      </div>
    </div>
  );
};

export default App;
