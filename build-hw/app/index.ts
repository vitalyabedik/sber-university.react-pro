import { routes } from "./routes";
import { capitalize, formatPrice, slugify, sum } from "./utils";

const PRICES = [1200, 3400, 5600];

const links = Object.keys(routes)
  .map((name) => ({ name, anchor: slugify(name) }))
  .map(({ name, anchor }) => `<a href="#${anchor}">${capitalize(name)}</a>`)
  .join(" ");

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Build HW</h1>
  <nav>${links}</nav>
  <p>Сумма скидок: ${formatPrice(sum(PRICES))}</p>
`;

const loadRoute = () =>
  window.location.hash === `#${slugify("about")}` ? routes.about() : routes.home();

loadRoute().then(({ render }) => {
  render(document.body);
});
