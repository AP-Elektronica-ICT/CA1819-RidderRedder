using RidderRedderApi.Models;
using RidderRedderApi.Repositories;
using System;
using System.Collections.Generic;

namespace RidderRedderApi.Services {
    public class MonsterService {

        private MonsterRepository monsterRepo;

        public MonsterService(MonsterRepository monsterRepository) {
            monsterRepo = monsterRepository;
        }

        public List<MonsterTitle> GetAllMonsterTitles() {
            return monsterRepo.GetAllMonsterTitles();
        }

        public List<MonsterModel> GetAllMonsterModels() {
            return monsterRepo.GetAllMonsterModels();
        }

        public List<MonsterName> GetAllMonsterNames() {
            return monsterRepo.GetAllMonsterNames();
        }

        public List<Monster> GetRandomMonsters(int count) {
            List<MonsterTitle> monsterTitles = GetAllMonsterTitles();
            List<MonsterName> monsterNames = GetAllMonsterNames();
            List<MonsterModel> monsterModels = GetAllMonsterModels();

            Random r = new Random();

            List<Monster> randomMonsters = new List<Monster>();

            for (int i = 0; i < count; i++) {
                MonsterTitle randomMonsterTitle = monsterTitles[r.Next(monsterTitles.Count - 1)];
                MonsterName randomMonsterName = monsterNames[r.Next(monsterNames.Count - 1)];
                MonsterModel randomMonsterModel = monsterModels[r.Next(monsterModels.Count - 1)];

                int monsterId = Int32.Parse("" + randomMonsterModel.MonsterModelId + randomMonsterTitle.MonsterTitleId + randomMonsterName.MonsterNameId);
                Console.WriteLine(monsterId);

                Monster m = new Monster(monsterId, randomMonsterModel, randomMonsterTitle, randomMonsterName);

                randomMonsters.Add(m);
            }

            return randomMonsters;

        }

    }
}
