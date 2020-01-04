import axios from 'axios';

export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    create: function (email, password) {
      return axios.post('/api/users', { email, password });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Secrets: {
    getAll: function (authToken) {
      return axios.get('/api/secrets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Todos: {
    // Gets all todo
    getAll: function () {
      return axios.get("/api/todos");
    },
    // Gets the book with the given id
    getOne: function (id) {
      return axios.get("/api/todos/" + id);
    },
    // Deletes the book with the given id
    deleteOne: function (id) {
      return axios.delete("/api/todos/" + id);
    },
    // Saves a book to the database
    createOne: function () {
      return axios.post("/api/todos");
    },
    updateOne: function (id) {
      return axios.put("/api/todos");
    }
  },

  Pets: {
    // Gets all pet
    getAll: function () {
      return axios.get("/api/pets");
    },
    // Gets the book with the given id
    getOne: function (id) {
      return axios.get("/api/pets/" + id);
    },
    // Deletes the book with the given id
    deleteOne: function (id) {
      return axios.delete("/api/pets/" + id);
    },
    // Saves a book to the database
    createOne: function () {
      return axios.post("/api/pets");
    },
    updateOne: function (id) {
      return axios.put("/api/pets");
    }
  }
}
