import React, { createContext, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter'
import sweetalert from 'sweetalert';

import { User } from '../config/constants';
import api from '../services/api';

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn: Function;
  signOut: Function;
  token: string;
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

  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    const token = handleLocalStorage('getItem', '@EService:token');
    const user = handleLocalStorage('getItem', '@EService:user');

    if(token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState;
  });

  const signIn = useCallback( async ( { email, password } ) => {
   
    try {
      const response = await api.post('/session', {
        email,
        password
      }) as { data: AuthState };

      handleLocalStorage('setItem','@EService:token',response.data.token);
      handleLocalStorage('setItem','@EService:user', JSON.stringify(response.data.user));

      setData(response.data);
      
      cookieCutter.set('token', response.data.token);
      cookieCutter.set('uid', response.data.user.id);

      router.push('/');
    }
    catch(e) {
      sweetalert({
        title: "Error!!",
        text: e.response.data.message,
        icon: "error",
      });
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@EService:token');
    localStorage.removeItem('@EService:token');

    setData({} as AuthState);
  }, []);

  return(
    <AuthContext.Provider value={ { user: data.user, signIn, signOut, token: data.token } }>
      {children}
    </AuthContext.Provider>
  );
}


