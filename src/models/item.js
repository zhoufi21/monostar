import { DataTypes } from "sequelize";

const Item = (sequelize) =>
  sequelize.define("item", {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    producer: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    box_number: { type: DataTypes.INTEGER, allowNull: false },
    item_per_box: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    box_sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isLessThanTotal(value) {
          if (parseInt(value) > parseInt(this.box_number)) {
            throw new Error(
              "Boxes sold must be less than total number of boxes"
            );
          }
        },
      },
    },
  });

export { Item };
