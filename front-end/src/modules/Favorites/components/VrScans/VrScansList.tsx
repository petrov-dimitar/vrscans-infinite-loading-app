import React from 'react';
import VrScanItem from './VrScanItem';
import { useGetFavoritesScansForUserQuery } from 'modules/ExplorePage/redux/vrScansService';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScansList = () => {
  // Using a query hook automatically fetches data and returns query values
  const { data } = useGetFavoritesScansForUserQuery({});

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 20%)',
        placeItems: 'center',
        flexGrow: '1'
      }}
    >
      {data?.favorites?.map((vrScan) => {
        return <VrScanItem key={vrScan.id} vrScanObject={vrScan} />;
      })}
    </div>
  );
};

export default VrScansList;
