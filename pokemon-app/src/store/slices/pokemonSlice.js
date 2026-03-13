import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonByType } from '../../services/pokemonService'; // Importamos la nueva función

// Acción asíncrona para obtener la lista de Pokémon (ahora con filterType)
export const getPokemonList = createAsyncThunk(
  'pokemon/getList',
  async ({ page, searchTerm, filterType }) => {
    let pokemons = [];

    // 1. Si hay filtro por tipo y no es 'all', obtenemos de la API de tipos
    if (filterType && filterType !== 'all') {
      const response = await fetchPokemonByType(filterType);
      // La API de tipo devuelve { pokemon: [{ pokemon: { name, url } }] }
      pokemons = response.pokemon.map(p => p.pokemon);
    } else {
      // Sin filtro de tipo: obtenemos una lista grande (hasta 1000)
      const response = await fetchPokemonList(1000, 0);
      pokemons = response.results;
    }

    // 2. Aplicar filtro de búsqueda por nombre (si hay)
    if (searchTerm) {
      pokemons = pokemons.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Paginación manual (6 por página)
    const count = pokemons.length;
    const offset = (page - 1) * 6;
    const paginated = pokemons.slice(offset, offset + 6);

    return {
      results: paginated,
      count: count,
    };
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