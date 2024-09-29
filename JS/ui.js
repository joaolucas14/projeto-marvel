import api from "./api.js";

const galeria = document.querySelector(".hero-gallery");
const btnAnterior = document.createElement("button");
const btnProximo = document.createElement("button");
const divBotoes = document.querySelector(".pagination-buttons");
const inputFiltro = document.querySelector("#campo-busca");
btnAnterior.textContent = "Anterior";
btnProximo.textContent = "Próximo";
divBotoes.appendChild(btnAnterior);
divBotoes.appendChild(btnProximo);

const ui = {
  currentPage: 0,
  async criandoCard(page) {
    try {
      const resultados = await api.buscarPersonagens(page);
      this.renderizarCards(resultados.data.results);
    } catch (error) {
      alert("Erro ao criar card");
      throw error;
    }
  },
  renderizarCards(personagens) {
    galeria.innerHTML = ""; // Limpa a galeria antes de adicionar os novos personagens
    personagens.forEach((element) => {
      const linkWiki = document.createElement("a");
      const heroCard = document.createElement("div");
      heroCard.classList.add("hero-card");

      const srcImage =
        element.thumbnail.path + "." + element.thumbnail.extension;
      const nomeHeroi = element.name;
      const descriçãoHeroi = element.description || "Descrição não disponível";
      const linkHeroi =
        element.urls.find((item) => item.type === "comiclink")?.url || "#";

      heroCard.innerHTML = `
        <img src="${srcImage}" alt="${nomeHeroi}" class="hero-image" />
        <h2>${nomeHeroi}</h2>
        <p>${descriçãoHeroi}</p>
      `;

      linkWiki.href = linkHeroi;
      linkWiki.target = "_blank";
      linkWiki.appendChild(heroCard);
      galeria.appendChild(linkWiki);
    });
  },
  async buscarPersonagensFiltrados(filtro) {
    try {
      const resultados = await api.buscarPersonagensFiltrados(filtro);
      this.renderizarCards(resultados.data.results); // Renderiza os personagens filtrados
    } catch (error) {
      alert("Erro ao buscar personagens filtrados");
      throw error;
    }
  },
  async irParaPaginaAnterior() {
    if (this.currentPage > 0) {
      this.currentPage--;
      await this.criandoCard(this.currentPage);
    }
  },

  // Método para ir para a próxima página
  async irParaProximaPagina() {
    this.currentPage++;
    await this.criandoCard(this.currentPage);
  },
};
inputFiltro.addEventListener("input", async () => {
  const filtro = inputFiltro.value.trim();
  if (filtro) {
    await ui.buscarPersonagensFiltrados(filtro); // Busca e renderiza os personagens filtrados
  } else {
    ui.criandoCard(ui.currentPage); // Volta a exibir a paginação quando não houver filtro
  }
});
// Adiciona eventos aos botões
btnAnterior.addEventListener("click", () => ui.irParaPaginaAnterior());
btnProximo.addEventListener("click", () => ui.irParaProximaPagina());

export default ui;
