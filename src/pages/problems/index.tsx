import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Check, Clear } from '@mui/icons-material';

import Container from '../../components/container';
import { withAuth } from '../../components/hoc';

import { Problem, gridStyles } from '../../config/constants';
import getCookiesParams from '../../utils/getCookiesParams';
import api from '../../services/api';


interface Props {
    problems: Problem[]
}


const columns = [
    {
    cell: (row) => {
            console.log('row: ', row.submissions);
            const { submissions } = row;
            
            if(!submissions.length) {
                return;
            }
  
            const [accepted] = submissions.filter(submission => submission.status === 'accepted'); 
            
            return accepted ?<Check style={{ fill: '#43a047' }} /> :<Clear style={{ fill: '#FF003C' }}/>
        },
    width: '56px',
    style: {
      borderBottom: '1px solid #FFFFFF',
      marginBottom: '-1px',
    },
  },
    {
        name: 'Titulo',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Categoria',
        selector: row => row.category.description,
        sortable: true,
    },
    {
        name: 'Nível',
        selector: row => row.level,
        right: true,
        sortable: true,
    },
    {
        name: 'Resolvido',
        selector: row => row.qty_accepted,
        right: true,
        sortable: true,
    }
];

const ListProblem: React.FC<Props> = ({problems}) => {
    const [data] = useState(problems);
    const router = useRouter();

    const handleRowClick = (row) => {
        router.push(`/problems/${row.id}`);
    }

    return(
        <Container>
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
    );
}

export default withAuth(ListProblem);


export const getServerSideProps: GetServerSideProps =  async ({req}) => {
    const { token, uid } = getCookiesParams(req.headers.cookie);

    let response;
    try {
        response = await api.get('/problem',{
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
        problems: response.data,
      },
    }  
}