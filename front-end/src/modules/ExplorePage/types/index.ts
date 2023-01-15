export interface FiltersState {
  selectedTags: Array<{ id: number; name: string }>;
  selectedColors: Array<{ id: number; name: string }>;
  selectedMaterials: Array<{ id: number; name: string }>;
  searchName: string;
}

export enum FilterType {
  selectedTags = 'selectedTags',
  selectedColors = 'selectedColors',
  selectedMaterials = 'selectedMaterials'
}
