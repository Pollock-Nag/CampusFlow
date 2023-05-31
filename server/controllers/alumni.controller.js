const Alumni = require('../models/alumni/alumni.model');
// import PeerRatings from ('../models/student/peerRating.model');
const PeerRatings = require('../models/student/peerRating.model');
const Student = require('../models/student/student.model');

const test = async (req, res) => {
  const name = req.query.name;
  await res.send(name);
};

const convertToAlumni = async (req, res) => {
  const { ids } = req.body;
  try {
    const alumniList = [];
    for (const id of ids) {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).send(`Student with ID ${id} not found`);
      }
      if (student.type == 'alumni') {
        return res.status(200).send({
          message: `Student with ID ${id} already converted to alumni`,
        });
      }

      // create alumni
      const newAlumni = {
        name: student.name,
        image: student.profileImg,
      };
      const alumni = await Alumni.create(newAlumni);
      await alumni.save();

      // update student status
      student.status = !student.status;
      student.type = 'alumni';
      student.alumniId = alumni._id;
      await student.save();

      alumniList.push(alumni);
      res.status(200).send({ message: 'Student converted to alumni', alumni });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

const postInfo = async (req, res) => {
  const { id } = req.params; // student id
  const type = req.query.type;
  const { info } = req.body;

  if (type === 'about') {
    try {
      const alumni = await Student.findById(id).populate('alumniId');
      alumni.alumniId[type] = info;
      await alumni.alumniId.save();
      res
        .status(200)
        .send({ message: `${type} updated`, alumni: alumni.alumniId });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    try {
      //   console.log(info);
      const alumni = await Student.findById(id).populate('alumniId');
      alumni.alumniId[type].push(info);
      await alumni.alumniId.save();
      res
        .status(200)
        .send({ message: ` ${type} added`, alumni: alumni.alumniId });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  }
};

const deleteInfo = async (req, res) => {
  const { id } = req.params; // alumni id
  const type = req.query.type;

  const { info } = req.body;
  try {
    const alumni = await Alumni.findById(id);

    alumni[type] = alumni[type].filter((element) => {
      return element._id.toString() !== info;
    });
    await alumni.save();
    res.status(200).send({ message: `${type} deleted`, alumni });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};
const addSkills = async (req, res) => {
  const items = req.body.info;
  const { id } = req.params;
  try {
    const alumni = await Alumni.findById(id);
    alumni.skills = items.map((item) => {
      //   console.log(item);
      return item;
    });

    // console.log(alumni.skills);
    await alumni.save();
    res.status(200).send({ message: 'Skills added', alumni });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const getAlumniById = async (req, res) => {
  const { id } = req.params; // alumni id
  try {
    const alumni = await Alumni.findById(id).populate('projects');
    //populate doneby

    if (!alumni) return res.status(404).send({ message: 'Alumni not found' });
    res.status(200).send(alumni);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const addStack = async (req, res) => {
  const { id } = req.params; // alumni id
  const { stack } = req.body;
  try {
    const alumni = await Alumni.findById(id);
    // console.log(alumni.stack);
    alumni.stack = stack;
    await alumni.save();
    res.status(200).send({ message: 'Stack added', alumni });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const insertPersonaityRating = async (req, res) => {
  try {
    const { id } = req.params; // student id
    // console.log(id);
    const result = await PeerRatings.find({
      givenBy: id,
    }).populate('givenTo');
    const indexArray = result.map((item) => {
      return item.givenTo.personalityType;
    });
    console.log(indexArray);

    const student = await Student.findById(id);

    const personalityRating = student.personalityRating;

    for (let i = 0; i < indexArray.length; i++) {
      personalityRating[indexArray[i] - 1] = (result[i].rate / 10).toFixed(3);
    }

    student.personalityRating = personalityRating;
    await student.save();
    res.status(200).send({ message: 'successfully save peerRating' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  convertToAlumni,
  postInfo,
  deleteInfo,
  addSkills,
  getAlumniById,
  addStack,
  insertPersonaityRating,
};
