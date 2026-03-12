import React, { useEffect, useState } from 'react';
import { fetchPokemonDetail } from '../services/pokemonService';
import './PokemonCard.css';

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemonDetail(name).then(setPokemon);
  }, [name]);

  if (!pokemon) return <div className="card loading">Cargando...</div>;

  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>#{pokemon.id}</p>
    </div>
  );
};

export default PokemonCard;