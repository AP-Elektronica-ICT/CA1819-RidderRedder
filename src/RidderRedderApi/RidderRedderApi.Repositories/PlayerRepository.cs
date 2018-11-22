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

        public Player Put(Player p) {
            try {
                this.context.Players.Update(p);
                this.context.SaveChanges();
                return p;
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
                this.context.Remove(player);
                this.context.SaveChanges();
                return true;
            } catch (Exception e) {
                throw e;
            }
        }
    }
}
