import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../store/slices/pokemonSlice';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, count } = useSelector((state) => state.pokemon);
  const totalPages = Math.ceil(count / 6);

  const start = (currentPage - 1) * 6 + 1;
  const end = Math.min(currentPage * 6, count);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Mostrando {start}-{end} de {count} Pokémon
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button first"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          Primera
        </button>
        <button
          className="pagination-button prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-button page-number ${page === currentPage ? 'active' : ''}`}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="pagination-button last"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Última
        </button>
      </div>
    </div>
  );
};

export default Pagination;