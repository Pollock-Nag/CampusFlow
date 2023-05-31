import React from 'react';
import GlobeComponent from '../../components/HR/GlobeComponent';
import Landing from '../../components/HR/ThreeDLanding/Landing3d';
import './HRLanding.scss';
function HRLanding() {
  return (
    <>
      <div className="flex bg-black min-h-screen">
        <div className="flex-[1]">
          <Landing />
          {/* <div className="flex-[1]">
          <GlobeComponent />
        </div> */}
        </div>
      </div>
    </>
  );
}

export default HRLanding;
