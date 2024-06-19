import React, { ChangeEventHandler, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Post } from "@/types";
import { useSession } from "next-auth/react";
import useUserData from "@/hooks/useUserData";

interface Props {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSubmit?: (post: Post) => void;
}

export default function CreatePostModal(props: Props) {
  const [content, setContent] = useState("");
  // const [avatar, setAvatar] = useState("");
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);


  const { email, image, name  } = useUserData();

  const handleClick = () => {
    const singlePost = {
      author: {
        avatar: image || "",
        name: name || "",
        username: email || "",
      },
      content, //content: content
      followings,
      followers,
    };

    if (props.onSubmit) {
        props.onSubmit(singlePost)
    }
  };

  // const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setName(e.target.value);
  // };

  const handleChangeFollowings: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFollowings(Number(e.target.value));
  };

  const handleChangeFollowers: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFollowers(Number(e.target.value));
  };

  const handleChangeContent: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  };

  // const handleSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];

  //     const fileReader = new FileReader();

  //     fileReader.onload = (result) => {
  //       setAvatar(fileReader.result as string);
  //     };

  //     fileReader.readAsDataURL(file);
  //   }
  // };

  return (
    <div>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Create a post
              </ModalHeader>
              <ModalBody className="text-black">
                <div className="flex flex-col items-center pb-2">
                  {/* <div>
                    <div className="flex justify-center mb-2">
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Avatar src={avatar} size="lg" />
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleSelectFile}
                      />
                    </div>
                    <Input
                      className="w-96 mb-2"
                      label="Name"
                      onChange={handleChangeName}
                    />
                    <Input
                      className="w-96 mb-2"
                      label="Username"
                      onChange={handleChangeUsername}
                    />
                  </div> */}

                  <Textarea
                    rows={10}
                    placeholder="What's on your mind?"
                    className="w-96 mb-2"
                    onChange={handleChangeContent}
                  />

                  <Input
                    label="followings"
                    className="w-96 mb-2"
                    value={followings.toString()}
                    onChange={handleChangeFollowings}
                  />
                  <Input
                    label="followers"
                    className="w-96 mb-2"
                    value={followers.toString()}
                    onChange={handleChangeFollowers}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleClick}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
