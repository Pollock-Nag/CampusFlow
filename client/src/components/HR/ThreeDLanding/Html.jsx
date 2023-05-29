import React from 'react';
import GlobeComponent from '../GlobeComponent';

function Html() {
  return (
    <>
      {/* <div style={{ fontSize: min('12vw', '86px'), lineHeight: 0.75 }}> */}
      <div className="font-bold" style={{ fontSize: '12vw', lineHeight: 0.75 }}>
        <h1
          style={{
            position: 'absolute',
            top: '50vh',
            left: '50vw',
            transform: 'translateX(-50%)',
            color: 'white',
          }}
        >
          hello.
        </h1>
        <h1
          style={{
            position: 'absolute',
            top: '140vh',
            left: '40vw',
            transform: 'translateX(-65%)',
            color: '#f4b677',
          }}
        >
          Find The Best Global Talents
        </h1>
        <h1
          style={{
            position: 'absolute',
            top: '250vh',
            left: '50vw',
            transform: 'translateX(-50%)',
            color: 'white',
          }}
        >
          here.
        </h1>
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
      </div>
    </>
  );
}

export { Html };
