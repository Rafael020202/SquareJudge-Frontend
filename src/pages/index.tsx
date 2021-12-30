import React, { useContext } from 'react';
import Head from 'next/head';

import { Card, CardHeader, CardContent, Grid, Typography } from '@mui/material';


import { withAuth } from '../components/hoc';
import Container from '../components/container';
import PieChart from '../components/pieChart';



const Home: React.FC = () => {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container>
        <Grid container spacing={1}> 
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <Card >
              <CardHeader
                title='SUBMISSÕES'
              />
              
              <CardContent>
                <Typography variant='h2'>340</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <Card>
              <CardHeader
                title='RESOLVIDO'
              />
              
              <CardContent>
                <Typography variant='h2'>200</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <Card>
              <CardHeader
                title='HARDEST (RESOLVIDO)'
              />
              
              <CardContent>
                <Typography variant='h2'>2</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <Card>
              <CardHeader
                title='HARDEST (TENTADO)'
              />
              
              <CardContent>
                <Typography variant='h2'>1002</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card sx={{height: '100%'}}>
              <CardHeader
                title='SUBMISSÕES POR RESPOSTA'
              />
              
              <CardContent sx={{height: '100%'}}>
                <PieChart/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

       
        
      </Container>
    </>
  )
}

export default withAuth(Home);


