import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import personalityData from '../../assets/personalityList.json';
import { useInsertPersonalityTypeMutation } from '../../features/student/studentApi';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import coverImage from '../../assets/studentsidebarbg.png';
function StudentSidebar({ student }) {
  const [selectedPersonality, setSelectedPersonality] = useState('');
  const location = useLocation();

  const { id } = useParams();
  const role = localStorage.getItem('role');

  const [insertPersonality, { data, isSuccess }] =
    useInsertPersonalityTypeMutation();

  const handleChange = (event) => {
    setSelectedPersonality(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const insertData = {
      studentId: id,
      personality: selectedPersonality,
    };
    insertPersonality(insertData);
    setSelectedPersonality('');
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Personality Type Added Successfully');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (student?.personalityType) {
      setSelectedPersonality(student?.personalityType);
    }
  }, [student]);
  console.log(student?.personalityType);
  console.log(selectedPersonality);
  return (
    <>
      <div className="relative flex flex-col items-center rounded-[20px] w-[300px] mx-auto p-4 bg-white bg-clip-border  border-[#701ddc1f] border-2 shadow-3xl dark:!bg-navy-800 dark:text-white dark:!shadow-none min-h-[80vh]">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <img
            src={coverImage}
            className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
          />
          <div className="absolute -bottom-12 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
            <img
              className="h-full w-full rounded-full"
              src={`https://avatars.githubusercontent.com/${student?.githubUsername}`}
              alt={`${student?.name}'s profile`}
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-black ">{student?.name}</h4>
          <p className="text-lg font-normal text-gray-600 capitalize">
            {student?.type} Student
          </p>
          <div className="mt-1 border-2 border-purple-00 p-1 px-2 text-sm rounded-full">
            <p className="text-md text-gray-600 capitalize font-semibold">
              {student?.cohortName}
            </p>
          </div>
        </div>
        {role === 'instructor' ? (
          <div
            className="m-auto flex flex-col
        items-center justify-center gap-4"
          >
            <form className="flex flex-col items-center gap-2">
              <div>
                <FormControl>
                  <InputLabel id="personality-select-label">
                    Select Personality
                  </InputLabel>
                  <Select
                    id="personality-select"
                    label="Select Personality"
                    style={{ width: '200px' }}
                    placeholder="Select Personality"
                    value={selectedPersonality}
                    onChange={handleChange}
                  >
                    {Object.keys(personalityData).map((personality) => (
                      <MenuItem
                        key={personalityData[personality]}
                        value={personalityData[personality]}
                      >
                        {personality}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
      {/* </div> */}
    </>
  );
}

export default StudentSidebar;
