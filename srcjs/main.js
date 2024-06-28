let links = document.querySelectorAll("a");
let app = document.querySelector("#app");

const routes = {
  "/": "/pages/home.html",
  "/oUniverso": "/pages/oUniverso.html",
  "/exploracao": '/pages/exploracao.html'
};

const render = (route) => {
  let path = routes[route] || null
  fetch(path)
  .then((data) => data.text())
  .then((html) => app.innerHTML = html)
}

const handleClick = (event) => {
  event.preventDefault();
  let {pathname} = event.target;
  window.history.pushState({}, "", event.target.href);

  render(pathname)
};

links.forEach((link) => {
  link.addEventListener("click", handleClick);
});

render(window.location.pathname)

