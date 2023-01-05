export interface FiltersState {
  selectedTags: number[];
  selectedColors: number[];
  selectedMaterials: number[];
  searchName: string;
}

export enum FilterType {
  selectedTags = 'selectedTags',
  selectedColors = 'selectedColors',
  selectedMaterials = 'selectedMaterials'
}
