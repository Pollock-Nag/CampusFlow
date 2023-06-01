import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import login from '../../assets/login.json';
import Lottie from 'lottie-react';
import { Divider } from '@mui/material';
import GoogleAuth from './GoogleAuth';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  border: 'none',
  backgroundColor: 'white',
  outline: 'none',
};

function HRGoogleLogin() {
  // Get the current URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Get the value of the "redirect" parameter
  const redirectValue = urlParams.get('redirect');

  // Print the value to the console
  console.log(redirectValue);

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <Divider>Sign In</Divider>
      </Typography>
      <Lottie
        animationData={login}
        style={{
          width: '250px',
          height: '250px',
          margin: 'auto',
        }}
      />
      <GoogleAuth redirectLink={redirectValue} />
    </Box>
  );
}

export default HRGoogleLogin;
