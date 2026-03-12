import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../store/slices/pokemonSlice';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, count } = useSelector((state) => state.pokemon);
  const totalPages = Math.ceil(count / 6);

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setPage(currentPage + 1));
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;