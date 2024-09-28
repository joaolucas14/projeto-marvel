const URL_BASE = " https://gateway.marvel.com";
const endpoint = "/v1/public/characters";
const timeStamp = "1727532769313";
const apiKey = "1b63d592461d467bc6014fd03b8f3bb2";
const md5 = "1f55adff26a623421729603f567a241d";
const limit = 20; // Máximo 100

const api = {
  async buscarPersonagens(page = 0) {
    const offset = page * limit; // Calcula o offset
    const URL_COMPLETA = `${URL_BASE}${endpoint}?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=${limit}&offset=${offset}`;
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
};
export default api;
