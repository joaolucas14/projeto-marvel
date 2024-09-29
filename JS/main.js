import api from "./api.js";
import ui from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa a primeira página de personagens ao carregar a página
  ui.criandoCard(0);

  // Adiciona o evento de filtro baseado no input de busca
  const filtroInput = document.querySelector("#campo-busca");

  filtroInput.addEventListener("input", async (event) => {
    const termoDeBusca = event.target.value.trim();

    if (termoDeBusca) {
      // Chama o método para buscar personagens filtrados
      const personagensFiltrados = await ui.buscarPersonagensFiltrados(
        termoDeBusca
      );
      ui.renderizarPersonagensFiltrados(personagensFiltrados);
    } else {
      // Se o campo de busca estiver vazio, renderiza a página normalmente
      ui.criandoCard(0);
    }
  });
});
