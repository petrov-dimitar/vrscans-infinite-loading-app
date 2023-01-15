import React from 'react';
import FiltersComponent from './FiltersComponent';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, updateSearch } from 'modules/ExplorePage/redux/filtersSlice';
import {
  useGetColorsFiltersQuery,
  useGetMaterialsFiltersQuery,
  useGetTagsFiltersQuery
} from 'modules/ExplorePage/redux/filtersService';
import { FilterType } from 'modules/ExplorePage/types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckBox from '@mui/material/Checkbox';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import FiltersChip from './FiltersChip';

const FiltersContainer = () => {
  const dispatch = useDispatch();

  const { data: tagsFilters } = useGetTagsFiltersQuery({});
  const { data: colorsFilters } = useGetColorsFiltersQuery({});
  const { data: materialsFilters } = useGetMaterialsFiltersQuery({});

  const selectedTags = useSelector((state: RootState) => state.filters.selectedTags);
  const selectedColors = useSelector((state: RootState) => state.filters.selectedColors);

  const selectedMaterials = useSelector((state: RootState) => state.filters.selectedMaterials);

  console.log('selectedTags', selectedTags);
  console.log('selectedColors', selectedColors);
  console.log('selectedMaterials', selectedMaterials);

  return (
    <div
      style={{
        width: '196px',
        padding: '16px',
        position: 'sticky',
        top: '0px'
      }}
    >
      <TextField
        onChange={(e) => {
          dispatch(updateSearch({ name: e.target.value }));
        }}
        data-cy="searchFilter"
        placeholder="Search"
        variant="standard"
        InputProps={{
          endAdornment: <ManageSearchIcon />
        }}
      />
      <div>
        <h3>Selected</h3>
        {selectedTags.map((tag) => (
          <FiltersChip key={tag.id} label={tag.name} />
        ))}
        {selectedColors.map((color) => (
          <FiltersChip key={color.id} label={color.name} />
        ))}
        {selectedMaterials.map((material) => (
          <FiltersChip key={material.id} label={material.name} />
        ))}
      </div>
      <FiltersComponent title="Material">
        {materialsFilters?.map((filterItem) => (
          <Button
            key={filterItem.name}
            data-cy="tagFilters"
            style={{
              cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans',
              fontStyle: 'normal',
              fontWeight: 200,
              fontSize: '16px',
              lineHeight: '20px',
              textTransform: 'none',
              justifyContent: 'start'
            }}
            sx={{
              paddingY: 0
            }}
            color="neutral"
            fullWidth={true}
            disabled={selectedTags.filter((tag) => filterItem.id === tag.id).length > 0}
            onClick={(e) => {
              dispatch(addFilter({ filterType: FilterType.selectedTags, filterItem }));
            }}
          >
            <CheckBox
              sx={{
                padding: '0px'
              }}
              checked={selectedTags.filter((tag) => filterItem.id === tag.id).length > 0}
            />{' '}
            {filterItem.name}
          </Button>
        ))}
      </FiltersComponent>
      <FiltersComponent title="Color">
        {colorsFilters?.map((filterItem) => (
          <Button
            key={filterItem.name}
            data-cy="tagFilters"
            style={{
              cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans',
              fontStyle: 'normal',
              fontWeight: 200,
              fontSize: '16px',
              lineHeight: '20px',
              textTransform: 'none',
              justifyContent: 'space-between'
            }}
            sx={{
              paddingY: 0
            }}
            color="neutral"
            fullWidth={true}
            disabled={selectedTags.filter((tag) => filterItem.id === tag.id).length > 0}
            onClick={(e) => {
              dispatch(addFilter({ filterType: FilterType.selectedTags, filterItem }));
            }}
          >
            <CheckBox
              sx={{
                padding: '0px'
              }}
              checked={selectedTags.filter((tag) => filterItem.id === tag.id).length > 0}
            />{' '}
            {filterItem.name}
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
          </Button>
        ))}
      </FiltersComponent>
      <FiltersComponent title="Tag">
        {tagsFilters?.map((filterItem) => (
          <Button
            key={filterItem.name}
            data-cy="tagFilters"
            style={{
              cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans',
              fontStyle: 'normal',
              fontWeight: 200,
              fontSize: '16px',
              lineHeight: '20px',
              textTransform: 'none',
              justifyContent: 'start'
            }}
            sx={{
              paddingY: 0
            }}
            color="neutral"
            fullWidth={true}
            disabled={selectedTags.filter((tag) => filterItem.id === tag.id).length > 0}
            onClick={(e) => {
              dispatch(addFilter({ filterType: FilterType.selectedTags, filterItem }));
            }}
          >
            <CheckBox
              sx={{
                padding: '0px'
              }}
              checked={selectedTags.filter((tag) => filterItem.id === tag.id).length > 0}
            />{' '}
            {filterItem.name}
          </Button>
        ))}
      </FiltersComponent>
    </div>
  );
};

export default FiltersContainer;
