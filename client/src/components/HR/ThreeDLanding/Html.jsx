import React from 'react';
import GlobeComponent from '../GlobeComponent';
import TypingEffect from './TypingEffect';
import Lottie from 'lottie-react';
import scrolldown from '../../../assets/scrolldown.json';
import Developers from './Developers';

function Html({ handleOpen }) {
  return (
    <>
      {/* <div style={{ fontSize: min('12vw', '86px'), lineHeight: 0.75 }}> */}
      <div className="font-bold" style={{ fontSize: '12vw', lineHeight: 0.9 }}>
        <TypingEffect />

        <div
          style={{
            position: 'absolute',
            top: '140vh',
            left: '40vw',
            transform: 'translateX(-65%)',
            color: '#f4b677',
          }}
        >
          <div className="text-9xl">Find </div>
          <div className="text-9xl">World Class </div>
          <div className="  text-white animate-pulse">Talents</div>
        </div>
        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            top: '83vh',
            left: '50vw',
            transform: 'translateX(-50%)',
            color: '#f4b677',
          }}
        >
          <Lottie style={{ width: '140px' }} animationData={scrolldown} />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '110vh',
            left: '75vw',
            transform: 'translateX(-50%)',
            color: 'white',
          }}
        >
          <GlobeComponent />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '200vh',
            left: '20vw',
            // transform: 'translateX(-50%)',
            color: 'white',
          }}
          class="animate-pulse button w-60 h-16 bg-purple-500  cursor-pointer select-none translate-x-[-50%]
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#7109b3,0_0px_0_0_#7109b341]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#7109b3,0_15px_0_0_#7109b341]
    rounded-full  border-[1px] border-purple-400
    
  "
        >
          <span
            class="flex flex-col justify-center items-center h-full text-white font-bold text-xl "
            onClick={handleOpen}
          >
            FIND TALENTS
          </span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '250vh',
          left: '50vw',
          transform: 'translateX(-50%)',
          color: 'white',
        }}
      >
        <Developers />
      </div>
    </>
  );
}

export { Html };
