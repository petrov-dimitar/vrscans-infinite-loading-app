import React, { useCallback, useEffect, useState } from 'react';
import VrScanItem from './VrScanItem';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScansList = () => {
  const [vrScansData, setVrScansData] = useState<VrScan[] | null>(null);
  const [shownData, setShownData] = useState<VrScan[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (vrScansData !== null) {
      setShownData([...vrScansData]?.slice(0, currentPage * 25));
    }
  }, [currentPage, vrScansData]);

  const updatePage = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const finalPercentage = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);
    if (finalPercentage === 100) {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updatePage, { passive: true });

    return () => window.removeEventListener('scroll', updatePage);
  });

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
        placeItems: 'center',
        flexGrow: '1'
      }}
    >
      {shownData?.map((vrScan) => {
        return <VrScanItem key={vrScan.id} vrScanObject={vrScan} />;
      })}
    </div>
  );
};

export default VrScansList;
