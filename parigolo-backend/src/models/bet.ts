import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Bet = sequelize.define('Bet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  sport: DataTypes.STRING,
  isClosed: DataTypes.BOOLEAN,
  isEnded: DataTypes.BOOLEAN,
  RoomId: DataTypes.INTEGER,
  option1: DataTypes.STRING,
  option2: DataTypes.STRING,
});

export default Bet;