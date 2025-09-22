export const settings = {
  api_token: process.env.NEXT_PUBLIC_API_BEARER_TOKEN,
  api_url: process.env.NEXT_PUBLIC_API_URL,
  directus_url: process.env.NEXT_PUBLIC_DIRECTUS_URL,
  key_cookie: process.env.NEXT_PUBLIC_AUTH_KEY,
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