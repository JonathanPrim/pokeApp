import axios from 'axios';

const API_SERVER = 'https://pokeapi.co/api/v2';

export default {
  getOnePokemon: (url) => axios.get(API_SERVER + url),

  getAllPokemons: (url) => axios.get(API_SERVER + url),
};