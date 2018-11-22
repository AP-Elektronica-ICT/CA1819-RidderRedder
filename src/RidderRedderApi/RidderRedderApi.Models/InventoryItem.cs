using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RidderRedderApi.Models {
    [Table("InventoryItem")]
    public class InventoryItem {
        public InventoryItem() {
        }
        public InventoryItem(string auth, ItemImage img, ItemType type, int amount) {
            this.AuthId = auth;
            this.ItemImage = img;
            this.ItemType = type;
            this.Amount = amount;
        }
        /// <summary>
        /// Gets or sets the inventory item identifier.
        /// </summary>
        /// <value>The inventory item identifier.</value>
        [Key]
        public int InventoryItemId { get; set; }

        /// <summary>
        /// Gets or sets the auth identifier.
        /// </summary>
        /// <value>The auth identifier.</value>
        public string AuthId { get; set; }

        /// <summary>
        /// Gets or sets the item image.
        /// </summary>
        /// <value>The item image.</value>
        public ItemImage ItemImage { get; set; }

        /// <summary>
        /// Gets or sets the type of the item.
        /// </summary>
        /// <value>The type of the item.</value>
        public ItemType ItemType { get; set; }

        /// <summary>
        /// Gets or sets the amount.
        /// </summary>
        /// <value>The amount.</value>
        public int Amount { get; set; }
    }
}
