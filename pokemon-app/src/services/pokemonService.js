import axios from 'axios';

const API_BASE = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit, offset) => {
  const response = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchPokemonDetail = async (name) => {
  const response = await axios.get(`${API_BASE}/pokemon/${name}`);
  return response.data;
};

// Nueva función para obtener Pokémon por tipo
export const fetchPokemonByType = async (type) => {
  const response = await axios.get(`${API_BASE}/type/${type}`);
  return response.data;
};