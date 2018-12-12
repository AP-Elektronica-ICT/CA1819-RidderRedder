using System;
using System.Collections.Generic;
using System.Text;
using RidderRedderApi.Models;
using RidderRedderApi.Repositories;

namespace RidderRedderApi.Services {
    public class PlayerService {
        private PlayerRepository playerRepo;

        public PlayerService(PlayerRepository playerRepository) {
            this.playerRepo = playerRepository;
        }

        public List<Player> GetAll() {
            return this.playerRepo.GetAll();
        }

        public Player Get(string authid) {
            return this.playerRepo.Get(authid);
        }

        public Player Update(Player p, string authId) {
            return this.playerRepo.Put(p, authId);
        }

        public Player Post(Player p) {
            return this.playerRepo.Post(p);
        }

        public bool Delete(string authId) {
            return this.playerRepo.Delete(authId);
        }
    }
}