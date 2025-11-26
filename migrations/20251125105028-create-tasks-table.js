module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("ASSIGNED", "APPROVED", "REJECTED", "CLOSED"),
        allowNull: false,
        defaultValue: "ASSIGNED",
      },
    },
    {
      tableName: "tasks",
      underscored: true,
      timestamps: true,
      paranoid: true,   // enables deleted_at
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      as: "creator",
      foreignKey: "created_by",
    });

    Task.belongsTo(models.User, {
      as: "assignee",
      foreignKey: "assigned_to",
    });
  };

  return Task;
};
