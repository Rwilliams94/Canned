import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  service,

  // ------ Authentification ---------

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // ------ Searches -------

  searchBeers(query) {
    return service
      .get(`/api/beer/find/?name=${query}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  searchBreweries(query) {
    return service
      .get(`/api/brewery/find/?name=${query}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },


  // ------ User ---------

  getUser() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  editUser(userUpdate) {
    return service
      .patch("/api/users/edit/me", userUpdate)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserReviews() {
    return service
      .get("/api/users/me/reviews")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserImages() {
    return service
      .get("/api/users/me/images")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserBeers() {
    return service
      .get("/api/users/me/beers")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addUserBeer(beerId) {
    return service
      .patch(`/api/users/me/beer/add/${beerId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeUserBeer(beerId) {
    return service
      .patch(`/api/users/me/beer/remove/${beerId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteUser() {
    return service
      .delete("/api/users/me/delete")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // ------ Beers ---------

  getBeers() {
    return service
      .get("/api/beer")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneBeer(beerId) {
    return service
      .get(`/api/beer/${beerId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  CreateBeer(newBeer) {
    return service
      .post("/api/beer/add-beer", newBeer)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  editBeer(beerId, beerUpdate) {
    return service
      .patch(`/api/beer/edit-beer/${beerId}`, beerUpdate)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getBeerReviews(beerId) {
    return service
      .get(`/api/beer/reviews/${beerId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getBeerImages(beerId) {
    return service
      .get(`/api/beer/images/${beerId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteBeer(beerId) {
    return service
      .delete(`/api/beer/delete/${beerId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // ------ Brewery ---------

  getBreweries() {
    return service
      .get("/api/brewery")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneBrewery(breweryId) {
    return service
      .get(`/api/brewery/${breweryId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  CreateBrewery(newBrewery) {
    return service
      .post("/api/brewery/add-brewery", newBrewery)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  editBrewery(breweryId, breweryUpdate) {
    return service
      .patch(`/api/brewery/edit/${breweryId}`, breweryUpdate)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getBreweryReviews(breweryId) {
    return service
      .get(`/api/brewery/reviews/${breweryId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getBreweryImages(breweryId) {
    return service
      .get(`/api/brewery/images/${breweryId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getBreweryBeers(breweryId) {
    return service
    .get(`/api/brewery/beers/${breweryId}`)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  deleteBrewery(breweryId) {
    return service
      .delete(`/api/brewery/delete/${breweryId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // ------ Review ---------


  getReviews() {
    return service
      .get("/api/review")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneReview(reviewId) {
    return service
      .get(`/api/review/${reviewId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  CreateReview(newReview) {
    return service
      .post("/api/review/", newReview)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  editReview(reviewId, reviewUpdate) {
    return service
      .patch(`/api/review/edit/${reviewId}`, reviewUpdate)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteReview(reviewId) {
    return service
      .delete(`/api/review/delete/${reviewId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },


  // ------ Images ---------

  
  getImages() {
    return service
      .get("/api/image")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneimage(imageId) {
    return service
      .get(`/api/image/${imageId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  Createimage(newimage) {
    return service
      .post("/api/image/", newimage)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteimage(imageId) {
    return service
      .delete(`/api/image/delete/${imageId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },


};
