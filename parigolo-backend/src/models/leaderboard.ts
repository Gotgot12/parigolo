import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database";
import Room from "./room";

interface LeaderboardAttributes {
    id: number;
    score: number;
    RoomId: number
}

class Leaderboard extends Model<LeaderboardAttributes> implements LeaderboardAttributes {
    public id!: number;
    public score!: number;
    public RoomId!: number;
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
        }
    },
    {
        sequelize,
        modelName: 'Leaderboard',
    }
);

export default Leaderboard;