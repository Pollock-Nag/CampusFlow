import React from 'react';
import MiniSearchResults from './MiniSearchResults';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoLogOutOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import Chip from '../alumniComponents/Chip';

function HRLayout({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/hr/welcome');
    Cookies.remove('hrauth');
    localStorage.clear();
  };
  const searchResults = JSON.parse(localStorage.getItem('hrquery'));
  return (
    <>
      <div className="flex">
        <div className="flex-[0.2] ">
          <div className=" m-4  bg-purple-50 p-2 shadow-lg min-h-[5vh] max-h-[30vh]  rounded-2xl overflow-y-auto min-w-[275px]">
            <div className="bg-purple-200 text-xl mt-4 text-center uppercase shadow-lg rounded-2xl p-3 border-b-violet-400 border-2 ">
              Searched Query
            </div>
            <div className="flex flex-wrap m-2 gap-2">
              <Chip
                name={searchResults?.stack.toUpperCase()}
                padding={3}
                customColor={'violet-500'}
                textColor={'white'}
                borderColor={'violet-500'}
              />
              {searchResults?.frontendSkill.map((skill) => (
                <Chip
                  name={skill.toUpperCase()}
                  padding={3}
                  customColor={'indigo-400'}
                  textColor={'white'}
                  borderColor={'indigo-400'}
                />
              ))}
              {searchResults?.backendSkill.map((skill) => (
                <Chip
                  name={skill.toUpperCase()}
                  padding={3}
                  customColor={'gray-600'}
                  textColor={'white'}
                  borderColor={'gray-600'}
                />
              ))}
              {searchResults?.industries.map((skill) => (
                <Chip
                  name={skill.toUpperCase().slice(0, 10)}
                  padding={3}
                  customColor={'purple-400'}
                  textColor={'white'}
                  borderColor={'purple-400'}
                />
              ))}
            </div>
          </div>

          <div className=" m-4  bg-purple-50 p-2 shadow-lg h-[70vh] rounded-2xl overflow-y-auto min-w-[275px]">
            <div className="bg-purple-200 text-xl mt-4 text-center uppercase shadow-lg animate-pulse rounded-2xl p-3 border-b-violet-400 border-2">
              More Talents
            </div>
            <MiniSearchResults />
          </div>
          <div className="mx-4">
            <Button
              variant="contained"
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
        <div className="flex-[0.8] ">{children}</div>
      </div>
    </>
  );
}

export default HRLayout;
