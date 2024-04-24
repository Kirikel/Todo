This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone this repository and install all dependencies

```bash
git clone <link>
# after install all dependencies
npm install
# or
yarn install


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Rest Api for this project
Для этого проекта я бы создал следующий REST API, который по моему мнению будет удобен в дальнейшем масштабирования проекта совместно с CRUD-операциями.

- GET /orders: Возвращает список всех заявок. Может включать параметры запроса для фильтрации и сортировки.
- POST /orders: Создает новую заявку. Тело запроса будет содержать детали заявки, такие как номер заявки, дата и время получения заявки от клиента, название фирмы клиента, ФИО перевозчика, контактный телефон перевозчика, комментарии, статус заявки и ATI код сети перевозчика.
- GET /orders/{id}: Возвращает детали конкретной заявки на основе ее ID.
- PUT /orders/{id}: Обновляет детали конкретной заявки на основе ее ID. Тело запроса будет содержать обновленные детали заявки.
- DELETE /orders/{id}: Удаляет конкретную заявку на основе ее ID.
- GET /orders/count: Возвращает количество заявок.
Каждый из этих эндпоинтов будет иметь свои собственные требования к авторизации, в зависимости от того, является ли пользователь администратором или нет.