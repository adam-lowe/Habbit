import axios from "axios";

export default {
  // Gets all pet
  getPets: function() {
    return axios.get("/api/pets");
  },
  // Gets the book with the given id
  getPet: function(id) {
    return axios.get("/api/pets/" + id);
  },
  // Deletes the book with the given id
  deletePet: function(id) {
    return axios.delete("/api/pets/" + id);
  },
  // Saves a book to the database
  savePet: function(bookData) {
    return axios.post("/api/pets", bookData);
  }
};