import { Button, Container, Paper, Typography, Box} from '@mui/material';
// import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import { GoogleLogin } from '@react-oauth/google';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const gifStyle = {
        maxWidth: '50%',
        animationDelay: '250s', //this may not be working
    }
    const navigate = useNavigate()
    return (

        <Container component='main' maxWidth='xs' sx={{mt : 30, textAlign:'center'}}>
            <Paper sx={{p : 2}}>
                <img src="/map.gif" alt="map" style={gifStyle}/>
                <Typography variant='h3'>Mapmory</Typography>
                {/* <Link to='/login'>
                    <Button variant='contained'>LogIn or SignUp with Google</Button>
                </Link> */}
                <Box 
                    component={Stack} display="flex" justifyContent="center" alignItems="center" marginTop={3}
                >
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            //send the id token to server
                            fetch('http://localhost:4000/api/login', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({credential: credentialResponse.credential})
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === 'success') {
                                    //store the token id from credentialResponse into local storage to check if the user is logged in
                                    console.log(data.message)   
                                    navigate('/mymap', {replace:true})
                                }else{
                                    console.error(data.message)
                                }

                            })
                            .catch(err => {
                                console.log(err)
                            })
                        }}
                        onError={() => {
                            console.log('Login Failed')
                            // display alert
                        }}
                    />    
                </Box>
            </Paper>


        </Container>

    )
}

export default Welcome;
