const API_KEY = "qWmgA6EMit7oZmgBSqIoHGYgi2ni2LEp";

const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=random&limit=18&offset=0&rating=g&lang=en`;

function descargarPersonajes(nombreABuscar) {
  const url = !nombreABuscar
    ? API_URL
    : `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${nombreABuscar}&limit=24&offset=0&rating=g&lang=en`;

  fetch(url)
    .then((res) => res.json())
    .then((response) => {
      renderizarPersonajes(response.data);
    })
    .catch((error) => console.log(error));
}

function renderizarPersonajes(listado) {
  let personajesHTML = "";
  if (listado && listado.length > 0) {
    for (let i = 0; i < listado.length; i++) {
      personajesHTML = `
                ${personajesHTML}
                <article class="item">
                    <img src="${listado[i].images.downsized_medium.url} alt=${listado[i].title}"/>
                </article>
            `;
    }
  }
  const articulosNodo = document.getElementById("articulos");
  articulosNodo.innerHTML = personajesHTML;
}

descargarPersonajes();

function buscar(event) {
  if (event.keyCode === 13) {
    const textoABuscar = event.target.value;
    descargarPersonajes(textoABuscar);
  }
}

const buscadorNodo = document.getElementById("buscadorInput");
buscadorNodo.addEventListener("keyup", buscar);
