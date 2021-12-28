import React, { useState, useContext, useEffect } from 'react';
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
    Paper,
    Box,
    Button,
    Grid
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';




import Container from '../../components/container';
import { withAuth } from '../../components/hoc';
import { AuthContext } from '../../context/AuthContext';

import getCookiesParams from '../../utils/getCookiesParams';
import { Problem as ProblemInterface } from '../../config/constants';
import api from '../../services/api';

const CodeMirror = dynamic(() => {
    import('codemirror/mode/clike/clike')
    
    return import('../../components/codeMirror')
  }, { ssr: false })


interface Props {
    problem: ProblemInterface
}


const Problem: React.FC<Props> = ({problem}) => {
    
    const [code, setCode] = useState('\n'.repeat(18));
    const { token, user } = useContext(AuthContext);

    const hanleCodeChange = (editor, data, value) => {
        setCode(value);
    }

    const handleSubmission = async () => {
        try {
            const response = await api.post('/submission', {
                source_code:  Buffer.from(code).toString('base64'),
                problem_id: problem.id,
                user_id: user.id
            },{
                headers: {
                    authorization: `Barer ${token}`  
                }
            });
            
        }catch(error) {
            console.log(error.response);
        }   
    }

    const format = (value: string) => {
        const string = Buffer.from(value, 'base64').toString();
        console.log(string)

        return string;
    }

    return(
       <Container>
            <Head>
                <title>{problem.title}</title>
            </Head>

           
            <Box sx={{height: '100%'}} >
                <Grid container spacing={1} mt={2} sx={{height: '100%'}} mb={3}>
                    <Grid item xs={12} md={7} sx={{display: 'flex'}}>
                        <div style={{flex: 1, padding: '10px'}}>
                            <Typography variant='h5' sx={{fontWeight: 'bold'}}>{problem.title}</Typography>
                            <hr />

                            <Typography variant='body1' mt={2}>{problem.description}</Typography>

                            <Typography variant='subtitle1' mt={2} sx={{fontWeight: 'bold'}}>ENTRADA</Typography>
                            <Typography variant='body1'>{problem.input_description}</Typography>

                            <Typography variant='subtitle1' mt={2} sx={{fontWeight: 'bold'}}>SAÍDA</Typography>
                            <Typography variant='body1'>{problem.output_description}</Typography>

                            <TableContainer sx={{marginTop: '20px'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Entrada</TableCell>
                                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Saída</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {problem.inputs.map(input => (
                                            <TableRow key={input.id}>
                                                <TableCell style={{whiteSpace: 'pre-wrap'}}>{format(input.value)}</TableCell>
                                                <TableCell style={{whiteSpace: 'pre-wrap'}} align="right">{format(input.output)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                       
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <div style={{width: '100%', maxWidth: '600px', height: '100%', maxHeight: '600px', padding: '5px'}}>
                            <Button 
                                sx={{maxHeight: '50px', marginBottom: '5px'}}
                                variant='contained' 
                                color='success'
                                onClick={handleSubmission}
                            >
                                <SendIcon fontSize='small'/>       
                            </Button>

                            <CodeMirror
                                value={code}
                                handleChange={hanleCodeChange}
                            />
                        </div>
                    </Grid>                        
                </Grid>
            </Box>
       </Container>
   ); 
}

export default withAuth(Problem);

export const getServerSideProps: GetServerSideProps =  async ({ req, query }) => {
    const { token } = getCookiesParams(req.headers.cookie);
    const { id } = query;
  
    let response;
    try {
        response = await api.get(`/problem/${id}`,{
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
        problem: response.data,
      }
    }  
}