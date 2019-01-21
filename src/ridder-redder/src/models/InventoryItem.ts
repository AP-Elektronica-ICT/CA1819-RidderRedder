import { ItemImage } from "./ItemImage";
import { ItemType } from "./ItemType";

export interface InventoryItem {
    inventoryItemId: number;
    authId: string;
    itemImage: ItemImage;
    itemType: ItemType;
    amount: number;
}



