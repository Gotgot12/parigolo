// models/room.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

interface RoomInstance extends Model {
  id: number;
  name: string;
  ownerId: number;
}

const Room = sequelize.define<RoomInstance>('Room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  ownerId: DataTypes.INTEGER
});

export default Room;