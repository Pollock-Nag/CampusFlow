import React from 'react';
import './devStyle.scss';

const Developers = () => {
  return (
    <div className="mygrid flex justify-center">
      <div className="dev-avatar">
        <div
          className="front"
          style={{
            backgroundImage:
              'url(https://avatars.githubusercontent.com/zahidtwt)',
          }}
        >
          <div className="inner title">
            <div className="dev-headline">Zahid Ul Islam</div>
            <span>Web Developer</span>
          </div>
        </div>

        <div className="back">
          <div className="inner">
            <div className="text-md">
              I am passionate about building excellent software that improves
              the lives of those around me. I specialize in Next.js and React.
            </div>
          </div>
        </div>
      </div>

      <div className="dev-avatar">
        <div
          className="front"
          style={{
            backgroundImage:
              'url(https://avatars.githubusercontent.com/pollock-nag)',
          }}
        >
          <div className="inner title">
            <div className="dev-headline">Pollock Nag</div>
            <span>Web Developer</span>
          </div>
        </div>

        <div className="back">
          <div className="inner">
            <div className="text-md">
              I like to code things from scratch and enjoy bringing ideas to
              life in the browser. My expertise is in React.js, Node.js, and
              MongoDB.
            </div>
          </div>
        </div>
      </div>

      <div className="dev-avatar">
        <div
          className="front"
          style={{
            backgroundImage:
              'url(https://avatars2.githubusercontent.com/saimonsiddique)',
          }}
        >
          <div className="inner title">
            <div className="dev-headline">Saimon Siddique</div>
            <span>Web Developer</span>
          </div>
        </div>

        <div className="back">
          <div className="inner">
            <div className="text-md">
              I am a web developer. I spend my whole day, practically every day,
              experimenting with HTML, CSS, and JavaScript; dabbling with React
              & Node.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
