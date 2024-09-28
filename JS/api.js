const URL_BASE = " https://gateway.marvel.com";
const endpoint = "/v1/public/characters";
const timeStamp = "1727532769313";
const apiKey = "1b63d592461d467bc6014fd03b8f3bb2";
const md5 = "1f55adff26a623421729603f567a241d";
const URL_COMPLETA = `${URL_BASE}${endpoint}?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;
const api = {
  async buscarPersonagens() {
    try {
      const response = await fetch(URL_COMPLETA);
      const dados = await response.json();
      console.log(dados);
      return dados;
    } catch (error) {
      alert("Erro ao buscar pensamentos");
      throw error;
    }
  },
  async criandoCard() {
    try {
      const resultados = await api.buscarPersonagens();
      resultados.data.results.forEach((element) => {
        const srcImage =
          element.thumbnail.path + "." + element.thumbnail.extension;
        const nomeHeroi = element.name;
        console.table(srcImage, nomeHeroi);
      });
    } catch (error) {
      alert("Erro ao criar card");
      throw error;
    }
  },
};
document.addEventListener("DOMContentLoaded", () => {
  api.criandoCard();
});
