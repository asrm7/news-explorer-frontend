
import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      props.singInDirect();
    }
  });
  return ((
    <Route>
      {localStorage.getItem('jwt') ? <Component {...props} /> : <Navigate to="/" />}
    </Route>
  ));
};

export default ProtectedRoute;
