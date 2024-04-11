// models/room.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
});

export default Room;