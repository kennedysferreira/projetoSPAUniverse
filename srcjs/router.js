import * as element from "./elements.js";

export class Router {
  constructor() {
    this.routes = {};
  }

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  // Método para tratar os eventos de navegação
  route(event) {
    event.preventDefault();
    const pathname = event.target.pathname;
    window.history.pushState({}, "", pathname);
    this.handle(pathname);
  }

  // Método para renderizar o conteúdo da rota atual
  handle(pathname) {
    const route = this.routes[pathname] || this.routes["/404"];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        element.app.innerHTML = html;
      });
  }

  // Inicializa os links na página
  initializeLinks() {
    element.links.forEach((link) => {
      link.addEventListener("click", this.route.bind(this));
    });
    this.handle(window.location.pathname);
  }
}
