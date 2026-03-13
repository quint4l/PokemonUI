import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonByType } from '../../services/pokemonService';

export const getPokemonList = createAsyncThunk(
  'pokemon/getList',
  async ({ page, searchTerm, filterType }) => {
    // Si hay filtro por tipo
    if (filterType && filterType !== 'all') {
      const response = await fetchPokemonByType(filterType);
      let pokemons = response.pokemon.map(p => p.pokemon);

      if (searchTerm) {
        pokemons = pokemons.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const count = pokemons.length;
      const offset = (page - 1) * 6;
      const paginated = pokemons.slice(offset, offset + 6);

      return {
        results: paginated,
        count: count,
      };
    } 
    // Sin filtro de tipo: usar paginación normal con la API
    else {
      const offset = (page - 1) * 6;
      const response = await fetchPokemonList(6, offset);
      
      let results = response.results;
      const totalCount = response.count; // Total real de Pokémon

      // Si hay búsqueda por nombre, necesitamos filtrar localmente
      // pero eso requeriría obtener todos... Es un compromiso.
      // Para búsqueda, mantendremos el enfoque anterior.
      if (searchTerm) {
        // Obtenemos una lista grande para filtrar
        const allResponse = await fetchPokemonList(1000, 0);
        const filtered = allResponse.results.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const offset = (page - 1) * 6;
        const paginated = filtered.slice(offset, offset + 6);
        return {
          results: paginated,
          count: filtered.length,
        };
      }

      return {
        results: results,
        count: totalCount,
      };
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    count: 0,
    loading: false,
    error: null,
    currentPage: 1,
    searchTerm: '',
    filterType: 'all', // Nuevo estado para el filtro de tipo
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reiniciar a primera página al buscar
    },
    // Nuevo reducer para cambiar el filtro de tipo
    setFilterType: (state, action) => {
      state.filterType = action.payload;
      state.currentPage = 1; // Reiniciar a primera página al filtrar
    },
    // Nuevo reducer para resetear todos los filtros
    resetFilters: (state) => {
      state.searchTerm = '';
      state.filterType = 'all';
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(getPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // En caso de error, vaciamos la lista para evitar undefined
        state.list = [];
      });
  },
});

// Exportamos las acciones nuevas junto con las existentes
export const { setPage, setSearchTerm, setFilterType, resetFilters } = pokemonSlice.actions;
export default pokemonSlice.reducer;