using System;
using System.Collections.Generic;
using System.Text;
using RidderRedderApi.Models;
using RidderRedderApi.Repositories;

namespace RidderRedderApi.Services {
	public class LandmarkService {
		private LandmarkRepository landmarkRepo;

		public LandmarkService(LandmarkRepository landmarkRepository) {
			this.landmarkRepo = landmarkRepository;
		}

		public List<Landmark> GetAll() {
			return this.landmarkRepo.GetLandmarks();
		}

		public Landmark Get(int landmarkId) {
			return this.landmarkRepo.Get(landmarkId);
		}

		public Landmark Update(Landmark l) {
                return this.landmarkRepo.Put(l);
		}

		public Landmark Post(Landmark l) {
			return this.landmarkRepo.Post(l);
		}

		public bool Delete(int landmarkId) {
			return this.landmarkRepo.Delete(landmarkId);
		}
	}
}
