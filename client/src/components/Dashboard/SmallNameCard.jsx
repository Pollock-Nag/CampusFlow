import React from 'react';
import { useNavigate } from 'react-router-dom';

const SmallNameCard = ({ name, githubUsername, status, type, id }) => {
  const navigate = useNavigate();
  const handleStudentClick = (id) => {
    console.log('id', id);
    navigate(`/student/${id}`);
  };

  return (
    <div
      className="bordered shadow-sm px-3 py-2
     flex bg-white  rounded-2xl mr-3 hover:shadow-lg cursor-pointer"
      onClick={() => handleStudentClick(id)}
    >
      <div className="avatar mr-2">
        <div className="w-12 rounded-full">
          <img
            src={`https://avatars.githubusercontent.com/${githubUsername}`}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center ">
        <div className="font-semibold text-sm">
          <a>{name}</a>
        </div>
        <div className="text-sm text-gray-500 capitalize">{type}</div>
      </div>
    </div>
  );
};

export default SmallNameCard;
