import React, { useEffect, useState } from 'react';
import { fetchPokemonDetail } from '../services/pokemonService';
import './PokemonCard.css';

// Mapa de colores para los tipos de Pokémon
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetail(name)
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pokemon:', error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <div className="card loading-card">
        <div className="loading-spinner"></div>
        <p>Cargando {name}...</p>
      </div>
    );
  }

  if (!pokemon) return null;

  // Obtener tipos y sus colores
  const types = pokemon.types.map(t => t.type.name);
  const mainType = types[0];
  const cardStyle = {
     '--type-color': typeColors[mainType] || '#777',
     '--type-light': typeColors[mainType] ? `${typeColors[mainType]}40` : '#77740', // 40 = 25% opacidad
  };

  // Obtener estadísticas principales
  const stats = {
    hp: pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
    attack: pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
    defense: pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
    speed: pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
  };

  // Habilidad principal (oculta)
  const mainAbility = pokemon.abilities.find(a => !a.is_hidden)?.ability.name || 'N/A';

  return (
    <div className="card pokemon-card" style={cardStyle}>
      <div className="card-header">
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <h3 className="pokemon-name">{pokemon.name}</h3>
      </div>
      
      <div className="pokemon-image-container">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>

      <div className="pokemon-types">
        {types.map(type => (
          <span 
            key={type} 
            className="type-badge"
            style={{ backgroundColor: typeColors[type] || '#777' }}
          >
            {type}
          </span>
        ))}
      </div>

      <div className="pokemon-stats">
        <div className="stat-row">
          <span className="stat-label">HP</span>
          <div className="stat-bar-container">
            <div className="stat-bar hp-bar" style={{ width: `${(stats.hp / 255) * 100}%` }}></div>
            <span className="stat-value">{stats.hp}</span>
          </div>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Ataque</span>
          <div className="stat-bar-container">
            <div className="stat-bar attack-bar" style={{ width: `${(stats.attack / 255) * 100}%` }}></div>
            <span className="stat-value">{stats.attack}</span>
          </div>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Def.</span>
          <div className="stat-bar-container">
            <div className="stat-bar defense-bar" style={{ width: `${(stats.defense / 255) * 100}%` }}></div>
            <span className="stat-value">{stats.defense}</span>
          </div>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Vel.</span>
          <div className="stat-bar-container">
            <div className="stat-bar speed-bar" style={{ width: `${(stats.speed / 255) * 100}%` }}></div>
            <span className="stat-value">{stats.speed}</span>
          </div>
        </div>
      </div>

      <div className="pokemon-extra">
        <div className="extra-item">
          <span className="extra-label">Exp. base:</span>
          <span className="extra-value">{pokemon.base_experience || '?'}</span>
        </div>
        <div className="extra-item">
          <span className="extra-label">Habilidad:</span>
          <span className="extra-value">{mainAbility}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;