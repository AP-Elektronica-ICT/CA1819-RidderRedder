using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace RidderRedderApi.ViewModels {

    public class UpdateInventoryItemDto {

        public UpdateInventoryItemDto(int img, int type, int amount) {

            this.ItemImageId = img;
            this.ItemTypeId = type;
            this.Amount = amount;
        }
        public UpdateInventoryItemDto() { }


        public int ItemImageId { get; set; }

        public int ItemTypeId { get; set; }

        public int Amount { get; set; }

    }
}
