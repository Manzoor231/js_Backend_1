import ApiError from "../utils/ApiError.js";

const validate = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({msg:"All Fields are required"});
  next();
};

const validateUpdate = async (req, res, next) => {
  const { username, email,  } = req.body;
  if (!username || !email) return res.status(400).json({msg:"All Fields are required"});
  next();
};
const validateLogin = async (req, res, next) => {
  const { username, password,  } = req.body;
  if (!username || !password) return res.status(400).json({msg:"All Fields are required"});
  next();
};
export  {validate, validateUpdate,validateLogin};
