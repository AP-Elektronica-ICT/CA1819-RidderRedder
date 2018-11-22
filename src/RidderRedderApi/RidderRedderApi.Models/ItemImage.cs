using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RidderRedderApi.Models {
    [Table("ItemImage")]
    public class ItemImage {

        [Key]
        public int ItemImageId { get; set; }
        public string Path { get; set; }
    }
}
