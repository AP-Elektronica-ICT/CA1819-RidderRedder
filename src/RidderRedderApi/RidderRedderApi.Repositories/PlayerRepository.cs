using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RidderRedderApi.Repositories {
    public class PlayerRepository {
        private ApplicationContext context;

        public PlayerRepository(ApplicationContext ctx) {
            context = ctx;
        }

        public List<Player> GetAll() {
            try {
                return this.context.Players.ToList();
            } catch (Exception e) {
                throw e;
            }
        }

        public Player Get(string authid) {
            try {
                return this.context.Players.Find(authid);
            } catch (Exception e) {
                throw e;
            }
        }

        public Player Put(Player p, string authId) {
            try {
                Player player = this.context.Players.Find(authId);

                if (player == null)
                    return null;

                player.Experience = p.Experience;
                player.PlayerName = p.PlayerName;

                this.context.Players.Update(player);
                this.context.SaveChanges();

                return player;
            } catch (Exception e) {
                throw e;
            }
        }

        public Player Post(Player p) {
            try {
                this.context.Add(p);
                this.context.SaveChanges();
                return p;
            } catch (Exception e) {
                throw e;
            }
        }

        public bool Delete(string authId) {
            try {
                Player player = this.context.Players.Find(authId);

                if (player == null)
                    return false;

                this.context.Remove(player);
                this.context.SaveChanges();
                return true;
            } catch (Exception e) {
                throw e;
            }
        }
    }
}
