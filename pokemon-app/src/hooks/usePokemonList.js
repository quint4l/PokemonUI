import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../store/slices/pokemonSlice';

export const usePokemonList = () => {
  const dispatch = useDispatch();
  const { currentPage, searchTerm, list, loading, error, count } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(getPokemonList({ page: currentPage, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  return { list, loading, error, count, currentPage };
};