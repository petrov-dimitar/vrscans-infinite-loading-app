import React from 'react';
import FiltersComponent from './FiltersComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFilter,
  removeFilter,
  updateSearch,
  clearFilters,
  areFiltersSelected
} from 'modules/ExplorePage/redux/filtersSlice';
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
import { Typography } from '@mui/material';

const FiltersContainer = () => {
  const dispatch = useDispatch();

  const { data: tagsFilters } = useGetTagsFiltersQuery({});
  const { data: colorsFilters } = useGetColorsFiltersQuery({});
  const { data: materialsFilters } = useGetMaterialsFiltersQuery({});

  const selectedTags = useSelector((state: RootState) => state.filters.selectedTags);
  const selectedColors = useSelector((state: RootState) => state.filters.selectedColors);
  const selectedMaterials = useSelector((state: RootState) => state.filters.selectedMaterials);
  const showClearFilters = useSelector((state: RootState) => areFiltersSelected(state.filters));

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
        <div
          style={{
            marginTop: '8px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Plus Jakarta Sans',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '23px',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: '#090C02'
              }}
            >
              Selected
            </Typography>

            {showClearFilters && (
              <Button
                sx={{
                  textTransform: 'lowercase',
                  fontFamily: 'Plus Jakarta Sans',
                  fontStyle: 'normal',
                  fontWeight: 200,
                  fontSize: '18px',
                  lineHeight: '23px',
                  textAlign: 'center',
                  textDecoration: 'underline',
                  color: '#7E7F9A'
                }}
                onClick={() => {
                  dispatch(clearFilters());
                }}
              >
                Clear All
              </Button>
            )}
          </div>

          {!showClearFilters && (
            <Typography
              sx={{
                fontFamily: 'Fira Sans',
                fontStyle: 'normal',
                fontWeight: 275,
                fontSize: '12px',
                lineHeight: '14px',
                color: '#7E7F9A'
              }}
            >
              You have not selected any filters.
            </Typography>
          )}
        </div>

        {selectedTags.map((tag) => (
          <FiltersChip
            key={tag.id}
            label={tag.name}
            handleDelete={() =>
              dispatch(
                removeFilter({
                  filterType: FilterType.selectedTags,
                  filterItem: tag
                })
              )
            }
          />
        ))}
        {selectedColors.map((color) => (
          <FiltersChip
            key={color.id}
            label={color.name}
            handleDelete={() =>
              dispatch(
                removeFilter({
                  filterType: FilterType.selectedColors,
                  filterItem: color
                })
              )
            }
          />
        ))}
        {selectedMaterials.map((material) => (
          <FiltersChip
            key={material.id}
            label={material.name}
            handleDelete={() =>
              dispatch(
                removeFilter({
                  filterType: FilterType.selectedMaterials,
                  filterItem: material
                })
              )
            }
          />
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
            disabled={selectedMaterials.filter((tag) => filterItem.id === tag.id).length > 0}
            onClick={(e) => {
              dispatch(addFilter({ filterType: FilterType.selectedMaterials, filterItem }));
            }}
          >
            <CheckBox
              sx={{
                padding: '0px'
              }}
              checked={selectedMaterials.filter((tag) => filterItem.id === tag.id).length > 0}
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
            disabled={selectedColors.filter((tag) => filterItem.id === tag.id).length > 0}
            onClick={(e) => {
              dispatch(addFilter({ filterType: FilterType.selectedColors, filterItem }));
            }}
          >
            <CheckBox
              sx={{
                padding: '0px'
              }}
              checked={selectedColors.filter((tag) => filterItem.id === tag.id).length > 0}
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
