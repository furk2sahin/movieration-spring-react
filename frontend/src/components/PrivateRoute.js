import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ( {component: RouteComponent,...rest} ) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Route 
      {...rest}
      render={routeProps => 
        isLoggedIn ? (<RouteComponent {...routeProps} />) : <Redirect to={'/login'} />
      }
    />
  );

};


export default PrivateRoute;