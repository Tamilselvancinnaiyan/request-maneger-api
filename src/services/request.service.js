const { Request, User , EmployeeMapping} = require("../models");
const { Op } = require("sequelize");

async function findRequestOrThrow(id) {
  const req = await Request.findByPk(id);

  if (!req) {
    const err = new Error("Request not found");
    err.status = 404;
    throw err;
  }
  return req;
}

exports.create = async ({ userId, payload }) => {
  const { title, description, assigneeId } = payload;

  const request = await Request.create({
    title,
    description,
    created_by: userId,
    assigned_to: assigneeId,
    status: "ASSIGNED",
  });

  return request;
};

exports.listForUser = async (user) => {
  const requests = await Request.findAll({
    where: {
      created_by: user.id,
    },
    include: [
      {
        model: User,
        as: "assignee",     
        attributes: ["name", "emp_id"],
      },
    ],
    order: [["updated_at", "DESC"]],
  });

  return requests;
};

exports.listForManager = async (user) => {
  console.log(user)
  const mappings = await EmployeeMapping.findAll({
    where: { manager_user_id: user.id },
    attributes: ["employee_user_id"],
  });

  const employeeIds = mappings.map((m) => m.employee_user_id);
console.log(employeeIds)
  if (employeeIds.length === 0) {
    return []; 
  }

  const requests = await Request.findAll({
    where: {
      assigned_to: { [Op.in]: employeeIds },
    },
    include: [
      {
        model: User,
        as: "assignee",
        attributes: ["id", "name", "emp_id"],
      },
    ],
    order: [["updated_at", "DESC"]],
  });

  return requests;
};

exports.approve = async ({ userId, requestId }) => {
  const req = await findRequestOrThrow(requestId);

  if (req.status== "ASSIGNED" && req.status !== "REJECTED") {
    const err = new Error("Only pending requests can be approved");
    err.status = 400;
    throw err;
  }

  req.status = "APPROVED";
  await req.save();
  return req;
};

exports.reject = async ({ userId, requestId }) => {
  const req = await findRequestOrThrow(requestId);

  if (req.status !== "ASSIGNED") {
    const err = new Error("Only pending requests can be rejected");
    err.status = 400;
    throw err;
  }

  req.status = "REJECTED";
  await req.save();
  return req;
};

exports.close = async ({ userId, requestId }) => {
  const req = await findRequestOrThrow(requestId); 

  if (req.status !== "APPROVED") {
    const err = new Error("Only approved requests can be closed");
    err.status = 400;
    throw err;
  }

  if (req.dataValues.assigned_to !== userId) {
    const err = new Error("Only assignee can close this request");
    err.status = 403;
    throw err;
  }

  req.status = "CLOSED";  
  await req.save();    
  return req;
};


exports.assigned = async (user) => {
  const requests = await Request.findAll({
    where: {
      assigned_to: user.id,
    },
    include: [
      {
        model: User,
        as: "creator",     
        attributes: ["name", "emp_id"],
      },
    ],
    order: [["updated_at", "DESC"]],
  });

  return requests;
};

