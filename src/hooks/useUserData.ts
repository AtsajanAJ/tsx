import { useSession } from "next-auth/react";

const useUserData = () => {
  const session = useSession();

  const data = session.data;

  const email = data?.user?.email;
  const image = data?.user?.image;
  const name = data?.user?.name;

  return {
    email,
    image,
    name,
  };
};

export default useUserData;