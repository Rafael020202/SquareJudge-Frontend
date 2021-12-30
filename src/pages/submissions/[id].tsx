import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { 
    Typography, 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow,
    TableCell,
    TableBody,
    Box,
    Button,
    Card,
    Grid,
    CardHeader,
    CardContent
} from '@mui/material';
import { CheckCircleOutline, DangerousOutlined } from '@mui/icons-material';

import Container from '../../components/container';
import { withAuth } from '../../components/hoc';

import getCookiesParams from '../../utils/getCookiesParams';
import { Submission as SubmissionInterface } from '../../config/constants';
import api from '../../services/api';


const CodeMirror = dynamic(() => {
    import('codemirror/mode/clike/clike')
    
    return import('../../components/codeMirror')
  }, { ssr: false })


interface Props {
    submission: SubmissionInterface
}


const Submission: React.FC<Props> = ({submission}) => {
    
    const [data] = useState(submission);

    return(
       <Container>
            <Head>
                <title>Submissão</title>
            </Head>
            {console.log(submission)}

            <Grid container spacing={1} mt={2} mb={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title='Tempo'/>
                        <CardContent>
                            <Typography variant='h2'>{submission.time}s</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title='Memória'/>
                        <CardContent>
                            <Typography variant='h2'>{submission.memory}kb</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title='Status'/>
                        <CardContent sx={{ svg:{ color: `${submission.status === 'accepted' ?'#43a047' :'#FF003C'}` } }}>
                            <Typography variant='h2'>
                                {submission.status === 'accepted'   ?<CheckCircleOutline fill='#43a047' fontSize='inherit'/> 
                                                                    :<DangerousOutlined fill='#FF003C'/>}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
           
            <Box sx={{height: '100%'}} >
                <Grid container spacing={1} mt={2} sx={{height: '100%'}} mb={3}>
                    <CodeMirror
                        value={(Buffer.from(data.source_code, 'base64').toString())}
                        readonly
                    />
                </Grid>
            </Box>
       </Container>
   ); 
}

export default withAuth(Submission);

export const getServerSideProps: GetServerSideProps =  async ({ req, query }) => {
    const { token } = getCookiesParams(req.headers.cookie);
    const { id } = query;
  
    let response;
    try {
        response = await api.get(`/submission/${id}`,{
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
        submission: response.data,
      },
    }  
}