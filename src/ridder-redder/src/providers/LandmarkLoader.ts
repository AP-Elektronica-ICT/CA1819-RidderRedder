import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LandmarkProvider } from "./landmark/LandmarkProvider";
import { Landmark } from "../models/Landmark";

export class LandmarkLoader {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.auth.access_token}`
        })
    }

    data: RootObject;


    constructor(public http: HttpClient) {
        this.http.get<RootObject>('https://opendata.arcgis.com/datasets/5ccff54ed791480aa91bc8f5fcf2e9ab_292.geojson').subscribe(data => {
            this.data = data;

            this.setLandmarks();
        })
    }

    private setLandmarks() {
        this.data.features.forEach(element => {
            let lm = {
                "landmarkId": undefined,
                "lat": element.properties.LAT,
                "lng": element.properties.LON,
                "name": element.properties.naam,
                "owner": undefined,
                "knights": []
            }
            setTimeout(() => {
                this.http.post('http://ridderredder.francecentral.cloudapp.azure.com/api/v1/Landmark/0', lm, this.httpOptions).subscribe(s => {
                    console.log(s);
                })
            }, 1000);
        });
    }


}


export interface Properties {
    OBJECTID: number;
    GISID: string;
    locatie_adres_ID: string;
    bloso_id: string;
    type: string;
    categorie: string;
    naam: string;
    straat: string;
    huisnr: string;
    busnr?: any;
    postcode: string;
    gemeente: string;
    link: string;
    aantal: string;
    oppervlakte: string;
    bereikbaarheid?: any;
    toegankelijk: string;
    email: string;
    telefoon: string;
    fax?: any;
    X: number;
    Y: number;
    LAT: number;
    LON: number;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
}

export interface RootObject {
    type: string;
    features: Feature[];
}
