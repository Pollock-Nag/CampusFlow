import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import { Scene } from './Scene';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import login from '../../../assets/login.json';
import Lottie from 'lottie-react';
import { Divider } from '@mui/material';
import GoogleAuth from '../GoogleAuth';
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

export default function Landing() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <GoogleAuth />
        </Box>
      </Modal>
      <Canvas>
        <ambientLight />
        <directionalLight color="red" intensity={10} />
        <Suspense fallback={null}>
          <Scene handleOpen={handleOpen} />
        </Suspense>
      </Canvas>
    </>
  );
}
