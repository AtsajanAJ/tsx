// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs';

// CRUD
const FILE_PATH = "src/db/posts.json"

async function handleGetPosts(res: NextApiResponse<Post[]>) {
  const posts = await fs.readFileSync(FILE_PATH);
  return res.status(200).json(JSON.parse(posts.toString()));
}

async function handleCreatePost(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  const postsStr = await fs.readFileSync(FILE_PATH);
  const posts = JSON.parse(postsStr.toString());
  posts.push(req.body);
  fs.writeFileSync(FILE_PATH, JSON.stringify(posts));
  return res.status(200).json(posts);
}

// HTTP Method -> GET, POST, PUT/PATCH, DELETE
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const method = req.method;
  switch (method) {
    case "GET":
      return handleGetPosts(res);
    case "POST":
      handleCreatePost(req, res);
    default:
      return "Error";
  }
}
