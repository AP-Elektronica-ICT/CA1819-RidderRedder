using System;
using System.Collections.Generic;
using System.Text;
using RidderRedderApi.Models;
using RidderRedderApi.Repositories;

namespace RidderRedderApi.Services
{
    public class PlayerService
    {
        private PlayerRepository playerRepo;

        public PlayerService(PlayerRepository playerRepository)
        {
            this.playerRepo = playerRepository;
        }

        public List<Player> GetList(string name)
        {
            return this.playerRepo.GetAll(name);
        }

        public Player Get(string authId)
        {
            return this.playerRepo.Get(authId);
        }

        public Player Update(Player p)
        {
            return this.playerRepo.Put(p);
        }

        public Player Post(Player p)
        {
            return this.playerRepo.Post(p);
        }

        public bool Delete(Player p)
        {
            return this.playerRepo.Delete(p);
        }
    }
}