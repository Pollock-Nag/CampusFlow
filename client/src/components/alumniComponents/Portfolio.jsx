import React from 'react';
import ProjectSection from '../alumniComponents/ProjectSection';
import Chip from '../alumniComponents/Chip';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
const Portfolio = ({ alumniInfo, techStack }) => {
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate('/alumni/profile/portfolio');
  };
  return (
    <>
      <div className="card  bg-base-100 shadow-sm pl-4 pr-1 w-[70rem]">
        <div className="flex flex-col m-2">
          <div className="flex justify-between ">
            <div className="text-xl font-bold m-2">Portfolio</div>
          </div>

          <div className="card-body m-2 p-0">
            <ProjectSection projects={alumniInfo?.projects} />
          </div>
        </div>
        <div className="flex flex-col m-2 items-left">
          <h2 className="text-xl font-bold m-1">Skills</h2>
          <div className="m-2 flex gap-2 flex-wrap">
            {techStack.slice(0, 8)?.map((tech, index) => {
              return (
                <div key={index}>
                  <Chip
                    key={tech}
                    name={tech}
                    customColor={'gray-200'}
                    borderColor={'purple-300'}
                    padding={'3'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
