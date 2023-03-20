export const GetSavedProduct = () => {
  const cartProducts = localStorage.getItem('CartsProduct');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

export const GetSavedProductQuantity = () => {
  const cartProducts = localStorage.getItem('ProductQuantity');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

const GetQuantityProduct = () => {
  const productSaved = GetSavedProduct();
  const finalQuantity = productSaved.reduce((acc, product) => {
    const FilteredProduct = productSaved.filter((prod) => (prod.id === product.id));
    acc = [...acc, {
      productCart: FilteredProduct[0],
      quantityCart: FilteredProduct.length,
    }];
    return acc;
  }, []);
  const ArrayToString = finalQuantity.map((value) => JSON.stringify(value));
  const RemoveDuplicate = ArrayToString.filter((value, index) => (
    ArrayToString.indexOf(value) === index)).map((value) => JSON.parse(value));
  localStorage.setItem('ProductQuantity', JSON.stringify(RemoveDuplicate));
};

export const SaveProduct = (product) => {
  const productSaved = GetSavedProduct();
  const ListProducts = [...productSaved, product];
  localStorage.setItem('CartsProduct', JSON.stringify(ListProducts));
  GetQuantityProduct();
};
