"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE TYPE "enum_users_role" AS ENUM ('EMPLOYEE', 'MANAGER');`);
    await queryInterface.sequelize.query(`CREATE TYPE "enum_users_status" AS ENUM ('ACTIVE', 'BLOCKED');`);

    await queryInterface.sequelize.query(`CREATE SEQUENCE employee_id_seq START 1;`);

    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      emp_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal(`('EMP-' || LPAD(nextval('employee_id_seq')::text, 4, '0'))`)
      },

      role: {
        type: "enum_users_role",
        allowNull: false,
        defaultValue: "EMPLOYEE",
      },

      status: {
        type: "enum_users_status",
        allowNull: false,
        defaultValue: "ACTIVE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(`DROP SEQUENCE IF EXISTS employee_id_seq;`);
    await queryInterface.sequelize.query(`DROP TYPE "enum_users_role";`);
    await queryInterface.sequelize.query(`DROP TYPE "enum_users_status";`);
  },
};
