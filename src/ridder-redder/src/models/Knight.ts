export class Knight{
    knightId: number;
    authId: string;
    colour: string;
    level: number;
    landmarkId: number;

    constructor(knightId: number, authId: string, colour: string, level: number, landmarkId: number){
        this.knightId = knightId;
        this.authId = authId;
        this.colour = colour;
        this.level = level;
        this.landmarkId = landmarkId;
    }
}
