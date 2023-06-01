import React from 'react';
import HireRequestForm from './HireForm';
import MiniTalentCard from './MiniTalentCard';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import plus from '../../assets/plus.png';

function BuildTeam({ teams }) {
  const [team, setTeam] = React.useState([]);

  const handleAdd = (student) => {
    setTeam([...team, student]);
  };

  const handleRemove = (student) => {
    setTeam(team.filter((s) => s.studentId !== student.studentId));
  };
  console.log(team);

  return (
    <>
      <div className="flex">
        <div className="flex-[0.5] overflow-scroll ">
          {teams.map((talent, index) => {
            return (
              <div
                className={`flex justify-center items-center mb-2`}
                key={index}
              >
                <MiniTalentCard student={talent} />
                {!team?.includes(talent) && (
                  <button
                    className="btn btn-sm btn-primary bg-green-100 border-none text-green-900 text-xs ml-2 gap-1 disabled:opacity-50"
                    onClick={() => handleAdd(talent)}
                    disabled={false}
                  >
                    <AiOutlinePlus size={18} color={'green'} />
                  </button>
                )}
                {team?.includes(talent) && (
                  <button
                    className="btn btn-sm btn-primary bg-red-100 border-none text-red-900 text-xs ml-2 gap-1"
                    onClick={() => handleRemove(talent)}
                  >
                    <AiOutlineMinus size={18} color={'red'} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-[0.5]">
          <div className="flex justify-center items-center">
            {team.map((student, index) => {
              return (
                <div key={index} className="mr-3">
                  <div className="avatar">
                    <div className="w-12 mask mask-squircle">
                      <img
                        src={student?.alumniDetails?.image}
                        alt={student?.alumniDetails?.name}
                      />
                    </div>
                  </div>

                  <div className="text-center text-xs">
                    {student?.alumniDetails?.name?.split(' ')[0]}
                  </div>
                </div>
              );
            })}
            {team.length == 0 && (
              <div>
                <div class="avatar-group -space-x-6 animate-pulse">
                  <div class="avatar">
                    <div class="w-12 mask mask-squircle bg-gray-300">
                      {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-12 mask mask-squircle bg-gray-300">
                      {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-12 mask mask-squircle bg-gray-300">
                      <img className=" scale-50" src={plus} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <HireRequestForm talents={team} />
        </div>
      </div>
    </>
  );
}

export default BuildTeam;
