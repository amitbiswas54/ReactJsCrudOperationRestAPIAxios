import axios from "axios";


const Api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get all posts

export const getPosts = () => {
  return Api.get("/posts");
}

// delete post by id

export const deletePost =(id)=>{ 
    return Api.delete(`/posts/${id}`);
}

// create new post
export const addPost = (post) => {
    return Api.post('/posts', post);
}