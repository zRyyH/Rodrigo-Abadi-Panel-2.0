export const settings = {
  directus_url: process.env.NEXT_PUBLIC_DIRECTUS_URL,
  api_url: process.env.NEXT_PUBLIC_API_URL,
  key_cookie: 'auth',
};

export const collections = {
  supplier: "supplier",
  packages: "packages",
  products: "products",
  origins: "origins",
  invoice: "invoice",
  sales: "sales",
  nfes: "nfes",
  products_files: "products_files"
};