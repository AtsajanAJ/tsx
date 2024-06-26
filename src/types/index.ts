export interface Author {
    avatar: string;
    name: string;
    username: string;
  }

export interface Post {
  author: Author;
  content: string;
  followings: number;
  followers: number;
}

export interface PostDTO { // DTO = Data Transfer Object
  content: string;
}