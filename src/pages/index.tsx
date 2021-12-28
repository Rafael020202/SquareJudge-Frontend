import React from 'react';
import Head from 'next/head';

import { withAuth } from '../components/hoc';
import Container from '../components/container';


const Home: React.FC = () => {
  
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container>
        <h1>Teste</h1>
      </Container>
    </>
  )
}

export default withAuth(Home);


