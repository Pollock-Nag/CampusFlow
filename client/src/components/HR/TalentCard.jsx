import React, { useEffect, useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import Chip from '../alumniComponents/Chip';
import { GoLocation } from 'react-icons/go';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SkillsRadarChart from '../StudentInfo/SkillsRadarChart';
import { useGetStudentByIdQuery } from '../../features/student/studentApi';
import { useSelector } from 'react-redux';
import { useBuildPredictionMutation } from '../../features/ hr/hrApi';
import MiniTalentCard from './MiniTalentCard';
import Lottie from 'lottie-react';
import searching from '../../assets/searching.json';
import { Button, Divider, Modal, Typography } from '@mui/material';
import BuildTeam from './BuildTeam';

function TalentCard({ result, studentId }) {
  const [chartData, setChartData] = useState({});
  const [buildTeam, setBuildTeam] = useState(false);
  const [filteredTechSkills, setFilteredTechSkills] = useState([]);
  const [bestMatched, setBestMatched] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleHireTeam = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const { data: studentInfo, isSuccess } = useGetStudentByIdQuery({
    studentId,
  });
  const { results } = useSelector((state) => state.results);

  const [getPrediction, { data: predictionData, isLoading }] =
    useBuildPredictionMutation();

  const handleBuildTeam = (e) => {
    e.stopPropagation();

    setBuildTeam(!buildTeam);
  };
  useEffect(() => {
    if (buildTeam) {
      if (bestMatched?.length > 0) return;
      getPrediction({ id: studentId });
    }
  }, [buildTeam]);

  useEffect(() => {
    if (predictionData) {
      const { result: predictedResult } = predictionData;
      console.log(predictedResult);

      const bestMatchedStudents = results?.filter((result) => {
        if (result?.personalityType == predictedResult) return result;
      });
      setBestMatched(bestMatchedStudents);
    }
  }, [predictionData]);
  useEffect(() => {
    setChartData(studentInfo?.checkpoints[3]);
    setFilteredTechSkills(
      studentInfo?.checkpoints[3]?.techSkills?.filter((skill) => {
        if (skill?.skill?.stack?.length > 0) return skill?.skill;
      })
    );
  }, [studentInfo]);

  // useEffect(() => {

  // }, [data]);

  const alumniInfo = result?.alumniDetails;
  const navigate = useNavigate();
  const latestExperience =
    alumniInfo?.experiences[alumniInfo?.experiences?.length - 1];

  const latestEducation =
    alumniInfo?.education[alumniInfo?.education?.length - 1];

  const gotoProfile = () => {
    navigate(`/hr/talent/${studentId}`);
  };
  return (
    <>
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
          <Divider sx={{ mb: 4 }}>
            <Typography variant="h5">Build Talent Team & Hire</Typography>
          </Divider>
          <BuildTeam teams={[result, ...bestMatched]} />
        </div>
      </Modal>
      <div className="my-3 card bg-base-100 border-2 border-purple-200 w-[60vw] hover:border-purple-400  ">
        <div className="flex justify-between mx-10">
          <div className="w-96">
            <div className="card-body p-5 cursor-pointer" onClick={gotoProfile}>
              <div className="flex gap-3 items-center">
                <div className="w-16 rounded-full bg-[#C39AF7]">
                  <img
                    src={`${alumniInfo?.image}`}
                    className="rounded-full p-1 shadow-xl"
                  />
                </div>
                <div>
                  <div className="text-xl font-semibold text-purple-700 drop-shadow-lg ">
                    {alumniInfo?.name}
                  </div>
                  <div className="text-sm text-gray-700 drop-shadow-lg">
                    <Chip
                      name={studentInfo?.cohortName?.slice(8)?.toUpperCase()}
                      padding={2}
                      round={'md'}
                      customColor={'orange-100'}
                      borderColor={'orange-200'}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 uppercase font-bold">
                  <Chip
                    name={`${alumniInfo?.stack} Developer`}
                    padding={3}
                    round={'full'}
                    customColor={'purple-100'}
                    borderColor={'purple-200'}
                    textColor={'purple-700'}
                  />
                </div>
              </div>
              {alumniInfo?.experiences?.length > 0 ? (
                <>
                  <p className=" mt-1 leading-4 text-sm text-gray-700">
                    I've worked with <br />
                  </p>
                  <span className="text-md text-gray-800">
                    <span className="font-bold text-purple-700">
                      {latestExperience?.companyName}
                    </span>{' '}
                    as {latestExperience?.jobTitle}
                  </span>
                </>
              ) : (
                <>
                  <p className=" mt-1 leading-4 text-sm text-gray-700">
                    Academic Information
                    <br />
                  </p>
                  <span className="text-md text-gray-800">
                    <span className="font-bold text-purple-700">
                      {latestEducation?.program}
                    </span>{' '}
                    from {latestEducation?.instituteName}
                  </span>
                </>
              )}

              <div className="card-actions justify-left mt-1 gap-1 flex flex-wrap py-1">
                {filteredTechSkills?.map((skill, index) => {
                  return (
                    skill?.marks > 7 && (
                      <Chip
                        key={index}
                        name={skill?.skill?.skillName}
                        padding={2}
                        round={'lg'}
                        customColor={
                          skill?.skill?.stack?.includes('frontend')
                            ? 'purple-100'
                            : skill?.skill?.stack?.includes('backend')
                            ? 'blue-100'
                            : 'rose-100'
                        }
                        borderColor={
                          skill?.skill?.stack?.includes('frontend')
                            ? 'purple-200'
                            : skill?.skill?.stack?.includes('backend')
                            ? 'blue-200'
                            : 'rose-200'
                        }
                      />
                    )
                  );
                })}
              </div>
            </div>
          </div>

          {/* Button */}

          {/* Chart */}
          <div className="Charts">
            <div className="flex justify-between">
              <div className=" h-64 w-96 bg-white rounded-3xl p-5 ">
                <SkillsRadarChart skills={chartData?.techSkills} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex z-10 justify-end mr-5 mb-5">
          <button
            className="btn btn-sm bg-purple-500 border-none flex items-center gap-2 hover:bg-purple-800 "
            onClick={handleBuildTeam}
          >
            <div className="mt-1">Build Team</div>
            <div>
              <AiOutlineTeam size={20} />
            </div>
          </button>
        </div>
        {isLoading && (
          <div className="flex justify-center ">
            <Lottie animationData={searching} style={{ width: '300px' }} />
          </div>
        )}
        <>
          {buildTeam && bestMatched.length > 0 && !isLoading ? (
            <div className="flex flex-col gap-2 mx-10">
              <div className="text-2xl font-bold text-purple-700">
                Best Matched Talents
                <span
                  onClick={handleHireTeam}
                  className="btn mb-2 btn-sm ml-5 bg-purple-50 border-2 border-purple-600 text-purple-900 text-xs hover:bg-white  hover:border-purple-300 uppercase gap-2"
                >
                  <AiOutlineTeam size={20} /> Hire Team
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {bestMatched?.map((student, index) => {
                  return <MiniTalentCard student={student} key={index} />;
                })}
              </div>
            </div>
          ) : (
            buildTeam &&
            !isLoading && (
              <div className="flex justify-center text-2xl font-bold text-purple-700 py-5">
                {'No Matching Talents Found'}
              </div>
            )
          )}
        </>
      </div>
    </>
  );
}

export default TalentCard;
