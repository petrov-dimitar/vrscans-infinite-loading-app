import React, { useCallback, useEffect, useState } from 'react';
import VrScanItem from './VrScanItem';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useGetVrScansWithFiltersQuery } from 'modules/ExplorePage/redux/vrScansService';
import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScansList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const selectedTags = useSelector((state: RootState) => state.filters.selectedTags);
  const selectedColors = useSelector((state: RootState) => state.filters.selectedColors);
  const selectedMaterials = useSelector((state: RootState) => state.filters.selectedMaterials);
  const selectedName = useSelector((state: RootState) => state.filters.searchName);

  const limit = 10;
  // Using a query hook automatically fetches data and returns query values
  const { data, isFetching } = useGetVrScansWithFiltersQuery({
    colors: selectedColors,
    materials: selectedMaterials,
    tags: selectedTags,
    skip: 0,
    name: selectedName,
    limit: currentPage === 1 ? 30 : 30 + currentPage * limit
  });

  useEffect(() => {
    window.addEventListener('scroll', updatePage, { passive: true });
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, selectedColors, selectedMaterials]);

  const updatePage = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const finalPercentage = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);

    if (finalPercentage === 100) {
      setCurrentPage((prev) => prev + 1);
      window.removeEventListener('scroll', updatePage);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updatePage, { passive: true });
    return () => window.removeEventListener('scroll', updatePage);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 20%)',
        placeItems: 'center',
        flexGrow: '1'
      }}
    >
      {data?.vrscans.map((vrScan) => {
        return <VrScanItem key={vrScan.id} vrScanObject={vrScan} />;
      })}
      {isFetching &&
        Array(limit).fill().map((el, index) => (
          <Stack spacing={1} key={index} direction="column" >
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} animation="wave"  />
          <Skeleton variant="rectangular" width={210} height={60} animation="wave"  />
          <Skeleton variant="rounded" width={210} height={60} animation="wave"  />
        </Stack>
        ))}
    </div>
  );
};

export default VrScansList;
