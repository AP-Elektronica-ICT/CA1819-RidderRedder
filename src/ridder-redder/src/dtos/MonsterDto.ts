import { MonsterModel } from "../models/MonsterModel";
import { MonsterTitle } from "../models/MonsterTitle";
import { MonsterName } from "../models/MonsterName";

export interface MonsterDto {
    monsterId: number;
    monsterModel: MonsterModel;
    monsterTitle: MonsterTitle;
    monsterName: MonsterName;
}