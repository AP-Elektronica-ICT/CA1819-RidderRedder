using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RidderRedderApi.ViewModels {

    [Table("ItemImage")]
    public class ItemImageDto {

        [Key]
        public int ItemImageId { get; set; }
        public string Path { get; set; }
    }
}
