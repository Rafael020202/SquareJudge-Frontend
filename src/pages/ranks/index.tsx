import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Check, Clear } from '@mui/icons-material';

import { withAuth } from '../../components/hoc';
import Container from '../../components/container';

import api from '../../services/api';
import { Ranking, gridStyles } from '../../config/constants';
import getCookiesParams from '../../utils/getCookiesParams';

interface Props {
    ranking: Ranking[]
}

const columns = [
    {
        name: 'Posição',
        width: '114px',
        selector: row => row.position,
        sortable: true,
        left: true
    },
   
    {
        name: 'Usuário',
        selector: row => row.name,
        sortable: true,
        left: true
    },
    {
        name: 'Pontos',
        cell: (row) => Number(row.points),
        sortable: true,
        right: true
    },
];



const Submissions: React.FC<Props> = ({ranking}) => {
    const [data] = useState(ranking);
    const router = useRouter();

    const handleRowClick = (row) => {
        router.push(`submissions/${row.id}`);
    }

    return(
        <Container>
            <Head>
                <title>Submissões</title>
            </Head>

             <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={gridStyles}
                highlightOnHover
		        pointerOnHover
                onRowDoubleClicked={handleRowClick}
            />
        </Container>
    )
}

export default withAuth(Submissions);

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const cookie = req.headers.cookie;

    if(!cookie) {
        
        return {
           redirect: {
               destination: '/login',
               permanent: false
           } 
        }
    }

    const { token } = getCookiesParams(req.headers.cookie);

    let response;
    try {
        response = await api.get('/ranking',{
            headers: {
                authorization: `Barer ${token}`
            }
        });
    }
    catch(error) {
        console.log(error);
    }

    return {
      props: {
        ranking: response.data
      }
    }  
}