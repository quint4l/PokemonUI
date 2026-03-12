import axios from 'axios';

const API_BASE = 'https://pokeapi.co/api/v2';

// Obtener lista de Pokémon con paginación
export const fetchPokemonList = async (limit, offset) => {
  const response = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

// Obtener detalles de un Pokémon por nombre (para las tarjetas)
export const fetchPokemonDetail = async (name) => {
  const response = await axios.get(`${API_BASE}/pokemon/${name}`);
  return response.data;
};
