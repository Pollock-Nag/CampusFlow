import React from 'react';
import HireRequestForm from './HireForm';
import MiniTalentCard from './MiniTalentCard';

function BuildTeam({ teams }) {
  console.log(teams);

  return (
    <>
      <div className="flex">
        <div className="flex-[0.5]">
          {teams.map((team, index) => {
            return (
              <div className="flex justify-center items-center" key={index}>
                <MiniTalentCard student={team} />
              </div>
            );
          })}
        </div>
        <div className="flex-[0.5]">
          <HireRequestForm />
        </div>
      </div>
    </>
  );
}

export default BuildTeam;
