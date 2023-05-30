import Cookies from 'js-cookie';
import React from 'react';
import HRMultiSteps from '../../components/HR/HRMultiStep';
import WhyProjectCode from '../../components/HR/WhyProjectCode';
import Lottie from 'lottie-react';
import fourzerofour from '../../assets/fourzerofour.json';

function HRQuestions() {
  const hrInfo = Cookies.get('hrauth');

  return (
    <>
      {hrInfo ? (
        <div className="flex">
          <div className="ml-5 flex-[0.5]">
            <WhyProjectCode />
          </div>
          <div className="mr-5 flex-[0.5] ">
            <HRMultiSteps />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Lottie animationData={fourzerofour} style={{ width: '70vw' }} />
        </div>
      )}
    </>
  );
}

export default HRQuestions;
