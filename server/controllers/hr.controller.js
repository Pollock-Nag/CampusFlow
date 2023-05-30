const Student = require('../models/student/student.model');
const Alumni = require('../models/alumni/alumni.model');
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
        if (techSkill.skill.toString() === skilltypeId) {
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

    // if (stackType === 'frontend') {
    //   let tempFilter = [];
    //   let filteredAlumniListByStack = filterByStack(allAlumniList, stackType);

    //   let filteredAlumniListByFullStack = filterByStack(
    //     allAlumniList,
    //     'fullstack'
    //   );

    //   const filteredFrontendAlumnus = [
    //     ...filteredAlumniListByStack,
    //     ...filteredAlumniListByFullStack,
    //   ];

    //   frontendResult = filterBySkillsId(
    //     filteredFrontendAlumnus,
    //     tempFilter,
    //     skilltypeIds
    //   );

    //   return res.send(sortBySum(frontendResult));
    // } else if (stackType === 'backend') {
    //   let tempFilter = [];
    //   let filteredAlumniListByStack = filterByStack(allAlumniList, stackType);
    //   let filteredAlumniListByFullStack = filterByStack(
    //     allAlumniList,
    //     'fullstack'
    //   );

    //   const filteredBackendAlumnus = [
    //     ...filteredAlumniListByStack,
    //     ...filteredAlumniListByFullStack,
    //   ];

    //   backendResult = filterBySkillsId(
    //     filteredBackendAlumnus,
    //     tempFilter,
    //     skilltypeIds
    //   );

    //   return res.send(sortBySum(backendResult));
    // } else if (stackType === 'fullstack') {
    //   let tempFilter = [];
    //   let filteredAlumniListByFullStack = filterByStack(
    //     allAlumniList,
    //     'fullstack'
    //   );

    //   fullStackResult = filterBySkillsId(
    //     filteredAlumniListByFullStack,
    //     tempFilter,
    //     skilltypeIds
    //   );

    //   return res.status(200).send(sortBySum(fullStackResult));
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  stackWiseFilter,
};
