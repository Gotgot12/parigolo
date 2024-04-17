// models/choice.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import Person from "./person";
import Room from "./room";

interface PersonRoomAttributes {
    PersonId: number;
    RoomId: number;
  }
  
class PersonRoom extends Model<PersonRoomAttributes> implements PersonRoomAttributes {
public PersonId!: number;
public RoomId!: number;
}

PersonRoom.init(
{
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
},
{
    sequelize,
    modelName: 'PersonRoom',
}
);

export default PersonRoom;