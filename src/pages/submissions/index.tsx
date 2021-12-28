import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Check, Clear } from '@mui/icons-material';

import { withAuth } from '../../components/hoc';
import Container from '../../components/container';

import api from '../../services/api';
import { Submission, gridStyles } from '../../config/constants';
import getCookiesParams from '../../utils/getCookiesParams';

interface Props {
    submissions: Submission[]
}

const columns = [
    {
        cell: (row) => {
                const { status } = row;
                
                return status === 'accepted' ?<Check style={{ fill: '#43a047' }} /> 
                                                :<Clear style={{ fill: '#FF003C' }}/>
            },
        width: '56px',
        style: {
            borderBottom: '1px solid #FFFFFF',
            marginBottom: '-1px',
        },
    },
    {
        width: '56px',
        selector: row => row.id,
        sortable: true,
        left: true
    },
   
    {
        name: 'Problema',
        selector: row => row.problem.title,
        sortable: true,
        left: true
    },
    {
        name: 'Tempo(s)',
        cell: (row) => Number(row.time),
        sortable: true,
        right: true
    },
    {
        name: 'Data/Hora',
        cell: (row) => new Date(row.created_at).toLocaleString(),
        sortable: true,
        right: true
    },
];



const Submissions: React.FC<Props> = ({submissions}) => {
    const [data] = useState(submissions);
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

    const { token, uid } = getCookiesParams(req.headers.cookie);

    let response;
    try {
        response = await api.get('/submission',{
            data: {
                user_id: uid
            },
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
        submissions: response.data
      }
    }  
}