import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn }) => {
    if (!loggedIn) {
        return <Navigate to="/" />;
    }
    return children; // Renderiza o componente filho (children)
};

export default ProtectedRoute;