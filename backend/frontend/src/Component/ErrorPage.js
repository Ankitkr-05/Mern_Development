import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            Sorry! 404 Error :( <br/>
            <NavLink to="/">Redirect to Home Page</NavLink>
        </div>
    );
};

export default ErrorPage;