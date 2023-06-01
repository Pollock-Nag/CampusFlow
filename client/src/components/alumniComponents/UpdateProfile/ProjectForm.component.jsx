import React, { useEffect, useState } from 'react';

import {
  TextField,
  Button,
  Chip,
  Autocomplete,
  Divider,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import AlumniLayout from '../AlumniLayout';
import SelectIndustry from '../SelectIndustry';
import CompanyNameAutocomplete from './AutoCompleteCompany';
import { useAddProjectMutation } from '../../../features/project/projectApi';
import toast from 'react-hot-toast';
import { useGetAllSkillsQuery } from '../../../features/skill/skillApi';
import { useSelector } from 'react-redux';
const projectTypes = [
  { name: 'Solo Project', value: 'solo' },
  { name: 'Legacy Project', value: 'legacy' },
  { name: 'Thesis Project', value: 'thesis' },
  { name: 'Personal Project', value: 'personal' },
];
const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setDescription] = useState('');
  const [githubRepoLink, setGithubRepoLink] = useState('');
  const [projectLiveLink, setProjectLiveLink] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [thirdPartyApis, setThirdPartyApis] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [youtubePreview, setYoutubePreview] = useState('');
  const [projectCategory, setProjectCategory] = useState([]);

  const [techSkills, setTechSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { _id: studentId, alumniId } =
    useSelector((state) => state?.auth?.user) || {};

  const [addProject, { data, isSuccess, error }] = useAddProjectMutation();
  const {
    data: skillsData,
    isSuccess: skillsSuccess,
    error: skillsError,
  } = useGetAllSkillsQuery();

  useEffect(() => {
    const techSkillsTemp = skillsData?.filter((skill) =>
      skill?.studentType?.includes('alumni')
    );

    setTechSkills(techSkillsTemp);
  }, [skillsSuccess]);
  useEffect(() => {
    setTechStack(selectedSkills.map((skill) => skill.skillName));
  }, [selectedSkills]);
  useEffect(() => {
    if (isSuccess) {
      toast.success('Project added successfully');
    }
    if (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }, [isSuccess, error]);
  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
  };
  const handleYoutubeLinkChange = (event) => {
    const url = event.target.value;
    setYoutubeLink(url);
    setYoutubePreview(getYoutubePreview(url));
  };

  const getYoutubePreview = (url) => {
    const videoId = url.split('v=')[1];

    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      return (
        <iframe
          width="320px"
          height="180px"
          src={embedUrl}
          title="YouTube Preview"
        />
      );
    }

    return null;
  };
  const handleReset = () => {
    setProjectName('');
    setProjectType('');
    setDescription('');
    setGithubRepoLink('');
    setProjectLiveLink('');
    setTechStack([]);
    setThirdPartyApis([]);
    setYoutubeLink('');
    setYoutubePreview('');
    setProjectCategory([]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: alumniId,
      projectName,
      type: projectType,
      industry: projectCategory,
      description: description,
      githubLink: githubRepoLink,
      projectLink: projectLiveLink,
      techStack: techStack,
      thirdPartyApi: thirdPartyApis,
      youtubeLink: youtubeLink,
      doneBy: alumniId,
    };
    console.log(data);
    addProject(data);
    handleReset();
  };
  // console.log();
  return (
    <AlumniLayout>
      <div className="flex bg-white m-10 p-10 rounded-xl shadow-2xl">
        <div className="flex-[0.7]">
          <Divider>
            <Typography variant="h6">Add Project Info</Typography>
          </Divider>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="YouTube Link"
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="project-type-label">Project Type</InputLabel>
            <Select
              labelId="project-type-label"
              label="Project Type"
              id="project-type-select"
              value={projectType}
              onChange={handleProjectTypeChange}
              required
            >
              {projectTypes.map((type) => (
                <MenuItem key={type} value={type.value}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <SelectIndustry setProjectCategory={setProjectCategory} />
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            fullWidth
            multiline
            rows={1}
            margin="normal"
          />
          <TextField
            label="Github Repo Link"
            value={githubRepoLink}
            onChange={(event) => setGithubRepoLink(event.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Project Live Link"
            value={projectLiveLink}
            onChange={(event) => setProjectLiveLink(event.target.value)}
            fullWidth
            margin="normal"
          />
          <Autocomplete
            multiple
            options={techSkills || []}
            getOptionLabel={(skill) => skill?.skillName}
            value={selectedSkills}
            onChange={(event, value) => setSelectedSkills(value)}
            renderTags={(value, getTagProps) =>
              value.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill?.skillName}
                  {...getTagProps({ index })}
                  onDelete={() =>
                    setSelectedSkills((prevSkills) =>
                      prevSkills?.filter((_, i) => i !== index)
                    )
                  }
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Skills" fullWidth margin="normal" />
            )}
          />

          <CompanyNameAutocomplete setThirdPartyApis={setThirdPartyApis} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <Button
              type="cancel"
              variant="contained"
              color="info"
              onClick={handleReset}
              sx={{ px: 5 }}
            >
              Reset Form
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ px: 5 }}
            >
              Add Project
            </Button>
          </Box>
        </div>
        <div className="flex-[0.3] px-10">
          <Divider>
            <Typography variant="h6">Details</Typography>
          </Divider>
          <div>{youtubePreview}</div>
          <table className="table-auto">
            <tbody>
              {projectName && (
                <tr>
                  <td className="border px-4 py-2">Project Name</td>
                  <td className="border px-4 py-2">{projectName}</td>
                </tr>
              )}
              {projectType && (
                <tr>
                  <td className="border px-4 py-2">Project Type</td>
                  <td className="border px-4 py-2">{projectType}</td>
                </tr>
              )}
              {projectCategory && (
                <tr>
                  <td className="border px-4 py-2">Project Industries</td>
                  <td className="border px-4 py-2">
                    {projectCategory.join(', ')}
                  </td>
                </tr>
              )}
              {description && (
                <tr>
                  <td className="border px-4 py-2">Description</td>
                  <td className="border px-4 py-2">{description}</td>
                </tr>
              )}
              {youtubeLink && (
                <tr>
                  <td className="border px-4 py-2">Github Repo Link</td>
                  <td className="border px-4 py-2">{githubRepoLink}</td>
                </tr>
              )}
              {projectLiveLink && (
                <tr>
                  <td className="border px-4 py-2">Project Live Link</td>
                  <td className="border px-4 py-2">{projectLiveLink}</td>
                </tr>
              )}
              {techStack.length > 0 && (
                <tr>
                  <td className="border px-4 py-2">Tech Stack</td>
                  <td className="border px-4 py-2">{techStack.join(', ')}</td>
                </tr>
              )}
              {thirdPartyApis.length > 0 && (
                <tr>
                  <td className="border px-4 py-2">Third Party APIs</td>
                  <td className="border px-4 py-2">
                    {thirdPartyApis.join(', ')}
                  </td>
                </tr>
              )}
              {youtubeLink && (
                <tr>
                  <td className="border px-4 py-2">YouTube Link</td>
                  <td className="border px-4 py-2">{youtubeLink}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AlumniLayout>
  );
};

export default ProjectForm;
