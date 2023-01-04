import { matchRoutes, useLocation } from 'react-router-dom';

const routes = [{ path: '/explore' }, { path: '/favorites' }, { path: '/profile' }];

export const useCurrentPath = () => {
  const location = useLocation();
  const route = matchRoutes(routes, location);

  return route;
};
