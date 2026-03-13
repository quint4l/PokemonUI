import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../../store/slices/pokemonSlice';   
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import PokemonList from '../../components/PokemonList/PokemonList';
import Pagination from '../../components/Pagination/Pagination';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { currentPage, searchTerm, filterType } = useSelector((state) => state.pokemon);

  useEffect(() => {
    // Cada vez que cambie la página, el término de búsqueda o el filtro de tipo,
    // se dispara la petición para obtener los Pokémon correspondientes.
    dispatch(getPokemonList({ page: currentPage, searchTerm, filterType }));
  }, [dispatch, currentPage, searchTerm, filterType]);

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