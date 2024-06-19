import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  LinkIcon,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";

interface Author {
  avatar: string;
  name: string;
  username: string;
}

interface Props {
  author: Author;
  content: string;
  followings: number;
  followers: number;
  disableEdit?: boolean;
  disableDelete?: boolean;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export default function PostCard(props: Props) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  const showMenu = !props.disableEdit || !props.disableDelete;

  const items = [
    {
      key: "edit",
      label: "Edit",
    },
    {
      key: "delete",
      label: "Delete",
    },
  ].filter((item) => {
    if (item.key === "edit") {
      return !props.disableEdit
    }
    return !props.disableDelete;
  })

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={props.author.avatar}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {props.author.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{props.author.username}
            </h5>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>

          {showMenu && (
            <Dropdown className="text-black">
              <DropdownTrigger>
                <EllipsisVertical size={16} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" items={items}>
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    color={item.key === "delete" ? "danger" : "default"}
                    className={item.key === "delete" ? "text-danger" : ""}
                    onClick={item.key === "delete" ? props.handleDelete : props.handleEdit}
                  >
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {props.content}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {props.followings}
          </p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {props.followers}
          </p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
