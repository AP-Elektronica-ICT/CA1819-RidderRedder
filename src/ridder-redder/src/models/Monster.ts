import { MonsterName } from "./MonsterName";
import { MonsterTitle } from "./MonsterTitle";
import { MonsterModel } from "./MonsterModel";
import { Marker } from '@ionic-native/google-maps'

export class Monster {
    MonsterId: number;
    Name: MonsterName;
    Title: MonsterTitle;
    Model: MonsterModel;
    Difficulty: number;
    Level: number;
    Health: number;
    MaxHealth: number;
    Marker: Marker
}
    