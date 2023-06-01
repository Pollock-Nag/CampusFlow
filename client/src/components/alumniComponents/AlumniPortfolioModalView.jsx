import React, { useEffect, useState } from 'react';
import Chip from '../alumniComponents/Chip';
import axios from 'axios';
import { useSelector } from 'react-redux';
import noProject from '../../assets/noproject.json';
import Lottie from 'lottie-react';

function AlumniPortfolioModalView({ project }) {
  if (!project)
    return (
      <div className="card lg:card-side bg-base-100 shadow-xl w-[70vw]  px-10 pt-5 ">
        <div className="card-body">
          <div className="flex flex-col justify-center m-auto items-center uppercase">
            <Lottie animationData={noProject} style={{ width: '350px' }} />
            <div className="text-4xl text-gray-600 font-semibold text-center">
              {'No Project Found'}
            </div>
          </div>
        </div>
      </div>
    );
  const userName = project?.githubLink?.split('/')[3];
  const projectName = project?.githubLink?.split('/')[4];

  const [youtubevdo, setyoutubevdo] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  useEffect(() => {
    setyoutubevdo(getYoutubePreview(project?.youtubeLink));
  }, []);

  const { accessToken } = useSelector((state) => state?.auth) || {};
  useEffect(() => {
    const headers = {
      // 'github-access-token': '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',
      'github-access-token': accessToken,
    };
    axios
      .get(
        `https://talentgpt.fly.dev/github/getCollaborators/${userName}/${projectName}`,
        headers
      )
      .then((res) => {
        setCollaborators(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getYoutubePreview = (url) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <iframe
          width="640px"
          height="360px"
          src={embedUrl}
          title="YouTube Preview"
          className="rounded-2xl"
        />
      );
    }
    return null;
  };
  return (
    <div className="">
      <div className="card lg:card-side bg-base-100 shadow-xl w-[70vw]  px-10 pt-5 ">
        (
        <div className="card-body">
          <div className="flex gap-8">
            <div>{youtubevdo}</div>
            <div className="text-xl font-light text-gray-400">
              <div className="text-3xl mb-4">Description</div>
              <div className="text-justify">{project?.description}</div>
            </div>
          </div>
          <h2 className="card-title text-3xl mt-5 text-purple-600">
            {project?.projectName}
          </h2>

          <table>
            <tbody>
              {/* <tr>
                <td className="text-xl font-light">Description</td>
                <td className="text-xl font-light text-gray-400 ">
                  {project?.description}
                </td>
              </tr> */}
              <tr>
                <td className="text-xl font-light py-2">Type</td>
                <td className="text-xl font-light text-gray-400 ">
                  {project?.type}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-light">Techstack</td>
                <td className="text-xl font-light text-gray-400 flex gap-3 py-2">
                  {project?.techStack.map((tech, i) => (
                    <div className=" " key={i}>
                      {/* {tech} */}
                      <Chip
                        name={tech}
                        customColor={'gray-100'}
                        padding={4}
                        borderColor={'purple-200'}
                      />
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-light">Verticals</td>
                <td className="text-xl font-light text-gray-400 flex gap-3 py-2">
                  {project?.industry?.map((industry, i) => (
                    <div className=" " key={i}>
                      {/* {tech} */}
                      <Chip
                        name={industry}
                        customColor={'gray-100'}
                        padding={4}
                        borderColor={'purple-200'}
                      />
                    </div>
                  ))}
                </td>
              </tr>

              <tr>
                <td className="text-xl font-light py-3">Github Link</td>
                <td className="text-xl font-light text-gray-400 py-3">
                  <a href={project?.githubLink} target="_blank">
                    {project?.githubLink}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="text-xl font-light py-3">Project Link</td>
                <td className="text-xl font-light text-gray-400 py-3">
                  <a href={project?.projectLink} target="_blank">
                    {project?.projectLink}
                  </a>
                </td>
              </tr>
              <tr>
                {/* doneby */}
                <td className="text-xl font-light py-3">Third Party API's</td>
                <td className="text-xl font-light text-gray-400 flex gap-3 py-2">
                  {project?.thirdPartyApi?.map((thirdPartyApi, i) => (
                    <div className=" " key={i}>
                      {/* {tech} */}
                      <Chip
                        name={thirdPartyApi}
                        customColor={'gray-100'}
                        padding={4}
                        borderColor={'purple-200'}
                      />
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div>
            <div className="text-xl font-light">Description</div>
            <div className="text-xl font-light text-gray-400 ">
              {project?.description}
            </div>
          </div>
          <div>
            <div className="text-xl font-light">Type</div>
            <div className="text-xl font-light text-gray-400 ">
              {project?.type}
            </div>
          </div> */}
          <div className="card-actions justify-end"></div>
        </div>
        )
      </div>
    </div>
  );
}

export default AlumniPortfolioModalView;
