const Student = require('../models/student/student.model');
const Alumni = require('../models/alumni/alumni.model');
const Hrdetails = require('../models/hr/hr.model');
const axios = require('axios');
const env = require('dotenv');
// const Skill = require('../models/skill/skill.model');

// util functions
const filterByStack = (allAlumniList, stack) => {
  const filteredAlumniList = allAlumniList.filter((alumni) => {
    if (alumni.alumniDetails.stack === stack) return alumni;
  });
  return filteredAlumniList;
};

const filterBySkillsId = (
  filteredAlumniByStacked,
  tempFilter,
  skilltypeIds
) => {
  for (const skilltypeId of skilltypeIds) {
    for (const alumni of filteredAlumniByStacked) {
      let sum = 0;
      alumni.checkpoint.techSkills.forEach((techSkill) => {
        if (techSkill?.skill?.toString() === skilltypeId) {
          if (tempFilter.includes(alumni)) {
            alumni.sum += techSkill.marks;
          } else {
            alumni.sum = techSkill.marks;
            tempFilter.push(alumni);
          }
        }
      });
    }
  }
  return tempFilter;
};

const sortBySum = (tempFilter) => {
  tempFilter.sort((a, b) => {
    return b.sum - a.sum;
  });
  return tempFilter;
};

function filterAlumniListByStackType(stackType, allAlumniList, skilltypeIds) {
  let tempFilter = [];
  let filteredAlumniListByStack = filterByStack(allAlumniList, stackType);
  let filteredAlumniListByFullStack = filterByStack(allAlumniList, 'fullstack');

  let result;

  if (stackType === 'frontend') {
    const filteredFrontendAlumnus = [
      ...filteredAlumniListByStack,
      ...filteredAlumniListByFullStack,
    ];

    result = filterBySkillsId(
      filteredFrontendAlumnus,
      tempFilter,
      skilltypeIds
    );
  } else if (stackType === 'backend') {
    const filteredBackendAlumnus = [
      ...filteredAlumniListByStack,
      ...filteredAlumniListByFullStack,
    ];

    result = filterBySkillsId(filteredBackendAlumnus, tempFilter, skilltypeIds);
  } else if (stackType === 'fullstack') {
    result = filterBySkillsId(
      filteredAlumniListByFullStack,
      tempFilter,
      skilltypeIds
    );
  }

  return sortBySum(result);
}

const stackWiseFilter = async (req, res) => {
  const stackType = req.body.stack; // frontend, backend, fullstack
  const skilltypeIds = req.body.skill; // react, angular, nodejs, expressjs, mongodb, mysql, etc's id
  try {
    // find all alumni from student collection
    const students = await Student.find({ type: 'alumni' });

    const allAlumniList = [];
    for (const student of students) {
      const { checkpoints, alumniId } = student;
      const alumniDetails = await Alumni.findById(alumniId);

      allAlumniList.push({
        studentId: student._id,
        alumniDetails: alumniDetails,
        checkpoint: checkpoints[3],
        personalityType: student.personalityType,
      });
    }

    if (stackType === 'frontend') {
      let frontendResult = filterAlumniListByStackType(
        stackType,
        allAlumniList,
        skilltypeIds
      );
      return res.status(200).send(frontendResult);
    } else if (stackType === 'backend') {
      let backendResult = filterAlumniListByStackType(
        stackType,
        allAlumniList,
        skilltypeIds
      );
      return res.status(200).send(backendResult);
    } else if (stackType === 'fullstack') {
      let fullStackResult = filterAlumniListByStackType(
        stackType,
        allAlumniList,
        skilltypeIds
      );
      return res.status(200).send(fullStackResult);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const getMLmatch = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const student = await Student.findById(id);
    const { pesonlaityType, personalityRating } = student;
    // 'http://127.0.0.1:5000/predict'
    // axios diya call marbo ml endpoint e
    console.log(process.env.ML_URL);
    const mlResult = await axios.post(`${process.env.ML_URL}/predict`, {
      features: personalityRating,
    });
    res.status(200).send(mlResult.data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

// const allAlumni = await Student.find({type: 'alumni'});

// add hr details to hr collection
const addHrDetails = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    companyWebsite,
    companyEmail,
    title,
    country,
    userid,
  } = req.body;
  try {
    const newHr = new Hrdetails({
      firstName,
      lastName,
      companyName,
      companyWebsite,
      companyEmail,
      title,
      country,
      userid,
    });
    await newHr.save();
    res.status(200).send('HR details added successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  stackWiseFilter,
  getMLmatch,
  addHrDetails,
};
