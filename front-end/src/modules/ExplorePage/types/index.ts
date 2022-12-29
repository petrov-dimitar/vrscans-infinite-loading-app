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
