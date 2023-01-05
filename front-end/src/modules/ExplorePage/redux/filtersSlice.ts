import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FiltersState, FilterType } from '../types';

const initialState: FiltersState = {
  selectedTags: [],
  selectedColors: [],
  selectedMaterials: [],
  searchName: ''
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<{ filterType: FilterType; id: number }>) => {
      if (state[action.payload.filterType].includes(action.payload.id)) {
        // Remove
        state[action.payload.filterType] = [...state[action.payload.filterType]].filter(
          (el: number) => el !== action.payload.id
        );
      } else {
        // Add
        state[action.payload.filterType] = [...state[action.payload.filterType], action.payload.id];
      }
    },
    updateSearch: (state, action: PayloadAction<{ name: string }>) => {
      state.searchName = action.payload.name;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addFilter, updateSearch } = filtersSlice.actions;

export default filtersSlice.reducer;
