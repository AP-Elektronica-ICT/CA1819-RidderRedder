export class Knight{
  id: number;
  owner: string;
  colour: string;
  level: number;

  constructor(id: number, owner: string, colour: string, level: number){
    this.id = id;
    this.owner = owner;
    this.colour = colour;
    this.level = level;
  }
}
