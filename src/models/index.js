const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Request = require("./request")(sequelize, DataTypes);
db.EmployeeMapping = require("./employee_mapping")(sequelize, DataTypes);

Object.values(db)
  .filter((model) => model.associate)
  .forEach((model) => model.associate(db));

module.exports = db;
