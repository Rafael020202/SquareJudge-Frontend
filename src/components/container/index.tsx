import React from 'react';
import Head from 'next/head';

import Sidebar from '../sidebar';
import Headbar from '../headbar';
import Main from '../main';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const Container = ({children}) => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Headbar/>

                <Sidebar/>

                <Main>
                    {children}
                </Main>
            </Box>
        </>
    );
}

export default Container;