import api from "./api.js";
const galeria = document.querySelector(".hero-gallery");
const ui = {
  async criandoCard() {
    try {
      const resultados = await api.buscarPersonagens();
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
};
export default ui;
