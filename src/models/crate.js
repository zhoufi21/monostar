import { DataTypes } from "sequelize";
const Crate = (sequelize) =>
  sequelize.define(
    "crate",
    {
      crate_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      transport_company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
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

export { Crate };
