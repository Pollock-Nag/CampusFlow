import React from 'react';
import MiniSearchResults from './MiniSearchResults';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoLogOutOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';

function HRLayout({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/hr/welcome');
    Cookies.remove('hrauth');
  };
  return (
    <>
      <div className="flex">
        <div className="">
          <div className="fixed m-4  bg-purple-50 p-2 shadow-lg h-[93vh] rounded-2xl overflow-y-auto">
            <div className="bg-purple-200 text-xl mt-4 text-center uppercase shadow-lg animate-pulse rounded-2xl p-3 border-b-violet-400 border-2">
              More Talents
            </div>
            <MiniSearchResults />
            <div className="mt-80">
              <Button
                variant="outlined"
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
        </div>
        <div className="w-[100vw] ml-[300px]">{children}</div>
      </div>
    </>
  );
}

export default HRLayout;
