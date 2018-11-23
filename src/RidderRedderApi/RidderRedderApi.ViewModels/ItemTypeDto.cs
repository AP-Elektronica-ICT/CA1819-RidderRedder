using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RidderRedderApi.ViewModels {

    [Table("ItemType")]
    public class ItemTypeDto {

        [Key]
        public int ItemTypeId { get; set; }
        public string ItemTypeName { get; set; }
    }
}
