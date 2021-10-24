import React, { createContext, useCallback, useState } from 'react';
import sweetalert from 'sweetalert';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn: Function;
  signOut: Function;
}

export const AuthContext = createContext<AuthContextData>( {} as AuthContextData );

export const AuthProvider: React.FC = ({ children }) => {

  const handleLocalStorage = (action:string, key:string, data?:string) => {
    const client = typeof(window) !== 'undefined';

    switch(action) {
      case 'setItem':
        return client ?localStorage.setItem(key,data) :'';
      case 'removeItem':
        return client ?localStorage.removeItem(key): '';
      case 'getItem':
        return client ?localStorage.getItem(key) :'';
    }

  }
  
  const [ data, setData ] = useState<AuthState>(() => {
    const token = handleLocalStorage('getItem', '@EService:token');
    const user = handleLocalStorage('getItem', '@EService:user');

    if(token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ( { email, password } ) => {
   
    try {
      const response = await api.post('/session', {
        email,
        password
      }) as { data: AuthState };

      handleLocalStorage('setItem','@EService:token',response.data.token);
      handleLocalStorage('setItem','@EService:user', JSON.stringify(response.data.user));

      setData(response.data);
    }
    catch(e) {
      sweetalert({
        title: "Error!!",
        text: 'ERRO!!!!',
        icon: "error",
      });
    }
  }, []);

  const signOut = useCallback(() => {
    //localStorage.removeItem('@EService:token');
    //localStorage.removeItem('@EService:token');

    setData({} as AuthState);
  }, []);

  return(
    <AuthContext.Provider value={ { user: data.user, signIn, signOut } }>
      {children}
    </AuthContext.Provider>
  );
}


