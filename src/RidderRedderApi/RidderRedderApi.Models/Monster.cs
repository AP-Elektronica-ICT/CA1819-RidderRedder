using System;
using System.ComponentModel.DataAnnotations;

namespace RidderRedderApi.Models {
    /// <summary>
    /// Monster.
    /// </summary>
    public class Monster {

        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Models.Monster"/> class.
        /// </summary>
        /// <param name="monsterId">Monster identifier.</param>
        /// <param name="monsterModel">Monster model.</param>
        /// <param name="monsterTitle">Monster title.</param>
        /// <param name="monsterName">Monster name.</param>
        public Monster(int monsterId, MonsterModel monsterModel, MonsterTitle monsterTitle, MonsterName monsterName) {
            MonsterId = monsterId;
            MonsterModel = monsterModel;
            MonsterTitle = monsterTitle;
            MonsterName = monsterName;
        }
        public Monster() {

        }

        /// <summary>
        /// Gets or sets the monster identifier.
        /// </summary>
        /// <value>The monster identifier.</value>
        [Key]
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
