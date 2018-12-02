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

            return this.inventoryRepository.UpdateInventoryItem(item, itemid);

        }

        public bool DeleteInventoryItem(int itemid) {
            return this.inventoryRepository.DeleteInventoryItem(itemid);
        }
    }
}
