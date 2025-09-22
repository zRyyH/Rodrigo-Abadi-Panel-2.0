This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



ESQUEMA DO BANCO DE DADOS E-COMMERCE
=====================================

TABELAS PRINCIPAIS
==================

1. PRODUCTS (Produtos)
-----------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- status: varchar(255) NOT NULL DEFAULT 'draft'
- sort: int(11) DEFAULT NULL
- user_created: char(36) DEFAULT NULL (FK -> directus_users)
- date_created: timestamp NULL DEFAULT NULL
- user_updated: char(36) DEFAULT NULL (FK -> directus_users)
- date_updated: timestamp NULL DEFAULT NULL
- code: varchar(255) NOT NULL (UNIQUE)
- name: varchar(255) NOT NULL (UNIQUE)
- package_id: int(10) unsigned DEFAULT NULL (FK -> packages)
- quantity: int(11) NOT NULL
- purchase_cost: decimal(20,2) NOT NULL
- ncm: varchar(255) NOT NULL (UNIQUE)
- cest: varchar(255) NOT NULL (UNIQUE)
- photo: char(36) NOT NULL (FK -> directus_files)

2. PACKAGES (Embalagens)
------------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- status: varchar(255) NOT NULL DEFAULT 'draft'
- sort: int(11) DEFAULT NULL
- user_created: char(36) DEFAULT NULL (FK -> directus_users)
- date_created: timestamp NULL DEFAULT NULL
- user_updated: char(36) DEFAULT NULL (FK -> directus_users)
- date_updated: timestamp NULL DEFAULT NULL
- type_of_packaging: varchar(255) NOT NULL (UNIQUE)

3. SUPPLIER (Fornecedores)
--------------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- status: varchar(255) NOT NULL DEFAULT 'draft'
- sort: int(11) DEFAULT NULL
- user_created: char(36) DEFAULT NULL (FK -> directus_users)
- date_created: timestamp NULL DEFAULT NULL
- user_updated: char(36) DEFAULT NULL (FK -> directus_users)
- date_updated: timestamp NULL DEFAULT NULL
- supplier_name: varchar(255) NOT NULL (UNIQUE)

4. SALES (Vendas)
-----------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- status: varchar(255) NOT NULL DEFAULT 'draft'
- sort: int(11) DEFAULT NULL
- user_created: char(36) DEFAULT NULL (FK -> directus_users)
- date_created: timestamp NULL DEFAULT NULL
- user_updated: char(36) DEFAULT NULL (FK -> directus_users)
- date_updated: timestamp NULL DEFAULT NULL
- product_name: varchar(255) NOT NULL (UNIQUE)
- ad_number: varchar(255) NOT NULL (UNIQUE)
- customer_name: varchar(255) NOT NULL
- customer_nickname: varchar(255) NOT NULL
- sale_date: varchar(255) NOT NULL
- product_code: varchar(255) NOT NULL
- shipping_method: varchar(255) NOT NULL
- sales_number: varchar(255) NOT NULL (UNIQUE)
- invoice_number: varchar(255) NOT NULL (UNIQUE)

5. INVOICE (Notas Fiscais)
--------------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- status: varchar(255) NOT NULL DEFAULT 'draft'
- sort: int(11) DEFAULT NULL
- user_created: char(36) DEFAULT NULL (FK -> directus_users)
- date_created: timestamp NULL DEFAULT NULL
- user_updated: char(36) DEFAULT NULL (FK -> directus_users)
- date_updated: timestamp NULL DEFAULT NULL
- quantity: int(11) NOT NULL
- ncm: varchar(255) NOT NULL (UNIQUE)
- cest: varchar(255) NOT NULL (UNIQUE)
- origin: int(10) unsigned NOT NULL (FK -> origins)
- product_name: varchar(255) NOT NULL (UNIQUE)

6. ORIGINS (Origens)
--------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- status: varchar(255) NOT NULL DEFAULT 'draft'
- sort: int(11) DEFAULT NULL
- user_created: char(36) DEFAULT NULL (FK -> directus_users)
- date_created: timestamp NULL DEFAULT NULL
- user_updated: char(36) DEFAULT NULL (FK -> directus_users)
- date_updated: timestamp NULL DEFAULT NULL
- origin: varchar(255) NOT NULL

TABELAS DE RELACIONAMENTO
==========================

1. PRODUCTS_SUPPLIER (Produtos-Fornecedores)
--------------------------------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- products_id: int(10) unsigned DEFAULT NULL (FK -> products)
- supplier_id: int(10) unsigned DEFAULT NULL (FK -> supplier)

2. PRODUCTS_FILES (Produtos-Arquivos)
-------------------------------------
- id: int(10) unsigned NOT NULL AUTO_INCREMENT (PK)
- products_id: int(10) unsigned DEFAULT NULL (FK -> products)
- directus_files_id: char(36) DEFAULT NULL (FK -> directus_files)

RELACIONAMENTOS PRINCIPAIS
===========================

1. PRODUCTS relaciona com:
   - PACKAGES (1:N) através de package_id
   - SUPPLIER (N:N) através de products_supplier
   - DIRECTUS_FILES (N:N) através de products_files
   - DIRECTUS_FILES (1:1) através de photo (foto principal)

2. INVOICE relaciona com:
   - ORIGINS (N:1) através de origin

3. Todas as tabelas principais relacionam com:
   - DIRECTUS_USERS através de user_created e user_updated

CAMPOS IMPORTANTES
==================

NCM (Nomenclatura Comum do Mercosul): Usado em products e invoice
CEST (Código Especificador da Substituição Tributária): Usado em products e invoice
Status: Campo padrão em todas as tabelas principais (draft, published, etc.)
Códigos únicos: code, name, ncm, cest em products
Rastreabilidade: user_created, date_created, user_updated, date_updated

OBSERVAÇÕES
===========

- Engine: InnoDB
- Charset: utf8mb3 com collation utf8mb3_general_ci
- Todas as tabelas têm campos de auditoria (user_created, date_created, etc.)
- Muitos campos têm constraints UNIQUE para evitar duplicação
- Foreign keys configuradas com ON DELETE apropriadas
- Sistema integrado com Directus CMS