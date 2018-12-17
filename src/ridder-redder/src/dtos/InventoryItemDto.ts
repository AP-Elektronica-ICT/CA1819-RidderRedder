import { ItemImage } from "../models/ItemImage";
import { ItemType } from "../models/ItemType";

export interface InventoryItem {
    inventoryItemId: number;
    authId: string;
    itemImage: ItemImage;
    itemType: ItemType;
    amount: number;
}



