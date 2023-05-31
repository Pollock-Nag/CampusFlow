import React from 'react';

const TopLanguages = () => {
  const userName = 'Pollock-Nag';
  return (
    <div className="p-96 scale-150">
      <a href="https://github.com/anuraghazra/github-readme-stats">
        {/* <img
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=Pollock-Nag&size_weight=0.5&count_weight=0.5"
        alt="Top Languages"
      /> */}

        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${userName}&layout=donut&line_height=20&title_color=7A7ADB&icon_color=2234AE&text_color=D3D3D3&bg_color=0,000000,130F40`}
          alt="Top Languages"
        />
      </a>
    </div>
  );
};

export default TopLanguages;
