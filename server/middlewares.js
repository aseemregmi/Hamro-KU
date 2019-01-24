const { Token } = require('./models/token');
const { Class } = require('./models/class');
const { Student } = require('./models/student');
const { Teacher } = require('./models/teacher');

const isAuthenticatedAsTeacher = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const tokeninDB = await Token.findOne({ token });
    if (tokeninDB.userType === 'teacher') {
      next();
    } else {
      throw '';
    }
  } catch (err) {
    res.status(401).send();
  }
};

const isAuthenticatedAsStudent = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const tokeninDB = await Token.findOne({ token });
    if (tokeninDB.userType === 'student') {
      next();
    } else {
      throw '';
    }
  } catch (err) {
    res.status(401).send();
  }
};

const isAuthenticatedAsAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const tokeninDB = await Token.findOne({ token });
    if (tokeninDB.userType === 'admin') {
      next();
    } else {
      throw '';
    }
  } catch (err) {
    res.status(401).send();
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const tokeninDB = await Token.findOne({ token });
    if (tokeninDB) {
      next();
    } else {
      throw '';
    }
  } catch (err) {
    res.status(401).send();
  }
};

const checkIfTeacherTeachesInThatClass = async (req, res, next) => {
  try {
    const classId = req.query.class || req.body.classId;
    const { token } = req.headers;

    const tokeninDB = await Token.findOne({ token });
    if (tokeninDB.userType === 'teacher') {
      const classInDB = await Class.findOne({
        _id: classId,
        teacher: tokeninDB.userId
      });
      if (classInDB) {
        next();
      } else {
        throw '';
      }
    } else {
      throw '';
    }
  } catch (err) {
    res.status(401).send();
  }
};

const checkIfStudentBelongsToThatGroupOrTeacherIdAndTokenOfTeacherMatches = async (
  req,
  res,
  next
) => {
  try {
    // Got Token
    const { token } = req.headers;
    // Got Token In DB
    const tokeninDB = await Token.findOne({ token });

    // If Token Exists Continue On
    if (tokeninDB) {
      if (req.query.group) {
        // If group is queried
        const userInDB = await Student.findById(tokeninDB.userId);
        if (userInDB.group == req.query.group) {
          next();
        } else {
          res.status(401).send();
        }
      } else if (req.query.teacher) {
        if (tokeninDB.userId == req.query.teacher) {
          next();
        } else {
          res.status(401).send();
        }
      } else {
        res.status(401).send();
      }
    } else {
      // Token Not Found So Not Authorized
      res.status(401).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

const unAuthorizeArrayInQueries = async (req, res, next) => {
  const keys = Object.keys(req.query);
  let isThereArray = false;
  await Promise.all(
    keys.map(async key => {
      if (req.query[key] instanceof Object && req.query[key] instanceof Array) {
        isThereArray = true;
      }
    })
  );
  if (isThereArray) {
    res.status(400).send();
  } else {
    next();
  }
};

const checkIfStudentBelongsToTheSameGroupAndHasSpecialAuthority = async (
  req,
  res,
  next
) => {
  try {
    const { group } = req.body;
    const { token } = req.headers;
    const tokenInDB = await Token.findOne({ token });
    const student = await Student.findById(tokenInDB.userId);
    if (student.group == group && student.specialAuthority) {
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send();
  }
};

const checkIfStudentBelongsToTheSameClassAndHasSpecialAuthority = async (
  req,
  res,
  next
) => {
  try {
    const { classId } = req.body;
    const { token } = req.headers;
    const tokenInDB = await Token.findOne({ token });
    const classInDB = await Class.findById(classId);
    const studentInDB = await Student.findById(tokenInDB.userId);
    if (studentInDB.group.equals(classInDB.group)) {
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send();
  }
};

const checkEitherStudentOrTeacherBelongsToTheClass = async (req, res, next) => {
  const { classId } = req.query;
  const { token } = req.headers;

  try {
    const tokenInDB = await Token.findOne({ token });
    const classInDB = await Class.findById(classId);
    if (tokenInDB.userType === 'teacher') {
      if (tokenInDB.userId.equals(classInDB.teacher)) {
        next();
      } else {
        res.status(401).send();
      }
    } else if (tokenInDB.userType === 'student') {
      const studentInDB = await Student.findById(tokenInDB.userId);
      if (studentInDB.group.equals(classInDB.group)) {
        next();
      } else {
        res.status(401).send();
      }
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

const eitherAuthenticatedAsStudentWithSpecialAuthorityOrAdmin = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.headers;

    const tokenInDB = await Token.findOne({ token });

    if (tokenInDB.userType === 'student') {
      const studentInDB = await Student.findById(tokenInDB.userId);

      if (studentInDB.specialAuthority) {
        next();
      } else {
        res.status(401).send();
      }
    } else if (tokenInDB.userType === 'admin') {
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

const isHimself = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const { token } = req.headers;
    const tokenInDB = await Token.findOne({ token });
    if (tokenInDB.userId == _id) {
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

const isAuthenticatedAsAdminOrTeacherTeachingInThatGroup = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.headers;

    const tokenInDB = await Token.findOne({ token });

    if (tokenInDB.userType === 'admin') {
      next();
    } else if (tokenInDB.userType === 'teacher') {
      const classInDB = await Class.findOne({
        group: req.query.group,
        teacher: tokenInDB.userId
      });

      if (classInDB) {
        next();
      } else {
        res.status(401).send();
      }
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  isAuthenticatedAsAdmin,
  isAuthenticatedAsStudent,
  isAuthenticatedAsTeacher,
  isAuthenticated,
  checkIfTeacherTeachesInThatClass,
  checkIfStudentBelongsToThatGroupOrTeacherIdAndTokenOfTeacherMatches,
  unAuthorizeArrayInQueries,
  checkIfStudentBelongsToTheSameGroupAndHasSpecialAuthority,
  checkEitherStudentOrTeacherBelongsToTheClass,
  checkIfStudentBelongsToTheSameClassAndHasSpecialAuthority,
  eitherAuthenticatedAsStudentWithSpecialAuthorityOrAdmin,
  isHimself,
  isAuthenticatedAsAdminOrTeacherTeachingInThatGroup
};
