import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

function Certificate({ certificateInfo }) {
  return (
    <div>
      <div className="card w-full bg-base-100  min-h-52 rounded-none">
        <div className="card-body p-0 mt-2">
          <div className="card-title text-md text-purple-700">
            {certificateInfo?.name}
          </div>
          <div className="text-justify">
            <a href={certificateInfo?.url} target="_blank">
              <div
                className="badge badge-primary 
              badge-outline text-purple-400 flex justify-between gap-2 p-4 hover:bg-purple-400 hover:text-white"
              >
                <span className="ml-1">View Certificate</span>
                <FaExternalLinkAlt />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
