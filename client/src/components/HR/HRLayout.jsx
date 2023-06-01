import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import AlumniSidebar from '../alumniComponents/AlumniSidebar';
import HRGoogleLogin from './HRGoogleLogin';
import MiniSearchResults from './MiniSearchResults';

function HRLayout({ children }) {
  const [isHr, setIsHr] = useState(false);
  const hrauth = Cookies.get('hrauth');

  useEffect(() => {
    if (hrauth === 'hr') {
      setIsHr(true);
    }
  }, [hrauth]);

  return (
    <>
      {hrauth ? (
        <div className="flex">
          <div className="">
            <div className="fixed m-4  bg-purple-50 p-2 shadow-lg h-[90vh] rounded-2xl overflow-y-auto">
              <div className="bg-purple-200 text-xl mt-4 text-center uppercase shadow-lg animate-pulse rounded-2xl p-3 border-b-violet-400 border-2">
                More Talents
              </div>
              <MiniSearchResults />
            </div>
          </div>
          <div className="w-[100vw] ml-[300px]">{children}</div>
        </div>
      ) : (
        <HRGoogleLogin isLoggedIn={isHr} />
      )}
    </>
  );
}

export default HRLayout;
