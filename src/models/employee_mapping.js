module.exports = (sequelize, DataTypes) => {
  const EmployeeMapping = sequelize.define(
    "EmployeeMapping",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      }
    },
    {
      tableName: "employee_mapping",
      underscored: true,
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  EmployeeMapping.associate = (models) => {
    EmployeeMapping.belongsTo(models.User, {
      as: "employee",
      foreignKey: "employee_user_id",
    });

    EmployeeMapping.belongsTo(models.User, {
      as: "manager",
      foreignKey: "manager_user_id",
    });
  };

  return EmployeeMapping;
};
