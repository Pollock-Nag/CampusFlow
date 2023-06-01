import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SearchLoader from '../../components/HR/SearchLoader';
import TalentCard from '../../components/HR/TalentCard';
import { Button } from '@mui/material';
import { IoLogOutOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function HRSearchResults() {
  const { results } = useSelector((state) => state.results);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const logout = () => {
    navigate('/hr/welcome');
    Cookies.remove('hrauth');
  };

  useEffect(() => {
    if (results) {
      console.log(results);
      setTimeout(() => {
        setIsLoading(false);
      }, 10);
    }
  }, [results]);

  return (
    <>
      <div className="flex justify-between mx-10 p-2 px-5 bg-purple-100 shadow-xl  mb-5 ">
        <a className="btn btn-ghost normal-case text-xl">TalentGPT</a>
        <div className="flex">
          <div className="form-control ">
            <input
              type="text"
              placeholder="Search Candidates"
              className="input input-bordered w-[58vw]"
            />
          </div>
          <button className=" border-0  normal-case text-md mx-5 ">
            <FaSearch size={25} color={'purple'} />
          </button>
        </div>
        <div>
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
      {isLoading && <SearchLoader />}
      {!isLoading && (
        <div>
          {results?.map((result, index) => (
            <div className="flex justify-center items-center" key={index}>
              <TalentCard result={result} studentId={result?.studentId} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HRSearchResults;
