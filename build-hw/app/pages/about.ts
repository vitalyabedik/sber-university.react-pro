import { capitalize, repeat } from "../utils";

export const render = (container: HTMLElement) => {
  container.innerHTML = `
    <h2>${capitalize("о проекте")}</h2>
    <p>Тренировочное приложение для урока про сборку через esbuild.</p>
    <p>${repeat("★", 3)}</p>
  `;
};
