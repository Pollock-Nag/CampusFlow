import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  useAddAlumniStackMutation,
  useGetAlumniByIdQuery,
} from '../../../features/alumni/alumniApi';
import AlumniLayout from '../AlumniLayout';
import Lottie from 'lottie-react';
import stack from '../../../assets/frontend.json';

const ChangeStack = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const { alumniId: id } = useSelector((state) => state?.auth?.user) || {};
  const { data: alumniData } = useGetAlumniByIdQuery(id);
  const [addStack, { data, isSuccess, error }] = useAddAlumniStackMutation();

  useEffect(() => {
    if (alumniData) {
      setSelectedOption(alumniData?.stack);
    }
  }, [alumniData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Stack added successfully');
    }
    if (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }, [isSuccess, Error]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id,
      stack: selectedOption,
    };
    addStack(data);
  };

  return (
    <AlumniLayout>
      <div className="flex mx-24 items-center">
        <div className="flex-[0.5]">
          <Lottie animationData={stack} style={{ width: '35vw' }} />
        </div>
        <div className="flex-[0.5] glass card w-64 h-56 bg-base-100 shadow-md m-auto">
          <div className="card-body">
            <h2 className="card-title">Change Stack</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Select value={selectedOption} onChange={handleSelectChange}>
                  <MenuItem value="fullstack">Fullstack</MenuItem>
                  <MenuItem value="frontend">Frontend</MenuItem>
                  <MenuItem value="backend">Backend</MenuItem>
                </Select>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AlumniLayout>
  );
};

export default ChangeStack;
