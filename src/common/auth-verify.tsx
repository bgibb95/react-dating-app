import React, { useEffect } from 'react';
import { Location, NavigateFunction, Params } from 'react-router-dom';
import { withRouter } from './with-router';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const AuthVerify = (props: {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  logOut: () => void;
}) => {
  const { router, logOut } = props;

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [router.location, logOut]);

  return <React.Fragment />;
};

export default withRouter(AuthVerify);
