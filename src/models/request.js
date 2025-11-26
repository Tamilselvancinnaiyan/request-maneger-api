module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "tasks",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
    },
    {
      tableName: "tasks",
      underscored: true,
      timestamps: true,
      paranoid: true,
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
