using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace RidderRedderApi.Models {

    [Table("Knight")]
    public class Knight {

        [Key]
        public int KnightId { get; set; }
        public string AuthId { get; set; }
        public int LandmarkId { get; set; }
        [ForeignKey("LandmarkId")]
        [JsonIgnore]
        public Landmark Landmark { get; set; }
        public int Colour { get; set; }
        public int Level { get; set; }
    }
}
