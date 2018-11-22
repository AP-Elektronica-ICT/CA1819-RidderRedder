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

        public InventoryItem PostInventoryItem(AddInventoryItemDto item) {
            return this.inventoryRepository.PostInventoryItem(item);
        }

        public InventoryItem UpdateInventoryItem(UpdateInventoryItemDto item, int itemid) {
            return this.inventoryRepository.UpdateInventoryItem(item, itemid);

        }

        public bool DeleteInventoryItem(int itemid) {
            return this.inventoryRepository.DeleteInventoryItem(itemid);
        }
    }
}
