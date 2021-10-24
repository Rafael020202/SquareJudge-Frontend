import React, { useContext, useCallback, useState,FormEvent} from 'react';

import { AuthContext } from '../../context/AuthContext';
import waves from '../../img/waves.svg';
import styles from './styles.module.scss';
import Input from '../../components/input';
import Button from '../../components/button';

interface LoginProps {
  [email: string]: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginProps>({ email: '', password: '' });
  const { signIn } = useContext(AuthContext);

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const key = e.currentTarget.name;
    const newLoginData: LoginProps = loginData;

    newLoginData[key] = value;

    setLoginData(newLoginData);
  }, [loginData]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(typeof(signIn));
  }, []);

  return(
    <div className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>  
        <div className={styles.signin}>
          <h1>Sign in</h1>
          <span>Entre e procure serviços que necessite</span>
        </div>

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

        <div className={styles.forgotpassword}>
          <a href="">Esqueci minha senha</a>
        </div>

        <Button type='submit'>Login</Button>

      </form>
      
      <img src={waves.src} className={styles.svg} alt="" />
    </div>
  );
}
