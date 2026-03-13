import React from 'react';
import { CgPokemon } from 'react-icons/cg'; // Icono de Pokébola
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-area">
          <CgPokemon className="header-pokeball" />
          <h1 className="header-name">Carlos Daniel Quintal Pech</h1>
        </div>
        <div className="header-badge">
          <span className="badge-text">PokeUI</span>
          <span className="badge-version">v1.0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;