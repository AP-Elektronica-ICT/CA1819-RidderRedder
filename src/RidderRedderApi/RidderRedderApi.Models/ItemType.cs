using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RidderRedderApi.Models {
    [Table("ItemType")]
    public class ItemType {

        [Key]
        public int ItemTypeId { get; set; }
        public string ItemTypeName { get; set; }
    }
}
