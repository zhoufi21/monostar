import DataType from "sequelize";

const Customer = (sequelize) =>
  sequelize.define(
    "customer",
    {
      name: {
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      date_created: {
        type: DataType.DATEONLY,
        allowNull: true,
      },
    },
    {   timestamps: false,
        createAt: false }
  );

export { Customer };
