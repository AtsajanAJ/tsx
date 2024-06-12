import React, { ChangeEventHandler } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Post } from "@/types";

interface Props {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSubmit?: (post: Post) => void;

  content: string;
  avatar: string;
  name: string;
  username: string;
  followings: number;
  followers: number;

  setContent: (value: string) => void,
  setAvatar: (value: string) => void,
  setName: (value: string) => void,
  setUsername: (value: string) => void,
  setFollowings: (value: number) => void,
  setFollowers: (value: number) => void
}

export default function UpdatePostModal({
  content,
  avatar,
  name,
  username,
  followers,
  followings,
  setContent,
  setAvatar,
  setName,
  setUsername,
  setFollowings,
  setFollowers,
  ...props
}: Props) {
  const handleClick = () => {
    const singlePost = {
      author: {
        avatar,
        name,
        username,
      },
      content, //content: content
      followings,
      followers,
    };

    if (props.onSubmit) {
      props.onSubmit(singlePost);
    }
  };

  const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleChangeFollowings: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFollowings(Number(e.target.value));
  };

  const handleChangeFollowers: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFollowers(Number(e.target.value));
  };

  const handleChangeContent: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  };

  const handleSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = (result) => {
        setAvatar(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Update post
              </ModalHeader>
              <ModalBody className="text-black">
                <div className="flex flex-col items-center pb-2">
                  <div>
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
                      value={name}
                      onChange={handleChangeName}
                    />
                    <Input
                      className="w-96 mb-2"
                      label="Username"
                      value={username}
                      onChange={handleChangeUsername}
                    />
                  </div>

                  <Textarea
                    rows={10}
                    placeholder="What's on your mind?"
                    className="w-96 mb-2"
                    value={content}
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
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
