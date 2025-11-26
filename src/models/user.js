module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("USER", "MANAGER"),
        allowNull: false,
        defaultValue: "USER",
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "BLOCKED"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
      paranoid: true,  
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Request, {
      as: "createdRequests",
      foreignKey: "created_by",
    });

    User.hasMany(models.Request, {
      as: "assignedRequests",
      foreignKey: "assigned_to",
    });
  };

  return User;
};
