import { capitalize, formatPrice, truncate } from "../utils";

const products = [
  { title: "Механическая клавиатура", price: 8900 },
  { title: 'Монитор 27"', price: 34900 },
  { title: "Подставка для ноутбука", price: 2100 },
];

export const render = (container: HTMLElement) => {
  const items = products
    .map(
      (product) => `
        <li class="product">
          <span>${truncate(product.title, 22)}</span>
          <span>${formatPrice(product.price)}</span>
        </li>
      `,
    )
    .join("");

  container.innerHTML = `
    <h2>${capitalize("каталог товаров")}</h2>
    <ul class="product-list">${items}</ul>
  `;
};
