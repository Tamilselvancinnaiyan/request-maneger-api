const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, EmployeeMapping } = require("../models");

exports.signup = async ({ name, email, password, role, emp_id, manager_id }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const err = new Error("Email already in use");
    err.status = 400;
    throw err;
  }

  const hash = await bcrypt.hash(password, 10);

  let managerUser = null;

  if (role === "EMPLOYEE") {
    if (!manager_id) {
      const err = new Error("Manager employee code is required for employees");
      err.status = 400;
      throw err;
    }

    managerUser = await User.findOne({
      where: { emp_id: manager_id, role: "MANAGER" },
    });

    if (!managerUser) {
      const err = new Error("Invalid manager employee code or user is not a manager");
      err.status = 400;
      throw err;
    }
  }

  const user = await User.create({
    name,
    email,
    password: hash,
    emp_id,
    role,
  });

  if (role === "EMPLOYEE") {
    await EmployeeMapping.create({
      employee_user_id: user.id,
      manager_user_id: managerUser.id,
    });
  }

  return {
    id: user.id,
    name: user.name,
    emp_id: user.emp_id,
    email: user.email,
    role: user.role,
    manager_id: managerUser?.id || null,
  };
};


exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      manager_id: user.manager_id,
    },
  };
};
