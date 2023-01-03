import { TextField } from 'modules/common/components/TextField';
import React from 'react';
import FiltersComponent from './FiltersComponent';
import { useDispatch } from 'react-redux';
import { addFilter } from 'modules/ExplorePage/redux/filtersSlice';
import {
  useGetColorsFiltersQuery,
  useGetMaterialsFiltersQuery,
  useGetTagsFiltersQuery
} from 'modules/ExplorePage/redux/filtersService';
import { FilterType } from 'modules/ExplorePage/types';

const FiltersContainer = () => {
  const dispatch = useDispatch();

  const { data: tagsFilters } = useGetTagsFiltersQuery({});
  const { data: colorsFilters } = useGetColorsFiltersQuery({});
  const { data: materialsFilters } = useGetMaterialsFiltersQuery({});

  return (
    <div
      style={{
        width: '196px',
        padding: '16px',
        position: 'sticky',
        top: '0px'
      }}
    >
      Filters Container
      <TextField placeholder="Search" />
      <FiltersComponent title="Material">
        {materialsFilters?.map((filterItem) => (
          <div key={filterItem.name}>
            <input
              type="checkbox"
              onChange={(e) => {
                dispatch(
                  addFilter({ filterType: FilterType.selectedMaterials, id: filterItem.id })
                );
              }}
            />{' '}
            {filterItem.name}
          </div>
        ))}
      </FiltersComponent>
      <FiltersComponent title="Color">
        {colorsFilters?.map((filterItem) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
            key={filterItem.name}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                dispatch(addFilter({ filterType: FilterType.selectedColors, id: filterItem.id }));
              }}
            />{' '}
            <span>{filterItem.name}</span>
            <span
              style={{
                width: '16px',
                height: '16px',
                background: filterItem.hex,
                borderRadius: '4px',
                display: 'inline-block',
                marginRight: '8px'
              }}
            ></span>
          </div>
        ))}
      </FiltersComponent>
      <FiltersComponent title="Tag">
        {tagsFilters?.map((filterItem) => (
          <div key={filterItem.name}>
            <input
              type="checkbox"
              onChange={(e) => {
                dispatch(addFilter({ filterType: FilterType.selectedTags, id: filterItem.id }));
              }}
            />{' '}
            {filterItem.name}
          </div>
        ))}
      </FiltersComponent>
    </div>
  );
};

export default FiltersContainer;