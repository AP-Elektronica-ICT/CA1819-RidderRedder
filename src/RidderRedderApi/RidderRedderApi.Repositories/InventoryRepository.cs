using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;
using RidderRedderApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RidderRedderApi.Repositories {
    public class InventoryRepository {

        private ApplicationContext context;

        public InventoryRepository(ApplicationContext ctx) {
            context = ctx;
        }


        public List<InventoryItem> GetInventoryForPlayer(string authid) {
            try {
                return this.context.InventoryItems.Include(d => d.ItemImage).Include(d => d.ItemType).ToList();
            } catch (Exception e) {
                throw e;
            }
        }

        public InventoryItem PostInventoryItem(AddInventoryItemDto itemDto) {
            try {
                ItemImage img = context.ItemImages.Find(itemDto.ItemImageId);
                ItemType type = context.ItemTypes.Find(itemDto.ItemTypeId);

                InventoryItem item = new InventoryItem(itemDto.AuthId, img, type, itemDto.Amount);

                this.context.InventoryItems.Add(item);
                this.context.SaveChanges();

                return item;

            } catch (Exception e) {
                throw e;
            }
        }

        public InventoryItem UpdateInventoryItem(UpdateInventoryItemDto itemDto, int itemid) {
            try {
                InventoryItem item = this.context.InventoryItems.Find(itemid);
                ItemImage img = context.ItemImages.Find(itemDto.ItemImageId);
                ItemType type = context.ItemTypes.Find(itemDto.ItemTypeId);

                if (item == null)
                    return null;

                if (img == null)
                    img = item.ItemImage;

                if (type == null)
                    type = item.ItemType;

                item.Amount = itemDto.Amount;
                item.ItemType = type;
                item.ItemImage = img;


                this.context.InventoryItems.Update(item);
                this.context.SaveChanges();
                return item;
            } catch (Exception e) {
                throw e;
            }

        }

        public bool DeleteInventoryItem(int itemid) {
            try {
                InventoryItem item = this.context.InventoryItems.Find(itemid);

                if (item == null)
                    return false;
                this.context.InventoryItems.Remove(item);
                this.context.SaveChanges();
                return true;
            } catch (Exception e) {
                throw e;
            }
        }
    }
}
