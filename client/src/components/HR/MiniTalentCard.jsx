import React from 'react';
import { useNavigate } from 'react-router-dom';

function MiniTalentCard({ student }) {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/hr/talent/${student?.studentId}`);
  };
  return (
    <div className=" border shadow-md border-purple-200 border-b-4 rounded-lg py-2 min-w-[275px]">
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
      <div className="flex justify-end">
        <div
          className="btn  btn-sm m-2 bg-purple-50 border-none text-purple-500 text-xs hover:bg-white  hover:border-purple-300 capitalize"
          onClick={handleViewProfile}
        >
          View Profile
        </div>
      </div>
    </div>
  );
}

export default MiniTalentCard;
