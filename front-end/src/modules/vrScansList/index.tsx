import React, { useEffect, useState } from 'react';
import VrScanItem from './components/VrScanItem';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScansList = () => {
  const [vrScansData, setVrScansData] = useState<VrScan[] | null>(null);

  const endpoint = 'http://localhost:1337/vrscans';
  useEffect(() => {
    fetch(endpoint)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        response
          .json()
          .then((el) => {
            console.log(el);
            setVrScansData(el);
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
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 20%)',
        placeItems: 'center'
      }}
    >
      {vrScansData?.map((vrScan) => {
        return <VrScanItem key={vrScan.id} vrScanObject={vrScan} />;
      })}
    </div>
  );
};

export default VrScansList;
