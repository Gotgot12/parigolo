// models/choice.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./person";
import Room from "./room";

const PersonRoom = sequelize.define('PersonRoom', {
    PersonId: {
        type: DataTypes.INTEGER,
        references: {
          model: Person,
          key: 'id',
        },
      },
    RoomId: {
        type: DataTypes.INTEGER,
        references: {
          model: Room,
          key: 'id',
        },
      },
});

export default PersonRoom;