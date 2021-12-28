import React, { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import Login from '../../pages/login';


export const withAuth = (Component) => {
    const Auth: React.FC = (props) => {
        const { user } = useContext(AuthContext);
       
        return user? (<Component {...props}/>) :(<Login/>)
    };

    return Auth;
}
