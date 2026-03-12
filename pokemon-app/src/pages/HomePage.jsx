import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../store/slices/pokemonSlice';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { currentPage, searchTerm } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemonList({ page: currentPage, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  return (
    <div className="home-page">
      <Header />
      <main>
        <SearchBar />
        <PokemonList />
      </main>
      <Pagination />
    </div>
  );
};

export default HomePage;