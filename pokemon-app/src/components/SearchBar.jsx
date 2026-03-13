import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/slices/pokemonSlice';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(input));
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit"><FaSearch /> Buscar</button>
    </form>
  );
};

export default SearchBar;