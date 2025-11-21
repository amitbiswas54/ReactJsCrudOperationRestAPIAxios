import axios from "axios";


const Api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get all posts

export const getPosts = () => {
  return Api.get("/posts");
}