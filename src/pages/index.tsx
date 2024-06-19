import ConfirmModal from "@/components/ConfirmModal";
import CreatePostModal from "@/components/CreatePostModal";
import MyNavbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import UpdatePostModal from "@/components/UpdatePostModal";
import usePostStates from "@/hooks/usePostStates";
import useUserData from "@/hooks/useUserData";
import postService from "@/services/post-service";
import { Post } from "@/types";
import { Button, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession({ required: true });

  const { email } = useUserData();

  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedPostStates = usePostStates();

  const createPostDisclosure = useDisclosure();
  const confirmModalDisclosure = useDisclosure();
  const updatePostDisclosure = useDisclosure();

  const handleDelete = (index: number) => {
    confirmModalDisclosure.onOpen();
    setSelectedIndex(index);
  };

  const handleEdit = (index: number) => {
    updatePostDisclosure.onOpen();
    setSelectedIndex(index);
    selectedPostStates.setContent(posts[index].content);
    selectedPostStates.setAvatar(posts[index].author.avatar);
    selectedPostStates.setName(posts[index].author.name);
    selectedPostStates.setUsername(posts[index].author.username);
    selectedPostStates.setFollowings(posts[index].followings);
    selectedPostStates.setFollowers(posts[index].followers);
  };

  const handleConfirmDelete = async () => {
    // const filtered = posts.filter((_, index) => {
    //   return index !== selectedIndex;
    // });

    // setPosts(filtered);
    await postService.deletePost(selectedIndex);
    await refreshPostsFromServer();

    confirmModalDisclosure.onClose();
  };

  const handleConfirmUpdate = async () => {
    const updatedPost = {
      author: {
        avatar: selectedPostStates.avatar,
        name: selectedPostStates.name,
        username: selectedPostStates.username,
      },
      content: selectedPostStates.content,
      followings: selectedPostStates.followings,
      followers: selectedPostStates.followers,
    };

    await postService.updatePost(selectedIndex, updatedPost);
    await refreshPostsFromServer();

    updatePostDisclosure.onClose();
  };

  const handleCreatePost = () => {
    createPostDisclosure.onOpen();
  };

  const createPost = async (post: Post) => {
    // setPosts([...posts, post]);
    await postService.createPost(post);
    await refreshPostsFromServer();
    createPostDisclosure.onClose();
  };

  const refreshPostsFromServer = async () => {
    const posts = await postService.fetchPosts();
    setPosts(posts);
  };

  useEffect(() => {
    (async () => {
      const posts = await postService.fetchPosts();
      setPosts(posts);
    })();
  }, []);

  return (
    <main className=" h-[100vh]">
      <MyNavbar />

      <div className="grid grid-cols-3 gap-2 mx-20 my-2 mb-20">
        {posts.map((item, index) => {
          return (
            <PostCard
              key={index}
              {...item}
              handleEdit={() => handleEdit(index)}
              handleDelete={() => handleDelete(index)}
              disableDelete={email !== item.author.username}
              disableEdit={email !== item.author.username}
            />
          );
        })}
      </div>

      <div className="fixed right-20 bottom-10">
        <Button
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          onClick={handleCreatePost}
        >
          +
        </Button>
      </div>

      <CreatePostModal
        isOpen={createPostDisclosure.isOpen}
        onOpenChange={createPostDisclosure.onOpenChange}
        onSubmit={createPost}
      />
      <ConfirmModal
        isOpen={confirmModalDisclosure.isOpen}
        onOpenChange={confirmModalDisclosure.onOpenChange}
        onDelete={handleConfirmDelete}
      />
      <UpdatePostModal
        isOpen={updatePostDisclosure.isOpen}
        onOpenChange={updatePostDisclosure.onOpenChange}
        onSubmit={handleConfirmUpdate}
        {...selectedPostStates}
      />
    </main>
  );
}
