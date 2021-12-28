import React, { useContext, useCallback, useState,FormEvent} from 'react';
import Head from 'next/head';


import CircularProgress from '@mui/material/CircularProgress';

import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, SignIn, ForgotPassword } from './styles';


interface LoginProps {
  [email: string]: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginProps>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);


  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    const newLoginData: LoginProps = loginData;

    newLoginData[name] = value;

    setLoginData(newLoginData);
  }, [loginData]);


  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    
    signIn(loginData);

    setLoading(false);
  }, []);



  return(
    <>
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      
      <Content onSubmit={handleSubmit}>  
        <SignIn>
          <h1>Sign in</h1>
          <span>Entre e procure serviços que necessite</span>
        </SignIn>

        <Input 
          type='email' 
          name='email'
          placeholder='E-mail'
          onChange={(e) => handleChange(e)}
          required
        />
        
        <Input 
          type='password'
          name='password'
          placeholder='Senha'
          onChange={(e) => handleChange(e)}
          required
        />

        <ForgotPassword>
          <a href="">Esqueci minha senha</a>
        </ForgotPassword>

        <Button type='submit'>
          { loading ?<CircularProgress/> :'Login' }
        </Button>
      </Content>
    </Container>
    </>
  );
}
