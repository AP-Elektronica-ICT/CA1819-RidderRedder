using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace RidderRedderApi.ViewModels {

    public class AddInventoryItemDto {

        public AddInventoryItemDto(string auth, int img, int type, int amount) {
            this.AuthId = auth;
            this.ItemImageId = img;
            this.ItemTypeId = type;
            this.Amount = amount;
        }
        public AddInventoryItemDto() { }


        [Key]
        [JsonIgnore]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InventoryItemId { get; set; }

        public string AuthId { get; set; }

        public int ItemImageId { get; set; }

        public int ItemTypeId { get; set; }

        public int Amount { get; set; }

    }
}
