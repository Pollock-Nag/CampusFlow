import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { FaCode, FaUserGraduate, FaTools } from 'react-icons/fa';
import { BsBriefcase } from 'react-icons/bs';
import { GrCertificate } from 'react-icons/gr';
import { IoLogOutOutline } from 'react-icons/io5';
import SmallNameCard from './SmallNameCard';
import { useNavigate } from 'react-router-dom';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import { Button } from '@mui/material';

const AlumniSidebar = () => {
  const dispatch = useDispatch();
  const { name, githubUsername } =
    useSelector((state) => state?.auth?.user) || {};
  const role = useSelector((state) => state?.auth?.role);
  const logout = () => {
    navigate('/login');
    dispatch(userLoggedOut());
    localStorage.removeItem('role');
  };
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/alumni/profile');
  };
  const handleProjectCode = () => {
    navigate('/alumni/projectcode');
  };

  const handlePortfolio = () => {
    navigate('/alumni/profile/portfolio');
  };
  const handleEducation = () => {
    navigate('/alumni/education');
  };
  const handleCertification = () => {
    alert('coming soon');
    console.log('Certification');
  };
  const handleExperience = () => {
    navigate('/alumni/changestack');
  };

  return (
    <>
      <ul className=" menu p-4 w-64 bg-#FFFBFB bg-white shadow-xl h-screen flex-col flex-wrap">
        <div className="flex">
          <a className="btn btn-ghost normal-case text-xl text-purple-700">
            CampusFlow
          </a>
        </div>
        <div className="mt-4">
          <li>
            <a onClick={handleDashboard}>
              <RxDashboard color="gray" />
              Overview
            </a>
          </li>
          <li>
            <a onClick={handleProjectCode}>
              {' '}
              <FaCode color="gray" />
              Project Code
            </a>
          </li>
          <li>
            <a onClick={handlePortfolio}>
              <AiOutlineFundProjectionScreen color="gray" />
              Portfolio
            </a>
          </li>
          <li>
            <a onClick={handleEducation}>
              <FaUserGraduate />
              Education
            </a>
          </li>
          <li>
            <a onClick={handleExperience}>
              <BsBriefcase color="gray" /> Experience
            </a>
          </li>
          <li>
            <a onClick={handleCertification}>
              <GrCertificate />
              Certifications
            </a>
          </li>
          <li>
            <a onClick={handleExperience}>
              <FaTools color="gray" /> Change Stack
            </a>
          </li>
        </div>
        <div>
          <div className=" mt-[30vh]">
            <SmallNameCard
              name={name}
              githubUsername={githubUsername}
              role={role}
            />
          </div>
          <div className=" mt-5 ">
            <Button
              variant="outlined"
              color="primary"
              onClick={logout}
              fullWidth
              size="small"
            >
              <span className="text-lg capitalize"> Logout </span>
              <IoLogOutOutline className="text-2xl ml-2" onClick={logout} />
            </Button>
          </div>
        </div>
      </ul>
    </>
  );
};

export default AlumniSidebar;
