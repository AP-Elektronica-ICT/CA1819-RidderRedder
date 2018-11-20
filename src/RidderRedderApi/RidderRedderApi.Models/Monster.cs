﻿using System;
namespace RidderRedderApi.Models {
    /// <summary>
    /// Monster.
    /// </summary>
    public class Monster {

        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Models.Monster"/> class.
        /// </summary>
        /// <param name="monsterModel">Monster model.</param>
        /// <param name="monsterTitle">Monster title.</param>
        /// <param name="monsterName">Monster name.</param>
        public Monster(MonsterModel monsterModel, MonsterTitle monsterTitle, MonsterName monsterName) {
            this.MonsterModel = monsterModel;
            this.MonsterTitle = monsterTitle;
            this.MonsterName = monsterName;
        }
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