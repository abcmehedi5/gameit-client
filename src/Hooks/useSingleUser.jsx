import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";

const useSingleUser = () => {
  const { user } = useContext(AuthContext);

  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `https://gameit-server.vercel.app/users/user?email=${user.email}`
      );

      return res.data;
    },
  });

  return [userData, isLoading, refetch];
};

export default useSingleUser;
