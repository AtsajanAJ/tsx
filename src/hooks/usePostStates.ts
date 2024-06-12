import { useState } from "react";

const usePostStates = () => {
    const [content, setContent] = useState("");
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [followings, setFollowings] = useState(0);
    const [followers, setFollowers] = useState(0);

    return {
        content,
        avatar,
        name,
        username,
        followings,
        followers,
        setContent,
        setAvatar,
        setName,
        setUsername,
        setFollowings,
        setFollowers
    }
}

export default usePostStates