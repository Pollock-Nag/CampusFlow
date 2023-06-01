import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { Button, Divider, Modal, Typography } from '@mui/material';
import TalentCard from './TalentCard';
function MiniTalentCard({ student }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickView = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/hr/talent/${student?.studentId}`);
  };
  return (
    <div className=" border shadow-md border-purple-200 border-b-4 rounded-lg py-2 min-w-[275px]">
      <Modal open={isOpen} onClose={handleClose} sx={{}}>
        <div
          className="bg-white p-10 rounded-2xl"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000,
            p: 4,
          }}
        >
          <TalentCard
            result={student}
            studentId={student?.studentId}
            quickView={true}
          />
        </div>
      </Modal>
      <div className="  h-14 flex bg-white p-2 px-5  gap-4">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={`${student?.alumniDetails?.image}`} />
          </div>
        </div>
        <div className="flex flex-col justify-center ml-2">
          <div className="font-semibold">
            <a href="/">{student?.alumniDetails?.name}</a>
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {student?.alumniDetails?.stack} Developer
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div
          className="btn  btn-sm m-2 bg-orange-50 border-none text-orange-500 text-xs hover:bg-white  hover:border-orange-300 capitalize gap-2"
          onClick={handleQuickView}
        >
          <FaEye size={15} />
          Quick View
        </div>
        <div
          className="btn  btn-sm m-2 bg-purple-50 border-none text-purple-500 text-xs hover:bg-white  hover:border-purple-300 capitalize gap-2"
          onClick={handleViewProfile}
        >
          <RxAvatar size={15} />
          View Profile
        </div>
      </div>
    </div>
  );
}

export default MiniTalentCard;
