using System;
namespace RidderRedderApi.Models {
    /// <summary>
    /// Monster.
    /// </summary>
    public class Monster {
        /// <summary>
        /// Gets or sets the monster identifier.
        /// </summary>
        /// <value>The monster identifier.</value>
        public int MonsterId { get; set; }
        /// <summary>
        /// Gets or sets the monster model.
        /// </summary>
        /// <value>The monster model.</value>
        public MonsterModel MonsterModel { get; set; }
        /// <summary>
        /// Gets or sets the monster title.
        /// </summary>
        /// <value>The monster title.</value>
        public MonsterTitle MonsterTitle { get; set; }
        /// <summary>
        /// Gets or sets the name of the monster.
        /// </summary>
        /// <value>The name of the monster.</value>
        public MonsterName MonsterName { get; set; }
    }
}
