import api from "./api.js";

const galeria = document.querySelector(".hero-gallery");
const btnAnterior = document.createElement("button");
const btnProximo = document.createElement("button");
const divBotoes = document.querySelector(".pagination-buttons");

btnAnterior.textContent = "Anterior";
btnProximo.textContent = "Próximo";
divBotoes.appendChild(btnAnterior);
divBotoes.appendChild(btnProximo);

const ui = {
  currentPage: 0,
  async criandoCard(page) {
    try {
      const resultados = await api.buscarPersonagens(page);
      galeria.innerHTML = "";
      resultados.data.results.forEach((element) => {
        const linkWiki = document.createElement("a");
        const heroCard = document.createElement("div");
        heroCard.classList.add("hero-card");
        const srcImage =
          element.thumbnail.path + "." + element.thumbnail.extension;
        const nomeHeroi = element.name;
        const descriçãoHeroi = element.description;
        const linkHeroi = element.urls.find(
          (item) => item.type === "comiclink"
        ).url;
        heroCard.innerHTML = `<img
          src="${srcImage}"
          alt="${nomeHeroi}"
          class="hero-image"
        />
        <h2>${nomeHeroi}</h2>
        <p>
          ${descriçãoHeroi}
        </p>`;
        linkWiki.href = linkHeroi;
        linkWiki.target = "_blank";

        linkWiki.appendChild(heroCard);
        galeria.appendChild(linkWiki);
      });
    } catch (error) {
      alert("Erro ao criar card");
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

// Adiciona eventos aos botões
btnAnterior.addEventListener("click", () => ui.irParaPaginaAnterior());
btnProximo.addEventListener("click", () => ui.irParaProximaPagina());

export default ui;
