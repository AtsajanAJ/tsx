import { Post } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

const FILE_PATH = "src/db/posts.json";

async function handleUpdatePost(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const id = Number(req.query.id as string);
  const postsStr = await fs.readFileSync(FILE_PATH);
  const posts = JSON.parse(postsStr.toString());
  posts[id] = req.body;
  fs.writeFileSync(FILE_PATH, JSON.stringify(posts));
  return res.status(200).json(posts);
}

async function handleDeletePost(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const id = Number(req.query.id as string);
  const postsStr = await fs.readFileSync(FILE_PATH);
  const posts: Post[] = JSON.parse(postsStr.toString());
  const updatedPosts = posts.filter((_, index) => index !== id);
  fs.writeFileSync(FILE_PATH, JSON.stringify(updatedPosts));
  return res.status(200).json(updatedPosts);
}

// HTTP Method -> GET, POST, PUT/PATCH, DELETE
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const method = req.method;
  switch (method) {
    case "PUT":
      return handleUpdatePost(req, res);
    case "DELETE":
      handleDeletePost(req, res);
    default:
      return "Error";
  }
}
