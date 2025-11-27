const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, EmployeeMapping } = require("../models");
const { Op } = require("sequelize");


exports.getUserList = async (currentUserId) => {
  const users = await User.findAll({
    where: {
      id: { [Op.ne]: currentUserId },
      role: { [Op.ne]: 'MANAGER' }
    },
    attributes: ["id", "name", "email", "emp_id", "role", "status", "created_at"],
    order: [["created_at", "DESC"]],
  });

  return users;
};

exports.getManagerList = async () => {
  const users = await User.findAll({
    where: {
      role: { [Op.ne]: 'EMPLOYEE' }
    },
    attributes: ["id", "name", "email", "emp_id", "role", "status", "created_at"],
    order: [["created_at", "DESC"]],
  });

  return users;
};

