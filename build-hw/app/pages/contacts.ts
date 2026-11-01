import { capitalize, repeat } from "../utils";

export const render = (container: HTMLElement) => {
  container.innerHTML = `
    <h2>${capitalize("контакты")}</h2>
    <p>Почта: hello@build-hw.dev</p>
    <p>${repeat("✉", 2)} Отдел продаж</p>
  `;
};
