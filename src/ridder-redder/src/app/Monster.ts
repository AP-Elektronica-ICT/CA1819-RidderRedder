import { Marker } from '@ionic-native/google-maps';


export class Monster{

  marker: Marker;
  name: string;

  static random(): Monster{
    let monster: Monster = new Monster();
    monster.name = "randomise this";
    return monster; 
  }
}
