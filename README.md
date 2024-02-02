![alt text](image-4.png)

# Descripcion
 Es un  comercio electrónico permite a los consumidores comprar ropa y tecnología desde la comodidad de su hogar o oficina. Esto ahorra tiempo y esfuerzo, especialmente para las personas que no tienen tiempo o acceso a las tiendas físicas.

## Correr en dev

1. clonar el directorio.
2. crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar base de datos ```docker compose up -d```
5. Correr las migraciones de prima ```npx prisma migrate dev```
6. Ejecuar seed ```npm run seed```
7. Correr proyecto ```npm run dev```
8. Limpiar el localStorage del navegador.




## Tecnologías:

Backend:

·       TypeScript

·       Prisma

·       Docker

·       Postgres

Frontend:

·       TailwindCSS

·       Zustand


## Relacion de tablas

1. Category tiene una relación uno a muchos con SubCategory y Product.
2. SubCategory tiene una relación uno a muchos con Category y Product.
3. Product tiene relaciones con ProductImage, OrderItem, Inventory, Sizes, Comments, etc.
4. OrderItem tiene relaciones con Product, Inventory, y Order.
5. Inventory tiene relaciones con Product, Sizes, y OrderItem.
6. Order tiene relaciones con User, OrderItem, y OrderAddress.
7. OrderAddress tiene una relación uno a uno con Order.
8. Otros modelos como Sizes, Comments, User, etc., también están presentes en 

## Despliegue
    url: https://market-place-bi.vercel.app
