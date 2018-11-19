import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monster } from '../../models/Monster';

/*
  Generated class for the MonsterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonsterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MonsterProvider Provider');
  }

  getRandomMonster(): Monster{
    return {
      Name: { MonsterNameId: 1, MonsterName: "Johan"},
      Title: { MonsterTitleId: 1, MonsterTitle: "Baron"},
      Model: { MonsterModelId: 1, MonsterModelPath: "../../assets/imgs/black_night.png"},
      Difficulty: 2,
      Level: 4,
      Marker: null,
    }
  }
}
