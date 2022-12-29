import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  selectedTags: number[];
  selectedColors: number[];
  selectedMaterials: number[];
}

export enum FilterType {
  selectedTags = 'selectedTags',
  selectedColors = 'selectedColors',
  selectedMaterials = 'selectedMaterials'
}

const initialState: FiltersState = {
  selectedTags: [],
  selectedColors: [],
  selectedMaterials: []
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<{ filterType: FilterType; id: number }>) => {
      console.log('staet', state);
      console.log('filterType', action.payload.filterType);
      console.log('id', action.payload.id);

      
      if (state[action.payload.filterType].includes(action.payload.id)) {
          
          console.log("includes");
        // Remove
        state[action.payload.filterType] = [...state[action.payload.filterType]].filter(
          (el: number) => el !== action.payload.id
        );
      } else {
        // Add
        state[action.payload.filterType] = [...state[action.payload.filterType], action.payload.id];
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { addFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
