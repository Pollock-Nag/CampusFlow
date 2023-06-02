import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useTalentRequestMutation } from '../../features/ hr/hrApi';
import toast, { Toaster } from 'react-hot-toast';
import hiring from '../../assets/hiring.json';
import success from '../../assets/success.json';
import Lottie from 'lottie-react';
const HireRequestForm = ({ talentName, talentId, talents }) => {
  const [hireType, setHireType] = useState('');
  const [whenNeeded, setWhenNeeded] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [team, setTeam] = useState([]);

  const [talentRequest, { error, isLoading, isSuccess }] =
    useTalentRequestMutation();

  useEffect(() => {
    if (talents?.length > 0) {
      const team = talents.map((talent) => {
        return {
          talentId: talent.studentId,
          talentName: talent.alumniDetails.name,
        };
      });
      setTeam(team);
    }
  }, [talents]);

  useEffect(() => {
    if (talentId) {
      const team = [
        {
          talentId,
          talentName,
        },
      ];
      setTeam(team);
    }
  }, [talentId]);

  const handleHireTypeChange = (event) => {
    setHireType(event.target.value);
  };

  const handleWhenNeededChange = (event) => {
    setWhenNeeded(event.target.value);
  };

  const handleContactNoChange = (event) => {
    setContactNo(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { user } = JSON.parse(Cookies.get('hrauth'));
    const { name: hrName, email: hrEmail } = user;
    const hrQuery = JSON.parse(localStorage.getItem('hrquery'));
    const stack =
      hrQuery.stack.charAt(0).toUpperCase() + hrQuery.stack.slice(1);
    const frontendSkills = hrQuery?.frontendSkill?.join(', ');
    const backendSkills = hrQuery?.backendSkill?.join(', ');
    const industries = hrQuery?.industries?.join(', ');
    const hireRequest = {
      team,
      hrName,
      hrEmail,
      hireType,
      whenNeeded,
      contactNo,
      companyName,
      stack,
      frontendSkills,
      backendSkills,
      industries,
    };
    talentRequest(hireRequest);

    // Reset the form fields
    setHireType('');
    setWhenNeeded('');
    setContactNo('');
    setCompanyName('');
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Hire request sent successfully!');
    }
    if (error) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, error]);

  return (
    <>
      {isLoading && (
        <div
          style={{ width: '100%', height: '100%' }}
          className="text-center text-xl"
        >
          <Lottie animationData={hiring} />
          Sending Request...
        </div>
      )}
      {isSuccess && (
        <div
          style={{ width: '90%', height: '90%' }}
          className="text-center text-xl"
        >
          <Lottie animationData={success} />
          Request Sent Successfully! <br />
          We will get back to you soon.
        </div>
      )}
      {!isLoading && !isSuccess && (
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" sx={{ my: '16px' }}>
            <FormLabel component="legend">Hire Type</FormLabel>
            <RadioGroup
              row
              aria-label="hire-type"
              name="hire-type"
              value={hireType}
              onChange={handleHireTypeChange}
            >
              <FormControlLabel
                value="Full Time"
                control={<Radio />}
                label="Full Time"
                style={{ display: 'block' }}
              />

              <FormControlLabel
                value="Part Time"
                control={<Radio />}
                label="Part Time"
                style={{ display: 'block' }}
              />

              <FormControlLabel
                value="Project Based"
                control={<Radio />}
                label="Project Based"
                style={{ display: 'block' }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ minWidth: '100%' }}>
            <TextField
              required
              label="When do you need the developer?"
              select
              value={whenNeeded}
              onChange={handleWhenNeededChange}
              fullWidth
            >
              <MenuItem value="Immediately">Immediately</MenuItem>
              <MenuItem value="Next Month">Next Month</MenuItem>
              <MenuItem value="Near Future">Sometime in the Future</MenuItem>
            </TextField>
          </FormControl>

          <TextField
            required
            label="Contact Number"
            value={contactNo}
            onChange={handleContactNoChange}
            fullWidth
            margin="normal"
          />

          <TextField
            required
            label="Company Name"
            value={companyName}
            onChange={handleCompanyNameChange}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Send Request
          </Button>
        </form>
      )}
    </>
  );
};

export default HireRequestForm;
