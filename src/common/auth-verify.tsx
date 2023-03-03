import { useEffect } from 'react';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default function AuthVerify(props: any) {
  let location = props.router.location;

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location]);

  return <div></div>;
}

//export default withRouter(AuthVerify);
