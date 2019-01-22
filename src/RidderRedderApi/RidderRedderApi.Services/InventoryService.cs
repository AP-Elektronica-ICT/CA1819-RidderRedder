using System;
using System.Collections.Generic;
using System.Text;
using RidderRedderApi.Models;
using RidderRedderApi.ViewModels;
using RidderRedderApi.Repositories;


namespace RidderRedderApi.Services {
    public class InventoryService {
        private InventoryRepository inventoryRepository;

        public InventoryService(InventoryRepository inventoryRepository) {
            this.inventoryRepository = inventoryRepository;
        }

        public List<InventoryItem> GetInventoryForPlayer(string authid) {
            return this.inventoryRepository.GetInventoryForPlayer(authid);
        }

        public InventoryItem PostInventoryItem(AddInventoryItemDto itemDto) {
            ItemImage img = inventoryRepository.GetItemImage(itemDto.ItemImageId);
            ItemType type = inventoryRepository.GetItemType(itemDto.ItemTypeId);


            /*
             * Check if item already exists in Inventory
             * Update amount if so.
             */
            InventoryItem existingItem = this.inventoryRepository.GetInventoryItemByColor(img);
            if (existingItem != null) {
                Console.WriteLine("Existing item was found, we're going to update its amount");
                var updateItem = new UpdateInventoryItemDto(
                    existingItem.ItemImage.ItemImageId,
                    existingItem.ItemType.ItemTypeId,
                    existingItem.Amount + itemDto.Amount
                );

                return this.UpdateInventoryItem(updateItem, existingItem.InventoryItemId);
            } else {
                Console.WriteLine("Existing item was not found, we're creating a new one");
            }


            InventoryItem item = new InventoryItem(itemDto.AuthId, img, type, itemDto.Amount);

            return this.inventoryRepository.PostInventoryItem(item);
        }

        public InventoryItem UpdateInventoryItem(UpdateInventoryItemDto itemDto, int itemid) {
            InventoryItem item = this.inventoryRepository.GetInventoryItem(itemid);
            ItemImage img = this.inventoryRepository.GetItemImage(itemDto.ItemImageId);
            ItemType type = this.inventoryRepository.GetItemType(itemDto.ItemTypeId);

            if (item == null)
                return null;

            if (img == null)
                img = item.ItemImage;

            if (type == null)
                type = item.ItemType;

            item.Amount = itemDto.Amount;
            item.ItemType = type;
            item.ItemImage = img;

            if(item.Amount == 0)
            {
                this.DeleteInventoryItem(itemid);
                return item;
            }

            return this.inventoryRepository.UpdateInventoryItem(item, itemid);

        }

        public bool DeleteInventoryItem(int itemid) {
            return this.inventoryRepository.DeleteInventoryItem(itemid);
        }

        public List<ItemImage> GetAllItemImages() {
            return this.inventoryRepository.GetAllItemImages();
        }

        public List<ItemType> GetAllItemTypes() {
            return this.inventoryRepository.GetAllItemTypes();
        }
    }
}
