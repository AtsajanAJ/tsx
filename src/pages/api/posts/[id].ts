import { Post } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { config } from "@/config";
import { OAuth2Client } from "google-auth-library";

const FILE_PATH = "src/db/posts.json";

const extractJWTFromReq = (req: NextApiRequest) => {
  const headers = req.headers;
  const authorization = headers["authorization"];
  const accessToken = authorization
    ? authorization.replace("Bearer ", "").trim()
    : "";
  return accessToken;
};

const getDecodedOAuthJwtGoogle = async (token: string) => {
  try {
    const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });

    return ticket;
  } catch (error) {
    console.error("Error decoding JWT", error);
    return null;
  }
};

const validatePostOwnership = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = Number(req.query.id as string);
  const postsStr = await fs.readFileSync(FILE_PATH);
  const posts = JSON.parse(postsStr.toString());

  const post: Post = posts[id];
  if (!post) return res.status(404).send(`Error post id: ${id} not found`);

  const token = extractJWTFromReq(req);
  const ticket = await getDecodedOAuthJwtGoogle(token);

  if (!token || !ticket) return res.status(401).send(`Unauthorized`);
  const payload = ticket.getPayload();

  if (!payload) return res.status(401).send(`Unauthorized`);

  if (payload.email !== post.author.username)
    return res.status(403).send(`Forbidden`);

  return true;
};

async function handleUpdatePost(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const isValid = await validatePostOwnership(req, res);

  if (isValid) {
    const id = Number(req.query.id as string);
    const postsStr = await fs.readFileSync(FILE_PATH);
    const posts = JSON.parse(postsStr.toString());
    posts[id] = req.body;
    fs.writeFileSync(FILE_PATH, JSON.stringify(posts));
    return res.status(200).json(posts);
  }
}

async function handleDeletePost(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const isValid = await validatePostOwnership(req, res);

  if (isValid) {
    const id = Number(req.query.id as string);
    const postsStr = await fs.readFileSync(FILE_PATH);
    const posts: Post[] = JSON.parse(postsStr.toString());
    const updatedPosts = posts.filter((_, index) => index !== id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(updatedPosts));
    return res.status(200).json(updatedPosts);
  }
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
      return handleDeletePost(req, res);
    default:
      return "Error";
  }
}
