import { config } from "@/config";
import { Post, PostDTO } from "@/types";
import axios from "axios";

const fetchPosts = async () => {
  const url = `${config.API_URL}/posts`;
  const response = await axios.get(url);
  return response.data;
};

const createPost = async (data: PostDTO) => {
  const url = `${config.API_URL}/posts`;
  const response = await axios.post(url, data);
  return response.data;
};

const updatePost = async (id: number, data: Post) => {
  const url = `${config.API_URL}/posts/${id}`;
  const response = await axios.put(url, data);
  return response.data;
};

const deletePost = async (id: number) => {
  const url = `${config.API_URL}/posts/${id}`;
  const response = await axios.delete(url);
  return response.data;
};

const setAccessToken = (accessToken: string) => {
  axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
}

const postService = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  setAccessToken
};

export default postService;
