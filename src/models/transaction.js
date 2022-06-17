import { DataTypes } from "sequelize";

const Transaction = (sequelize) =>
  sequelize.define(
    "transaction",
    {
      customer: {
        type: DataTypes.STRING,
        references: {
          model: "customers",
          key: "name",
        },
        primaryKey: true,
      },
      item: {
        type: DataTypes.STRING,
        references: {
          model: "items",
          key: "model",
        },
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      box_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isPositive(value) {
            if (parseInt(value) < 0) {
              throw new Error("payment cannot be less than zero");
            }
          },
        },
      },
    },
    { timestamps: false, createAt: false }
  );

export { Transaction };
