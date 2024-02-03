import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWU3NTkzNjVlN2FjODhjYWM4NDJmZGRmYzZjZjFmMyIsInN1YiI6IjY1YmU4YmZlYTM1YzhlMDE0OWQ0NzczZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.naEZ2aicsoG9dpBCnJJoajA40lT-UGGv7qwy13V98Oc",
  },
});

export default instance;
