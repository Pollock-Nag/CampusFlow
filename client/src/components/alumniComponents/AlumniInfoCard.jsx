import React, { useState } from 'react';
import { Button, Divider, Modal, Typography } from '@mui/material';
import { FiPhoneCall, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { FaUserTie } from 'react-icons/fa';
import { SlEnvolope } from 'react-icons/sl';
import Chip from './Chip';
import HireRequestForm from '../HR/HireForm';

function AlumniInfoCard({ alumniInfo, githubUsername, cohort, studentId }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleHireClick = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const socialButtonClick = (type) => {
    // alert(type);
    if (type === 'phone') {
      alumniInfo.socialLinks.map((link) => {
        if (link.name === 'phone') {
          // alert(link.url);
          window.open(`tel:${link.url}`);
        }
      });
    }
    if (type === 'email') {
      alumniInfo.socialLinks.map((link) => {
        if (link.name === 'email') {
          // alert(link.url);
          window.open(`mailto:${link.url}`);
        }
      });
    }
    if (type === 'website') {
      alumniInfo.socialLinks.map((link) => {
        // console.log(link);
        if (link.name === 'website') {
          // alert(link.url);
          window.open(`https://${link.url}`);
        }
      });
    }
    if (type === 'linkedin') {
      alumniInfo.socialLinks.map((link) => {
        if (link.name === 'linkedin') {
          // alert(link.url);
          window.open(`https://${link.url}`);
        }
      });
    }
  };

  const cardHead = (
    <div className="flex justify-between">
      <div className="flex gap-3 items-center">
        <div className="avatar online w-16 rounded-xl">
          <img
            src={`https://avatars.githubusercontent.com/${githubUsername}`}
            className="rounded-2xl p-1 shadow-xl"
          />
        </div>
        <div className="">
          <div className="text-xl font-semibold text-purple-700 drop-shadow-lg">
            {alumniInfo?.name}
          </div>
          <div className="text-sm font-semibold">
            <Chip
              name={`${
                cohort?.split('-')[1]?.toUpperCase() +
                '-' +
                cohort?.split('-')[2]?.toUpperCase()
              } Cohort`}
              customColor={'gray-100'}
              borderColor={'gray-300'}
              padding={2}
              textColor={'gray-500'}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn btn-sm bg-indigo-300 text-indigo-700
        hover:bg-indigo-400 hover:text-white outline-none border-none shadow-md
        "
          onClick={handleHireClick}
        >
          <FaUserTie fontSize={16} color="indigo" />
          &nbsp; Hire
        </button>
      </div>
    </div>
  );
  const cardButtons = (
    <div className="card-actions justify-left mt-1 gap-3">
      <button
        className="p-3 h-10 rounded-xl bg-purple-300 border-none shadow-md"
        onClick={() => socialButtonClick('phone')}
      >
        <FiPhoneCall fontSize={18} color="black" />
      </button>
      <button
        className="p-3 h-10  rounded-xl  bg-purple-300 border-none shadow-md"
        onClick={() => socialButtonClick('email')}
      >
        <SlEnvolope fontSize={16} color="black" />
      </button>
      <button
        className="p-3 h-10 rounded-xl  bg-purple-300 border-none shadow-md"
        onClick={() => socialButtonClick('website')}
      >
        <FiGlobe fontSize={16} color="black" />
      </button>
      <button
        className="p-3 h-10 rounded-xl  bg-purple-300 border-none shadow-md"
        onClick={() => socialButtonClick('linkedin')}
      >
        <FiLinkedin fontSize={16} color="black" />
      </button>
    </div>
  );
  return (
    <>
      <div className="card h-auto bg-base-100 shadow-md">
        <Modal open={isOpen} onClose={handleClose} sx={{}}>
          <div
            className="bg-white p-10 rounded-2xl"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              // bgcolor: 'purple.100',
              p: 4,
            }}
          >
            <Divider>
              <Typography variant="h5">Hire Request Form</Typography>
            </Divider>
            <HireRequestForm
              talentId={studentId}
              talentName={alumniInfo?.name}
            />
          </div>
        </Modal>
        <div className="card-body p-5 capitalize">
          {cardHead}
          <Chip
            name={`${alumniInfo?.stack} Developer`}
            customColor={'gray-200'}
            borderColor={'purple-200'}
            padding={'3'}
          />
          {cardButtons}
        </div>
      </div>
    </>
  );
}

export default AlumniInfoCard;
