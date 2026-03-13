import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setFilterType, resetFilters } from '../store/slices/pokemonSlice';
import { CgPokemon } from 'react-icons/cg';
import './SearchBar.css';

// Lista completa de tipos con colores
const pokemonTypes = [
  { value: 'all', label: 'Todos los tipos', color: '#777' },
  { value: 'normal', label: 'Normal', color: '#A8A878' },
  { value: 'fire', label: 'Fuego', color: '#F08030' },
  { value: 'water', label: 'Agua', color: '#6890F0' },
  { value: 'electric', label: 'Eléctrico', color: '#F8D030' },
  { value: 'grass', label: 'Planta', color: '#78C850' },
  { value: 'ice', label: 'Hielo', color: '#98D8D8' },
  { value: 'fighting', label: 'Lucha', color: '#C03028' },
  { value: 'poison', label: 'Veneno', color: '#A040A0' },
  { value: 'ground', label: 'Tierra', color: '#E0C068' },
  { value: 'flying', label: 'Volador', color: '#A890F0' },
  { value: 'psychic', label: 'Psíquico', color: '#F85888' },
  { value: 'bug', label: 'Bicho', color: '#A8B820' },
  { value: 'rock', label: 'Roca', color: '#B8A038' },
  { value: 'ghost', label: 'Fantasma', color: '#705898' },
  { value: 'dragon', label: 'Dragón', color: '#7038F8' },
  { value: 'dark', label: 'Siniestro', color: '#705848' },
  { value: 'steel', label: 'Acero', color: '#B8B8D0' },
  { value: 'fairy', label: 'Hada', color: '#EE99AC' }
];

const SearchBar = () => {
  const dispatch = useDispatch();
  const storeSearchTerm = useSelector((state) => state.pokemon.searchTerm);
  const storeFilterType = useSelector((state) => state.pokemon.filterType);

  const [localSearch, setLocalSearch] = useState(storeSearchTerm);
  const [localType, setLocalType] = useState(storeFilterType);

  // Debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== storeSearchTerm) {
        dispatch(setSearchTerm(localSearch));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch, storeSearchTerm]);

  // Sincronizar estado local con el store
  useEffect(() => {
    setLocalSearch(storeSearchTerm);
  }, [storeSearchTerm]);

  useEffect(() => {
    setLocalType(storeFilterType);
  }, [storeFilterType]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setLocalType(newType);
    dispatch(setFilterType(newType));
  };

  const handleReset = () => {
    setLocalSearch('');
    setLocalType('all');
    dispatch(resetFilters());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearch));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
           
      </form>

      <div className="filters">
        <select
          value={localType}
          onChange={handleTypeChange}
          className="type-select"
          style={{ backgroundColor: pokemonTypes.find(t => t.value === localType)?.color }}
        >
          {pokemonTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleReset} className="reset-button">
          Resetear filtros
        </button>
      </div>
    </div>
  );
};

export default SearchBar;