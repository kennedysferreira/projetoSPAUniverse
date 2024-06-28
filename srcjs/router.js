import * as element from "./elements.js";

export class Router {
  constructor() {
    this.routes = {};
  }

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event.preventDefault();
    const { pathname } = event.target;
    window.history.pushState({}, "", pathname);
    this.handle(pathname);
  }

  handle(pathname) {
    const route = this.routes[pathname] || this.routes["/404"];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        element.app.innerHTML = html;
        this.setActiveLink(pathname);
      });
  }

  setActiveLink(pathname) {
    element.links.forEach((link) => {
      if (link.getAttribute("href") === pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  initializeLinks() {
    element.links.forEach((link) => {
      link.addEventListener("click", this.route.bind(this));
    });
    this.handle(window.location.pathname);
    this.setActiveLink(window.location.pathname);
  }
}
