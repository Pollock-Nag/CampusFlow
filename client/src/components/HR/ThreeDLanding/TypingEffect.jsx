import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

function TypingEffect() {
  return (
    <Typewriter
      options={
        {
          // loop: true,
        }
      }
      onInit={(typewriter) => {
        typewriter
          .typeString('Lost While Hunting?')
          .callFunction(() => {
            console.log('String typed out!');
          })
          // .pauseFor(2500)
          // .deleteAll()

          .start();
      }}
      wrapperClassName="typewriter-wrapper"
    />
  );
}

export default TypingEffect;
