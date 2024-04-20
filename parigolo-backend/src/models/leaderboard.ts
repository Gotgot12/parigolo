import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database";
import Room from "./room";
import Person from "./person";

interface LeaderboardAttributes {
    id: number;
    score: number;
    RoomId: number;
    PersonId: number;
}

class Leaderboard extends Model<LeaderboardAttributes> implements LeaderboardAttributes {
    public id!: number;
    public score!: number;
    public RoomId!: number;
    public PersonId!: number;
}

Leaderboard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        score: DataTypes.DOUBLE,
        RoomId: {
            type: DataTypes.INTEGER,
            references: {
                model: Room,
                key: 'id',
            },
        },
        PersonId: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id',
            },
        }
    },
    {
        sequelize,
        modelName: 'Leaderboard',
    }
);

export default Leaderboard;