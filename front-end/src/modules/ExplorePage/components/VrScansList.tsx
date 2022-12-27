import React, { useCallback, useEffect, useState } from 'react';
import VrScanItem from './VrScanItem';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const ENDPOINT = 'http://localhost:1337/vrscans';

const useFetchFromApi = (endpoint: string, currentPageProp?: number) => {
  const [vrScansData, setVrScansData] = useState<VrScan[] | null>(null);

  let dynamicEndpoint = endpoint;

  if (currentPageProp) {
    if (currentPageProp === 1) {
      dynamicEndpoint = dynamicEndpoint + `?limit=${30}&skip=${0}`;
    } else {
      if (vrScansData) {
        dynamicEndpoint = dynamicEndpoint + `?limit=${10}&skip=${vrScansData?.length + 1}`;
      }
    }
  }

  useEffect(() => {
    fetch(dynamicEndpoint)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        response
          .json()
          .then((newScansRes) => {
            console.log('newScansRes', newScansRes);

            return setVrScansData((prev) => {
              if (prev) {
                return [...prev, ...newScansRes.vrscans];
              }
              return [...newScansRes.vrscans];
            });
          })
          .catch((er) => console.log(er));
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [currentPageProp]);

  return [vrScansData];
};

const VrScansList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vrScansData] = useFetchFromApi(ENDPOINT, currentPage);

  useEffect(() => {
    window.addEventListener('scroll', updatePage, { passive: true });
    console.log('vrScansData', vrScansData);
  }, [vrScansData]);

  const updatePage = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const finalPercentage = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);
    console.log(finalPercentage);
    if (finalPercentage === 100) {
      console.log('update page triggered');
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
      {vrScansData?.map((vrScan) => {
        return <VrScanItem key={vrScan.id} vrScanObject={vrScan} />;
      })}
    </div>
  );
};

export default VrScansList;
