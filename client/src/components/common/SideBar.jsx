import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import coding from '../../assets/coding.json';
import { RxDashboard } from 'react-icons/rx';
import { FaPeopleArrows, FaExchangeAlt } from 'react-icons/fa';
import { GrUserAdd } from 'react-icons/gr';
import { RiPagesLine, RiTeamFill } from 'react-icons/ri';
import { GiSkills } from 'react-icons/gi';
import { TbNumbers } from 'react-icons/tb';
import { SiGithubactions } from 'react-icons/si';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';

function SideBar() {
  const studentId = useSelector((state) => state?.auth?.user?._id) || {};
  const role = localStorage.getItem('role');
  const location = useLocation();
  const route = {
    Dashboard: {
      path: '/dashboard',
      icon: <RxDashboard />,
    },
    ...(role === 'student' && {
      'My Profile': {
        path: `/student/${studentId}`,
        icon: <CgProfile />,
      },
    }),
    ...(role === 'student' && {
      'Peer Ratings': {
        path: '/peerratings',
        icon: <FaPeopleArrows />,
      },
    }),
    ...(role === 'instructor' && {
      'Candidate List': {
        path: '/candidates',
        icon: <GrUserAdd />,
      },
    }),
    Curriculum: {
      path: '/curriculum',
      icon: <RiPagesLine />,
    },

    ...(role === 'instructor' && {
      Cohorts: {
        path: '/cohorts',
        icon: <RiTeamFill />,
      },
    }),
    ...(role === 'instructor' && {
      'Student Evaluation': {
        path: '/markstudents',
        icon: <TbNumbers />,
      },
    }),
    ...(role === 'instructor' && {
      'Add Skills': {
        path: '/addskills',
        icon: <GiSkills />,
      },
    }),
    ...(role === 'instructor' && {
      'Migrate Students': {
        path: '/migratestudents',
        icon: <FaExchangeAlt />,
      },
    }),
    ...(role === 'instructor' && {
      'Repo Access': {
        path: '/repoaccess',
        icon: <SiGithubactions />,
      },
    }),
  };

  return (
    <>
      <div>
        <div className="drawer sticky">
          <div className="drawer-side">
            <ul className="menu min-w-[270px] p-4  text-base-content m-5 rounded-2xl bg-white bg-clip-border  border-[#701ddc1f] border-2 shadow-3xl min-h-[80vh] sticky top-0">
              {Object.keys(route).map((key, index) => (
                <li
                  key={index}
                  className={
                    location.pathname === route[key].path
                      ? 'bg-purple-200 rounded-[50px] '
                      : ''
                  }
                >
                  <Link to={route[key].path}>
                    <span className="icon text-lg">{route[key].icon}</span>
                    {key}
                  </Link>
                </li>
              ))}
              <Lottie
                animationData={coding}
                style={{ width: '230px', margin: 'auto' }}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
