using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RidderRedderApi.Models {

    [Table("Knight")]
    public class Knight {

        [Key]
        public int KnightId { get; set; }
        public string AuthId { get; set; }
        public int MonumentId { get; set; }
        public int Colour { get; set; }
        public int Level { get; set; }
    }
}
