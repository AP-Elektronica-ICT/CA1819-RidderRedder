import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/AuthProvider';
import { InventoryItem } from '../../models/InventoryItem';
import { Observable } from 'rxjs';
import { ItemType } from '../../models/ItemType';
import { ItemImage } from '../../models/ItemImage';
import { AddInventoryItemDto } from '../../dtos/AddInventoryItemDto';

/*
  Generated class for the InventoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryProvider {

    public ItemTypes: ItemType[];
    public ItemImages: ItemImage[];

    // When the InventoryProvider is created, we immediately start loading
    // in all ItemImages and ItemTypes. These values should not change
    // while we're running the game, so we should only do this once.
    constructor(public http: HttpClient, private auth: AuthProvider) {
        this.getItemImages().subscribe(images => {
            this.ItemImages = images;
            // console.log(this.ItemImages);
        })
        this.getItemTypes().subscribe(types => {
            this.ItemTypes = types;
            // console.log(this.ItemTypes);
        })
    }

    // Get an item image by ID
    // PARAM: id: the ID of the image stored in the database.
    // RETURNS: ItemImage
    public getItemImageById(id: number): ItemImage {
        if (!this.ItemImages)
            this.ItemImages = [];

        this.ItemImages.forEach(img => {
            if (img.itemImageId == id)
                return img;
        })

        return null;
    }

    // Get an item image by path
    // PARAM: path: the path of the image. Giving just
    // the name of the image should do.
    // RETURNS: ItemImage
    public getItemImageByPath(path: string): ItemImage {
        if (!this.ItemImages)
            this.ItemImages = [];

        this.ItemImages.forEach(img => {
            if (img.path.includes(path))
                return img;
        });

        return null;
    }

    // Get a random image from one of the saved images
    // PARAM: none
    // RETURN: ItemImage
    public getRandomImage(): ItemImage {
        let randomIndex = Math.floor(Math.random() * this.ItemImages.length);
        return this.ItemImages[randomIndex];
    }

    // Get an item type by ID
    // PARAM: id: the ID of the ItemType
    // RETURNS: ItemType
    public getItemTypeById(id: number): ItemType{
        if (!this.ItemTypes)
            this.ItemTypes = [];

        this.ItemTypes.forEach(type => {
            if (type.itemTypeId == id)
                return type;
        });

        return null;
    }

    // Get an item type by name
    // PARAM: name: the name of the ItemType. Example: Knight
    // RETURNS: ItemType
    public getItemTypeByName(name: string): ItemType {
        if (!this.ItemTypes)
            this.ItemTypes = [];

        this.ItemTypes.forEach(type => {
            if (type.itemTypeName.includes(name))
                return type;
        });

        return null;
    }

    // Get all item images from the API
    // PARAM: none
    // RETURNS: Observable<ItemImage[]>
    public getItemImages(): Observable<ItemImage[]> {
        // console.log(`${this.baseUrl}/inventory/images`);
        return this.http.get<ItemImage[]>(`/inventory/images`);
    }

    // Get all item types from the API
    // PARAM: none
    // RETURNS: Observable<ItemType[]>
    public getItemTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(`/inventory/types`);
    }

    // Get the inventory from the logged in played
    // PARAM: none
    // RETURNS: Observable<InventoryItem[]>
    public getInventory(): Observable<InventoryItem[]> {
        return this.http.get<InventoryItem[]>(`/inventory/${this.auth.AuthId}`);
    }

    // Add an InventoryItem to the player's inventory
    // PARAM: item: AddInventoryItemDto
    // RETURNS: Observable<InventoryItem>
    public addToInventory(item: AddInventoryItemDto): Observable<InventoryItem> {
        return this.http.post<InventoryItem>(`/inventory`, item);
    }

    // Update an InventoryItem
    // PARAMS: itemId: the ID of the item to update, item: the InventoryItem to update
    // RETURNS: Observable<InventoryItem>
    public updateInventoryItem(itemId: number, item: InventoryItem): Observable<InventoryItem> {
        return this.http.put<InventoryItem>(`/inventory/${itemId}`, item);
    }

    // Delete an InventoryItem by ID
    // PARAM: itemId: the ID of the item to delete
    // RETURNS: Observable<Boolean>
    public deleteInventoryItem(itemId: number): Observable<Boolean> {
        return this.http.delete<Boolean>(`/inventory/${itemId}`);
    }

}
