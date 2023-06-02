import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';
import { useAddAlumniInfoMutation } from '../../../features/alumni/alumniApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
const CertificationForm = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [addInfo, { data, isSuccess, error }] = useAddAlumniInfoMutation();
  const { _id: id } = useSelector((state) => state?.auth?.user) || {};
  useEffect(() => {
    if (isSuccess) {
      toast.success('Certification added successfully');
    }
    if (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }, [isSuccess, error]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (name.trim() === '' || url.trim() === '') {
      alert('Please fill in all required fields.');
      return;
    }

    const data = {
      id, // student id
      type: 'certifications',
      info: {
        name: name,
        url: url,
      },
    };
    addInfo(data);
    setName('');
    setUrl('');
  };

  return (
    <div>
      <Divider>
        <Typography variant="h6">Add Certification</Typography>
      </Divider>
      <TextField
        label="Certification Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Certification URL"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        required
        fullWidth
        margin="normal"
        onKeyDown={handleKeyDown}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 2, width: '100%' }}
          onClick={handleSubmit}
        >
          Add Certificate
        </Button>
      </Box>
    </div>
  );
};

export default CertificationForm;
