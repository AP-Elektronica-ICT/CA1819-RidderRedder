using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RidderRedderApi.Models {
    /// <summary>
    /// Monster model.
    /// </summary>
    [Table("MonsterModel")]
    public class MonsterModel {

        /// <summary>
        /// Gets or sets the monster model identifier.
        /// </summary>
        /// <value>The monster model identifier.</value>
        [Key]
        public int MonsterModelId { get; set; }

        /// <summary>
        /// Gets or sets the monster model path.
        /// </summary>
        /// <value>The monster model path.</value>
        public string MonsterModelPath { get; set; }
    }
}
