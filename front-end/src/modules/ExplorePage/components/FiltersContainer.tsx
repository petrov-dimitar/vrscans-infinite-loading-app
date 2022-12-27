import { TextField } from 'modules/common/components/TextField';
import React, { useEffect, useState } from 'react';
import FiltersComponent from './FiltersComponent';

const FiltersConteiner = () => {
  const [materialsFilters, setMaterialsFilters] = useState<any>();
  const [colorsFilters, setColorsFilters] = useState<any>();
  const [tagsFilters, setTagsFilters] = useState<any>();

  // Fetch Materials
  useEffect(() => {
    fetch(`${process.env.API_URL}/materials`)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        response
          .json()
          .then((res) => {
            setMaterialsFilters(res);
          })
          .catch((er) => console.log(er));
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  // Fetch Colors
  useEffect(() => {
    fetch(`${process.env.API_URL}/colors`)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        response
          .json()
          .then((res) => {
            setColorsFilters(res);
          })
          .catch((er) => console.log(er));
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  // Fetch Tags
  useEffect(() => {
    fetch(`${process.env.API_URL}/tags`)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        response
          .json()
          .then((res) => {
            setTagsFilters(res);
          })
          .catch((er) => console.log(er));
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

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
            <input type="checkbox" /> {filterItem.name}
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
            <input type="checkbox" /> <span>{filterItem.name}</span>
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
            <input type="checkbox" /> {filterItem.name}
          </div>
        ))}
      </FiltersComponent>
    </div>
  );
};

export default FiltersConteiner;
