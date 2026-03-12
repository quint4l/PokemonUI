import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList} from '../../services/pokemonService';

// Acción asíncrona para obtener la lista de Pokémon
export const getPokemonList = createAsyncThunk(
  'pokemon/getList',
  async ({ page, searchTerm }) => {
    let response;
    if (searchTerm) {
      // Búsqueda: obtenemos muchos y filtramos localmente (simula "similares")
      response = await fetchPokemonList(1000, 0);
      const filtered = response.results.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const offset = (page - 1) * 6;
      const paginated = filtered.slice(offset, offset + 6);
      return {
        results: paginated,
        count: filtered.length,
      };
    } else {
      // Sin búsqueda: paginación normal
      const offset = (page - 1) * 6;
      response = await fetchPokemonList(6, offset);
      return response;
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
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reiniciar a primera página al buscar
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
      });
  },
});

export const { setPage, setSearchTerm } = pokemonSlice.actions;
export default pokemonSlice.reducer;