import axios from "axios";

export default {
  Users: {
    login: function(email, password) {
      return axios.post("/api/users/login", { email, password });
    },
    logout: function(authToken) {
      return axios.post("/api/users/logout", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    //Add new fields here
    create: function(fullName, petName, email, password) {
      return axios.post("/api/users", {
        fullName,
        email,
        password,
        pet: { name: petName }
      });
    },

    getMe: function(authToken) {
      return axios.get("/api/users/me/", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },

    updateMe: function(authToken, user) {
      return axios.put(`/api/users/me/`, user, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
  },

  Tasks: {
    // Saves a task to the database
    createOne: function(authToken, todo) {
      return axios.post(
        "/api/todos",
        { ...todo },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
    },
    updateOne: function(authToken, todo) {
      return axios.put(
        "/api/todos",
        { ...todo },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
    },
    completeOne: function(authToken, todoId) {
      return axios.get(
        `/api/todos/complete/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
    }
  },

  Pets: {
    // Gets all pet
    getAll: function(authToken) {
      return axios.get("/api/pets", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    // Gets the book with the given id
    getOne: function(authToken, id) {
      return axios.get("/api/pets/" + id, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    // Deletes the book with the given id
    deleteOne: function(authToken, id) {
      return axios.delete("/api/pets/" + id, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    // Saves a book to the database
    createOne: function(authToken, pet) {
      return axios.post("/api/pets", pet, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    updateOne: function(authToken, pet) {
      return axios.put("/api/pets", pet, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    wound: function(authToken) {
      return axios.get("/api/pets/wound", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    heal: function(authToken, points) {
      return axios.get(`/api/pets/heal/${points}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
  }
};
