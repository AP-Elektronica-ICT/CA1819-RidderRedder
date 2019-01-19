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

        public InventoryItem GetInventoryItem(int itemId) {
            try {
                return this.context.InventoryItems.Find(itemId);
            } catch (Exception e) {
                Console.WriteLine(e);
                return null;
            }
        }

        public InventoryItem GetInventoryItemByColor(ItemImage image) {
            try {
                return this.context.InventoryItems.First(i => i.ItemImage.Equals(image));
            } catch (Exception e) {
                Console.WriteLine(e);
                return null;
            }
        }

        public List<ItemImage> GetAllItemImages() {
            try {
                return this.context.ItemImages.ToList();
            } catch (Exception e) {
                throw e;
            }

        }

        public List<ItemType> GetAllItemTypes() {
            try {
                return this.context.ItemTypes.ToList();
            } catch (Exception e) {
                throw e;
            }
        }

        public ItemImage GetItemImage(int itemImageId) {
            try {
                return this.context.ItemImages.Find(itemImageId);
            } catch (Exception e) {
                throw e;
            }
        }

        public ItemType GetItemType(int itemTypeId) {
            try {
                return this.context.ItemTypes.Find(itemTypeId);
            } catch (Exception e) {
                throw e;
            }
        }

        public InventoryItem PostInventoryItem(InventoryItem item) {
            try {
                this.context.InventoryItems.Add(item);
                this.context.SaveChanges();

                return item;

            } catch (Exception e) {
                throw e;
            }
        }

        public InventoryItem UpdateInventoryItem(InventoryItem item, int itemid) {
            try {
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
