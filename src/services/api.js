export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}}&q=${query}`);
  const data = await response.json();
  return data;
}

export async function getProductById(query) {
  const response = await fetch(`https://api.mercadolibre.com/items/${query}`);
  const data = await response.json();
  return data;
}

export async function getProductByQuery(query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await response.json();
  return data.results;
}

export async function getProductByCategory(category) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
  const data = await response.json();
  return data.results;
}
