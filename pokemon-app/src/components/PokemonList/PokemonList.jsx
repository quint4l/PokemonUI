import React from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

import './PokemonList.css';

const PokemonList = () => {
  const { list, loading, error } = useSelector((state) => state.pokemon);

  if (loading) return <div className="loading">Cargando Pokémon...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (list.length === 0) return <div className="no-results">No se encontraron Pokémon</div>;

  return (
    <div className="pokemon-list">
      {list.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
};

export default PokemonList;
