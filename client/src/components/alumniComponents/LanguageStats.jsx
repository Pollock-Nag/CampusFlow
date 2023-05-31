import React from 'react';

const LanguageStats = ({ githubUsername }) => {
  // const userName = 'Pollock-Nag';
  console.log('githubUsername', githubUsername);
  return (
    <div className="">
      <a href={`https://github.com/${githubUsername}`}>
        {/* <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact"
          alt="Top Languages"
        /> */}

        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=donut&title_color=000000&icon_color=2234AE&text_color=000000&bg_color=ffffff&hide_border=true&border_radius=0.0`}
          width={1200}
          alt="Top Languages"
          className="rounded-2xl shadow-md"
        />
      </a>
      {/* <a href="https://github.com/anuraghazra/github-readme-stats">
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=donut"
          alt="Top Languages"
        />
      </a> */}

      {/* <a href="https://github.com/anuraghazra/github-readme-stats">
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&size_weight=0.5&count_weight=0.5"
          alt="Top Languages"
        />
      </a> */}
    </div>
  );
};

export default LanguageStats;
